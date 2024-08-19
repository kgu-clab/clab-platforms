'use client';

export default function getAPIURL(endPoint: string) {
  return new URL(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/${endPoint}`);
}
