const reverse = (path, params, searchParams) => {
  let query = '';
  if (searchParams) {
    const queryParams = new URLSearchParams(searchParams);
    query = `?${queryParams}`;
  }
  if (params) {
    return (
      Object.keys(params).reduce(
        (p, key) => p.replace(`[${key}]`, params[key]),
        path
      ) + query
    );
  }
  return path + query;
};

const makeRoute = (path) => {
  const routeFn = (params, searchParams) => reverse(path, params, searchParams);
  routeFn.path = path;
  routeFn.toString = () => path;
  return routeFn;
};

export const routes = [
  {
    path: makeRoute('/'),
  },
  {
    path: makeRoute('/signin'),
    auth: false,
  },
  {
    path: makeRoute('/register'),
    auth: false,
  },
  {
    path: makeRoute('/account-settings'),
    auth: true,
  },
  {
    path: makeRoute('/audio-recorder'),
    auth: true,
  },
  {
    path: makeRoute('/dashboard'),
    auth: true,
  },
  {
    path: makeRoute('/dbt'),
    auth: true,
  },
  {
    path: makeRoute('/faq'),
    auth: true,
  },
  {
    path: makeRoute('/register'),
    auth: true,
  },
  {
    path: makeRoute('/selector'),
    auth: true,
  },
  {
    path: makeRoute('/signin'),
    auth: true,
  },
  {
    path: makeRoute('/terms'),
    auth: true,
  },
  {
    path: makeRoute('/upgrade'),
    auth: true,
  },
];
