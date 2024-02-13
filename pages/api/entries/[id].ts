import { db } from "@/databases";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { Entry } from "@/models";
import { IEntry } from "@/interfaces";

type Data = { message: string } | IEntry;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: "Id is not valid: " + id,
    });
  }

  switch (req.method) {
    case "PUT":
      return updateEntry(req, res);
    case "GET":
      return getEntryById(req, res);
    case "DELETE":
      return deleteEntryById(req, res);
    default:
      return res.status(400).json({
        message: "method not exist",
      });
  }
}

const getEntryById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  await db.connect();
  const entry = await Entry.findById(id);
  await db.disconnect();

  if (!entry) {
    return res.status(400).json({
      message: "No entries found with id: " + id,
    });
  }

  return res.status(200).json(entry!);
};

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();

  const entryToUpdate = await Entry.findById(id);

  if (!entryToUpdate) {
    await db.disconnect();
    return res.status(400).json({
      message: "No entries found with id: " + id,
    });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      {
        description,
        status,
      },
      {
        runValidators: true,
        new: true,
      }
    );

    await db.disconnect();

    res.status(200).json(updatedEntry!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({
      message: JSON.stringify({ message: error.errors.status.message }),
    });
  }
};

const deleteEntryById = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.query;

  await db.connect();

  const entryToDelete = await Entry.findById(id);

  if (!entryToDelete) {
    await db.disconnect();
    return res.status(400).json({
      message: "No entries found with id: " + id,
    });
  }

  try {
    await Entry.deleteOne({
      id,
    });

    await db.disconnect();

    res.status(200).json({
      message: "Entry deleted",
    });
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({
      message: JSON.stringify({ message: error.errors.status.message }),
    });
  }
};
