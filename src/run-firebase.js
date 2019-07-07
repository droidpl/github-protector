import * as functions from 'firebase-functions';
import app from './server';

exports.hooks = functions.https.onRequest(app.callback());
