import { pluck } from 'lodash'

export default {
  fetch: async (req, env) => {
    const { hostname, pathname, search } = new URL(req.url)
    const [args, ...rest] = pathname.split('/')
    const url = req.url.replace(`${hostname}/${args}/`,'')
    const data = await fetch(url, req).then(res => res.json()).catch(({ name, message }) => ({ error: { name, message }}))
    const pluckedData = pluck(data, args)
    return new Response(JSON.stringify(pluckedData, null, 2), { headers: { 'content-type': 'application/json; charset=utf-8' }})
  },
}
