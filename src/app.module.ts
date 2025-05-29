import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { StripeService } from './stripe/stripe.service';
import { StripeController } from './stripe/stripe.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, StripeController],
  providers: [AppService, StripeService],
})
export class AppModule {}
