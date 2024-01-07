import jwt, { JwtPayload } from 'jsonwebtoken';

interface DecodedToken extends JwtPayload {
  exp?: number;
}

const isTokenExp = (token: string): boolean | null => {
  try {
    const decodedToken = jwt.decode(token, { complete: true }) as DecodedToken;

    if (decodedToken) {
      const expDate = decodedToken.payload.exp;
      const currentTimeInSeconds = Math.floor(new Date().getTime() / 1000);

      if (expDate !== undefined && expDate > currentTimeInSeconds) {
        return false;
      } else {
        return true;
      }
    } else {
      console.error('Failed to decode token or no expiration time available!');
      return null;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        'An error occurred while decoding the token:',
        error.message
      );
    } else {
      console.error('An unknown error occurred during token decoding');
    }
    return null;
  }
};

export default isTokenExp;
