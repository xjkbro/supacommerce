export const revalidate = 60;
export const runtime = "experimental-edge";
export async function GET(request) {
    return new Response("Hello, Next.js from the edge!");
}
