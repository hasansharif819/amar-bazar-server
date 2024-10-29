import { Date } from "mongoose";

export type TExperience = {
  companyName: string;
  address: string;
  title: string;
  description: string;
  logo?: string;
  website: string;
  joining: string;
  ending: string;
  isDeleted?: boolean;
  createdAt?: Date;
};
