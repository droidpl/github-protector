import signer from 'x-hub-signature/src/signer';
import { throwError } from './api-response';
import { GITHUB_WEBHOOK_SECRET } from '../utils/env';

const GITHUB_SECURITY_HEADER = 'x-hub-signature';
const signerConfig = signer({
  algorithm: 'sha1',
  secret: GITHUB_WEBHOOK_SECRET,
});
export const sign = (rawBody) => {
  const buffer = Buffer.from(rawBody);
  return signerConfig(buffer);
};

export default async (ctx, next) => {
  const securityHeader = ctx.headers[GITHUB_SECURITY_HEADER];
  if (!securityHeader) {
    throwError('Missing security header', 400, ctx);
  }
  if (securityHeader === sign(ctx.request.rawBody)) {
    await next();
    return;
  }
  throwError('Unauthorized, header does not match', 403, ctx);
};
