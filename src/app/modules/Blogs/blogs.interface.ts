import { Date } from "mongoose";

export type TBlogs = {
  title: string;
  author: string;
  email: string;
  description: string;
  img: string;
  isDeleted: boolean;
  createdAt?: Date;
};
