// Basic Auth middleware for Cloudflare Pages
export async function onRequest(context) {
  const { request, env } = context;

  const AUTH_USER = env.AUTH_USER || 'kirklees';
  const AUTH_PASS = env.AUTH_PASS || 'comms2026';

  const auth = request.headers.get('Authorization');

  if (!auth || !auth.startsWith('Basic ')) {
    return new Response('Unauthorized', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Council Dashboard"',
      },
    });
  }

  const encoded = auth.slice(6);
  const decoded = atob(encoded);
  const [user, pass] = decoded.split(':');

  if (user !== AUTH_USER || pass !== AUTH_PASS) {
    return new Response('Unauthorized', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Council Dashboard"',
      },
    });
  }

  // Auth passed, continue to the page
  return context.next();
}
