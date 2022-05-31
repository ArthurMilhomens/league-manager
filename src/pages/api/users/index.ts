import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getUsers } from "../../../lib/users";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  
  const users = await getUsers();

  if (method === 'GET') {

    return res.status(200).json({ data: users })
  } else if (method === 'POST') {
    const { name, score } = req.body;

    const user = await prisma.user.create({
      data: {
        name,
        score
      },
    })

    return res.status(201).json({ data: user })
  } else if (method === 'PUT'){
    const { users: usersToUpdate } = req.body

    for (let index = 0; index < usersToUpdate.length; index++) {
      await prisma.user.update({
        where: {
          id: usersToUpdate[index].id,
        },
        data: {
          score: users.find((user) => user.id === usersToUpdate[index].id).score + usersToUpdate[index].score
        }
      })
    }

    return res.status(200).json({ message: "Update complete!" })
  }

  return res.status(404).json({ message: 'Route not found.' });

}
