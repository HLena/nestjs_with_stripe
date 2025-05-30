import * as bodyParser from 'body-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //   app.use('/stripe/webhook',
  //   bodyParser.raw({ type: 'application/json' }), // 1️⃣
  //   (req, res, next) => {
  //     req.rawBody = req.body; // 2️⃣
  //     req.body = {}; // 3️⃣
  //     next();
  //   }
  // );

  app.use('/stripe/webhook', bodyParser.raw({ type: 'application/json' }));

  await app.listen(3000);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
