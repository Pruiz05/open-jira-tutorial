interface ISeedData {
  entries: ISeedEntry[];
}

interface ISeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: ISeedData = {
  entries: [
    {
      description: "test 1 - Pending",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      description: "test 2 - in progress",
      status: "in-progress",
      createdAt: Date.now() - 1100000,
    },
    {
      description: "test 3 - finished",
      status: "finished",
      createdAt: Date.now() - 1000,
    },
  ],
};
