export default function getAPIURL(endPoint: string) {
  return new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/${endPoint}`);
}
