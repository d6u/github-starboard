import 'source-map-support/register';
import http from 'http';
import config from 'config';
import koa from 'koa';
import render from 'koa-ejs';
import koaStatic from 'koa-static';
import bodyParser from 'koa-bodyparser';
import session from './util/session';
import { logger, middleware as devLoggingMiddleware } from './util/logging';
import { authInit, authSession } from './util/auth';
import { configWebsocket } from './util/websocket';
import htmlRoute from './routers/html';
import apiRoute from './routers/api';

const app = koa();

app.keys = ['keyboard cat', 'starboard'];

// Error handling
app.use(function *(next) {
  try {
    yield next;
  } catch (err) {
    this.status = 500;
    this.body = err.stack;
    logger.error(err);
  }
});

app.use(koaStatic(config.get('koa.publicDir')));
app.use(devLoggingMiddleware);
app.use(session);
app.use(bodyParser());
app.use(authInit);
app.use(authSession);

render(app, {
  root: config.get('koa.templateDir'),
  layout: false,
  viewExt: 'ejs',
  cache: false,
  debug: true,
});

app.use(apiRoute);
app.use(htmlRoute);

app.on('error', function (err, ctx) {
  logger.error(err);
});

const server = http.createServer(app.callback());

configWebsocket(server);

server.listen(10000, '0.0.0.0', () => {
  logger.info('http://0.0.0.0:10000');
});
