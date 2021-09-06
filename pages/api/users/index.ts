import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const user = await prisma.user.findMany({
    orderBy: {
      updatedAt: 'desc',
    }
  })
  res.status(200).json(user)
}

export default handler
