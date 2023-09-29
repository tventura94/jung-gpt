import { getAuth } from 'libs/firebase-admin';
import { cookies, headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const authorization = headers().get('Authorization');

  if (authorization?.startsWith('Bearer ')) {
    const idToken = authorization.split('Bearer ')[1];

    const decodedToken = await getAuth().verifyIdToken(idToken);

    if (decodedToken) {
      const expiresIn = 60 * 60 * 24 * 5 * 1000;
      const sessionCookie = await getAuth().createSessionCookie(idToken, {
        expiresIn,
      });
      const options = {
        name: 'session',
        value: sessionCookie,
        maxAge: expiresIn,
        httpOnly: true,
        secure: true,
      };
      cookies().set(options);
    }
  }

  return NextResponse.json({}, { status: 200 });
}
