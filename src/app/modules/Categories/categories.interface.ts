import { Date } from 'mongoose';

export type TCategory = {
  name: string;
  img: string;
  isDeleted: boolean;
  createdAt?: Date;
};
