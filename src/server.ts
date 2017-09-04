import { NestFactory } from '@nestjs/core';
import * as config from 'config';
import * as express from 'express';
import * as bodyParser from 'body-parser';


import { ApplicationModule } from './app.module';

const instance = express();
instance.use(bodyParser.json());
instance.use(bodyParser.urlencoded({
  extended: true
}));

const app = NestFactory.create(ApplicationModule, instance);

app.listen(config.get('port'), () => console.log(`Application is listening on port ${config.get("port")}.`));