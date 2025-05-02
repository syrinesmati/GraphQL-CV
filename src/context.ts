import { users } from "./data";
import { skills } from "./data";
import { cvs } from "./data";


import { createPubSub } from "graphql-yoga";

type Events = {
  CV_ADDED:  [{ cvAdded: any }];    
  CV_UPDATED:[{ cvUpdated: any }];
  CV_DELETED:[{ cvDeleted: any }];
};
export const pubSub = createPubSub<Events>();



export interface Context {
  users: typeof users;
  skills: typeof skills;
  cvs: typeof cvs;

  pubSub: typeof pubSub;

}

export const context: Context = {
  users: users,
  skills: skills,
  cvs: cvs,

  pubSub


};