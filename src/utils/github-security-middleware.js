import signer from 'x-hub-signature/src/signer';
import { throwError } from './api-response';

const GITHUB_SECURITY_HEADER = 'x-hub-signature';
const sign = signer({
  algorithm: 'sha1',
  secret: process.env.GITHUB_WEBHOOK_SECRET,
});

export default async (ctx, next) => {
  const securityHeader = ctx.headers[GITHUB_SECURITY_HEADER];
  const rawBody = Buffer.from(ctx.request.rawBody);

  if (!securityHeader) {
    throwError('Missing security header', 400, ctx);
  }
  if (securityHeader === sign(rawBody)) {
    await next();
    return;
  }
  throwError('Unauthorized, header does not match', 403, ctx);
};
