import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface Params {
  [key: string]: string
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { id } = req.query as Params
  let query = {}
  if (id) {
    query = {
      where: {
        id: id,
      },
    }
  }
  await prisma.user.deleteMany(query)
  res.status(204).end()
}

export default handler
