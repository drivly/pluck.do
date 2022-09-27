import { pluck } from 'lodash-es'

export const api = {
  icon: '👌',
  name: 'pluck.do',
  description: 'Pluck a Property from a JSON Document',
  url: 'https://pluck.do/api',
  type: 'https://apis.do/subscriptions',
  endpoints: {
    pluckFromURL: 'https://pluck.do/:property/:url',
    pluckFromPOST: 'https://pluck.do/:property',
  },
  site: 'https://pluck.do',
  login: 'https://pluck.do/login',
  signup: 'https://pluck.do/signup',
  subscribe: 'https://pluck.do/subscribe',
  repo: 'https://github.com/drivly/subscribe.do',
}

export default {
  fetch: async (req, env) => {
    const { hostname, pathname, search } = new URL(req.url)
    if (pathname == '/api') return new Response(JSON.stringify({api}, null, 2), { headers: { 'content-type': 'application/json; charset=utf-8' }})
    const [args, ...rest] = pathname.split('/')
    const url = req.url.replace(`${hostname}/${args}/`,'')
    const data = await fetch(url, req).then(res => res.json()).catch(({ name, message }) => ({ error: { name, message }}))
    const pluckedData = pluck(data, args)
    return new Response(JSON.stringify(pluckedData, null, 2), { headers: { 'content-type': 'application/json; charset=utf-8' }})
  },
}
