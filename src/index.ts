export interface Env {
  APP_NAME?: string;
}

export default {
  async fetch(_request: Request, env: Env): Promise<Response> {
    const name = env.APP_NAME ?? "dadutropy-worker";
    return new Response(`${name} is deployed`, {
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  },
};
