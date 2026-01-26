// WIP Router - routes paths to different Cloudflare Pages projects
const routes = {
  '/council-dashboard': 'https://council-dashboard.pages.dev',
  // Add more projects here as needed:
  // '/another-project': 'https://another-project.pages.dev',
};

function unauthorized() {
  return new Response('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="WIP Projects"',
    },
  });
}

function checkAuth(request, env) {
  const auth = request.headers.get('Authorization');
  if (!auth || !auth.startsWith('Basic ')) {
    return false;
  }

  const encoded = auth.slice(6);
  const decoded = atob(encoded);
  const [user, pass] = decoded.split(':');

  // Use env vars, fallback to defaults for dev
  const validUser = env.AUTH_USER || 'kirklees';
  const validPass = env.AUTH_PASS || 'comms2026';

  return user === validUser && pass === validPass;
}

export default {
  async fetch(request, env) {
    // Check authentication
    if (!checkAuth(request, env)) {
      return unauthorized();
    }

    const url = new URL(request.url);
    const path = url.pathname;

    // Check if path matches any route
    for (const [prefix, target] of Object.entries(routes)) {
      // Redirect /project to /project/ for correct relative link resolution
      if (path === prefix) {
        return Response.redirect(url.origin + prefix + '/' + url.search, 301);
      }

      if (path.startsWith(prefix + '/')) {
        // Rewrite the path, removing the prefix
        const newPath = path.slice(prefix.length) || '/';
        const targetUrl = new URL(newPath + url.search, target);

        // Fetch from the target Pages project
        const response = await fetch(targetUrl.toString(), {
          method: request.method,
          headers: request.headers,
          body: request.body,
        });

        // Return response with CORS headers if needed
        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
        });
      }
    }

    // No matching route - show index or 404
    if (path === '/' || path === '') {
      return new Response(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>WIP Projects - Max Youell</title>
          <style>
            body { font-family: system-ui; max-width: 600px; margin: 50px auto; padding: 20px; }
            h1 { color: #333; }
            ul { list-style: none; padding: 0; }
            li { margin: 10px 0; }
            a { color: #0066cc; text-decoration: none; padding: 10px 15px; background: #f5f5f5; border-radius: 8px; display: inline-block; }
            a:hover { background: #e5e5e5; }
          </style>
        </head>
        <body>
          <h1>WIP Projects</h1>
          <ul>
            <li><a href="/council-dashboard/">Council Dashboard</a></li>
          </ul>
        </body>
        </html>
      `, {
        headers: { 'Content-Type': 'text/html' },
      });
    }

    return new Response('Not Found', { status: 404 });
  },
};
