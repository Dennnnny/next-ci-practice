// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("api: public ",1, " ", process.env.NEXT_PUBLIC_ENV)
  console.log("api: custom ",2, " ", process.env.CUSTOM_ENV)
  res.status(200).json({ name: 'John Doe' })
}
