import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create skills
  const python = await prisma.skill.create({ data: { designation: 'Python' } });
  const graphql = await prisma.skill.create({ data: { designation: 'GraphQL' } });
  const docker = await prisma.skill.create({ data: { designation: 'Docker' } });

  // Create users
  const syrine = await prisma.user.create({
    data: {
      name: 'Syrine',
      email: 'Syrine@example.com',
      role: 'ADMIN',
    },
  });

  const ala = await prisma.user.create({
    data: {
      name: 'ala',
      email: 'ala@example.com',
      role: 'USER',
    },
  });

  // Create CVs
  await prisma.cv.create({
    data: {
      name: 'Syrine CV',
      age: 35,
      job: 'Full Stack Developer',
      userId: syrine.id,
      skills: {
        connect: [{ id: python.id }, { id: graphql.id }, { id: docker.id }],
      },
    },
  });

  await prisma.cv.createMany({
    data: [
      {
        name: 'Ala CV',
        age: 28,
        job: 'Backend Developer',
        userId: ala.id,
      },
      {
        name: 'Ala CV v2',
        age: 28,
        job: 'Cloud Architect',
        userId: ala.id,
      },
    ],
  });

  const cvList: { name: string; age: number; job: string; userId: number }[] = [];
  for (let i = 0; i < 30; i++) {
    cvList.push({
      name: 'syrine CV',
      age: 22,
      job: 'UI Designer',
      userId: syrine.id,
    });
  }

  await prisma.cv.createMany({ data: cvList });

  // Connect skills to the bulk CVs
  const allCvs = await prisma.cv.findMany({ where: { userId: syrine.id } });
  for (const cv of allCvs) {
    await prisma.cv.update({
      where: { id: cv.id },
      data: {
        skills: {
          connect: [{ id: python.id }, { id: graphql.id }],
        },
      },
    });
  }

  console.log('✅ Seed completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
