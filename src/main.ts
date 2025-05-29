import * as bodyParser from 'body-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: false });

  // Middleware exclusivo para la ruta del webhook
  app.use(
    '/stripe/webhook',
    bodyParser.raw({ type: 'application/json' }), // Preserva el cuerpo crudo
    (req, res, next) => {
      req.rawBody = req.body; // Almacena el rawBody
      req.body = {}; // Evita conflictos
      next();
    },
  );

  app.use(bodyParser.json());

  await app.listen(3000);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
