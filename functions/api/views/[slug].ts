interface Env {
  astro_blog_db: {
    prepare: (query: string) => {
      bind: (...values: unknown[]) => {
        first: <T>() => Promise<T | null>;
      };
    };
  };
}

type Context = {
  params: { slug: string };
  env: Env;
  request: Request;
};

export async function onRequestGet({
  params,
  env,
}: Context): Promise<Response> {
  const { slug } = params;
  const row = await env.astro_blog_db
    .prepare("SELECT count FROM views WHERE slug = ?")
    .bind(slug)
    .first<{ count: number }>();

  console.log(row);
  return Response.json({ count: row?.count ?? 0 });
}

export async function onRequestPost({
  params,
  env,
}: Context): Promise<Response> {
  const { slug } = params;
  const row = await env.astro_blog_db
    .prepare(
      "INSERT INTO views (slug, count) VALUES (?, 1) ON CONFLICT(slug) DO UPDATE SET count = count + 1 RETURNING count",
    )
    .bind(slug)
    .first<{ count: number }>();

  return Response.json({ count: row?.count ?? 1 });
}
