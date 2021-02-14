import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  app.useStaticAssets(join(__dirname,  'public'));
  app.setBaseViewsDir(join(__dirname,  'views'));
  hbs.registerPartials(__dirname + '/views/partials');
  hbs.registerHelper(__dirname + '/views/helpers');
  app.setViewEngine('hbs');
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: process.env.IS_PRODUCTION,
    } as any),
  );
  await app.listen(3001);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
