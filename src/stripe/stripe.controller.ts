import { Body, Controller, Post } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
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
}
