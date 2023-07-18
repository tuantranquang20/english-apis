import bcrypt from 'bcrypt';

export function hashPassword(password: string) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

export function extractToken(authorization = '') {
  if (/^Bearer /.test(authorization)) {
    return authorization.substring(7, authorization.length);
  }
  return '';
}
