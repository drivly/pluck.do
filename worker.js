import { map } from 'lodash'

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
  repo: 'https://github.com/drivly/pluck.do',
}

export default {
  fetch: async (req, env) => {
    const { hostname, pathname, search } = new URL(req.url)
    if (pathname == '/api') return new Response(JSON.stringify({api}, null, 2), { headers: { 'content-type': 'application/json; charset=utf-8' }})
    const [args, ...rest] = pathname.split('/')
    const token = `${hostname}/${args}`
    const url = req.url.replace(`${hostname}/${args}`,'')
    const data = await fetch(url, req).then(res => res.json()).catch(({ name, message }) => ({ error: { name, message }}))
    const pluckedData = map(data, [...args.split(',')])
    return new Response(JSON.stringify({url,token,data,pluckedData}, null, 2), { headers: { 'content-type': 'application/json; charset=utf-8' }})
  },
}
