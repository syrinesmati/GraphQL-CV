import * as fs from "fs";
import * as path from "path";
import { Context } from "../context";

import { pubSub } from "../context";

// Fonction pour sauvegarder les données après mutation
const saveDataToFile = (cvs: any[], users: any[], skills: any[]) => {
  const dataPath = path.resolve(__dirname, "../data.ts");

  const fileContent = `
export const users = ${JSON.stringify(users, null, 2)};
export const skills = ${JSON.stringify(skills, null, 2)};
export const cvs = ${JSON.stringify(cvs, null, 2)};
  `;

  fs.writeFileSync(dataPath, fileContent, { encoding: "utf-8" });
};

export const Mutation = {
  createCv: (_: any, { input }: any, context: Context) => {
    const { cvs, users, skills } = context;

    const newId = cvs.length > 0 ? cvs[cvs.length - 1].id + 1 : 1;
    const user = users.find(u => u.id === input.userId);
    if (!user) throw new Error("User not found");

    input.skillIds.forEach((id: number) => {
      const skill = skills.find(s => s.id === id);
      if (!skill) throw new Error(`Skill with id ${id} not found`);
    });

    const newCv = { id: newId, ...input };
    cvs.push(newCv);

    saveDataToFile(cvs, users, skills);
    pubSub.publish("CV_ADDED", { cvAdded: newCv });

    return newCv;
  },

  updateCv: (_: any, { input }: any, context: Context) => {
    const { cvs, users, skills } = context;

    const index = cvs.findIndex(cv => cv.id === input.id);
    if (index === -1) throw new Error("CV not found");

    if (input.userId && !users.find(u => u.id === input.userId)) {
      throw new Error("User not found");
    }

    if (input.skillIds) {
      input.skillIds.forEach((id: number) => {
        if (!skills.find(s => s.id === id)) {
          throw new Error(`Skill with id ${id} not found`);
        }
      });
    }

    const updatedCv = {
      ...cvs[index],
      ...input,
    };

    cvs[index] = updatedCv;

    saveDataToFile(cvs, users, skills);
    pubSub.publish("CV_UPDATED", { cvUpdated: updatedCv });

    return updatedCv;
  },

  removeCv: (_: any, { id }: { id: number }, context: Context) => {
    const { cvs, users, skills } = context;

    const index = cvs.findIndex(cv => cv.id === id);
    if (index === -1) throw new Error("CV not found");

    const deletedCv = cvs[index];
    cvs.splice(index, 1);

    saveDataToFile(cvs, users, skills);
    pubSub.publish("CV_DELETED", { cvDeleted: deletedCv });

    return true;
  },
};
