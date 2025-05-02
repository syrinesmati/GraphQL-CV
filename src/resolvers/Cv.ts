import { Context } from "../context";

export const Cv = {
  user: (cv: any, _args: any, { prisma }: Context) => {
    return prisma.user.findUnique({
      where: { id: cv.userId },
    });
  },

  skills: (cv: any, _args: any, { prisma }: Context) => {
    return prisma.cv.findUnique({
      where: { id: cv.id },
    }).skills(); 
  },
}  