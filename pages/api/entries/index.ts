// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "@/databases";
import { IEntry } from "@/interfaces";
import { Entry } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = { message: string } | IEntry[] | IEntry;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getEntries(res);
    case 'POST':
      return insertEntry(req, res);
    default:
      return res.status(400).json({ message: "url do not exist" });
  }
}

const getEntries = async (res: NextApiResponse<Data>) => {
  await db.connect();

  const entries = await Entry.find().sort({
    createdAt: "ascending",
  });
  await db.disconnect();

  res.status(200).json(entries);
};

const insertEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const {
    description = ''
  } = req.body

  const newEntry = new Entry({
    description,
    createdAt: Date.now(),
  });

  try {
    await db.connect();

    await newEntry.save()

    await db.disconnect();
    return res.status(201).json(newEntry)
  } catch (error) {
    await db.disconnect()
    console.log(error)
    
    return res.status(500).json({
      message: 'something goes wrong'
    })
  }

}
