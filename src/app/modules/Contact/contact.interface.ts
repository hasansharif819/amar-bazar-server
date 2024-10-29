import { Date } from "mongoose";

export type TContact = {
  name: string;
  email: string;
  message: string;
  createdAt?: Date;
};
