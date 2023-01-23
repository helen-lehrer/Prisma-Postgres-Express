const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const jobs = [
  {title: "nurse", location: "Portland, OR", salary: "$80k"},
  {title: "engineer", location: "Portland, OR", salary: "$200k"},
  {title: "lawyer", location: "Portland, OR", salary: "$350k"}
];

async function main() {
  for (let i = 0; i < jobs.length; i++) {
  await prisma.job.upsert({
      where: { id: i },
			update: {},
      create: {
         title: jobs[i]["title"], location: jobs[i]["location"], salary: jobs[i]["salary"]
        },
  });
}};

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  });