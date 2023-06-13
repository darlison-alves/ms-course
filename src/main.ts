import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

const { RABBIT_URL = 'amqp://rabbitmq:rabbitmq@localhost:5672', RABBIT_QUEUE = 'ms-course' } = process.env

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [RABBIT_URL],
      queue: RABBIT_QUEUE
    }
  });
  await app.init();
  await app.listen();
}
bootstrap();
