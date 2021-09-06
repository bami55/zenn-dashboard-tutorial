import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const user = await prisma.user.create({
    data: {
      name: 'User001',
      password: 'Pass001',
    },
  })
  res.status(201).json(user)
}

export default handler
