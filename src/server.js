import Koa from 'koa';
import config from './router-config';

const app = new Koa();
config(app);

app.listen(process.env.PORT);
