import { rest } from 'msw'

let entries = [];

export const handlers = [
  rest.post('/entry', (req, res, ctx) => {
    entries.push(JSON.parse(req.body));
    return res(
      ctx.status(200),
      ctx.json({
          message: 'entry created',
      })
    )
  }),

  rest.get('/entry', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(entries)
    )
  })
]
