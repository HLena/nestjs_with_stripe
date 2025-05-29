import {
  Body,
  Controller,
  Headers,
  HttpStatus,
  Post,
  Req,
  Res,
  Logger,
} from '@nestjs/common';
import { StripeService } from './stripe.service';
import Stripe from 'stripe';

import { Request, Response } from 'express';

// interface RawBodyRequest extends Request {
//   rawBody: Buffer;
// }

@Controller('stripe')
export class StripeController {
  private readonly logger = new Logger(StripeController.name);
  private stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  private endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  constructor(private readonly stripeService: StripeService) {}

  @Post('payment-intent')
  async createPaymentIntent(
    @Body() body: { amount: number; currency: string },
  ) {
    try {
      const paymentIntent = await this.stripeService.createPaymentIntent(
        body.amount,
        body.currency,
      );
      return paymentIntent;
    } catch (error) {
      console.error(error);
      throw new Error('Error en Stripe');
    }
  }

  @Post('webhook')
  handleWebhook(
    @Req() req: { rawBody: Buffer },
    @Res() res: Response,
    @Headers('stripe-signature') signature: string,
  ) {
    console.log('RawBody recibido:', req.rawBody?.toString('utf8'));
    // console.log('Headers:', req.headers);
    if (!signature) {
      this.logger.error('Missing stripe-signature header');
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send('Missing stripe-signature header');
    }
    if (!req.rawBody) {
      this.logger.error('Missing rawBody');
      return res.status(HttpStatus.BAD_REQUEST).send('Missing request body');
    }

    try {
      const event = this.stripe.webhooks.constructEvent(
        req.rawBody,
        signature,
        this.endpointSecret,
      );

      this.logger.log(`Received event: ${event.type}`);

      switch (event.type) {
        case 'payment_intent.succeeded':
          // eslint-disable-next-line no-case-declarations
          const paymentIntent = event.data.object;
          this.logger.log(`Pago exitoso: ${paymentIntent.id}`);
          // Aquí puedes actualizar tu base de datos, enviar un correo, etc.
          break;
        case 'invoice.payment_failed':
          this.logger.warn(`Pago Fallido: ${event.type}`);
          break;
        default:
          this.logger.warn(`Evento no manejado: ${event.type}`);
      }

      return res.status(HttpStatus.OK).json({ received: true });
    } catch (error) {
      console.error('Webhook signature verification failed.', error);
      return res.status(HttpStatus.BAD_REQUEST).send(`Webhook Error: ${error}`);
    }
  }
}
