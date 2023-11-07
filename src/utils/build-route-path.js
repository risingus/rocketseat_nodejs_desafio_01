

export function buildRoutePath(path) {
  if (typeof path !== 'string') return '';
  const reouteParametersRegex = /:([a-zA-Z]+)/g;
  const paramsWithParams = path.replaceAll(reouteParametersRegex, '(?<$1>[a-z0-9\-_]+)')

  const pathRegex = new RegExp(`^${paramsWithParams}(?<query>\\?(.*))?$`)

  return pathRegex;
}