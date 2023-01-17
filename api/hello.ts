import type { VercelRequest, VercelResponse } from '@vercel/node'

export default function hello(req: VercelRequest, res: VercelResponse) {
  res.statusCode = 200
  res.json({ message: 'hello works' })
}
