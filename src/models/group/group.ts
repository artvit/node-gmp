import { Permission } from './permission';

export type Group = {
  id: string;
  name: string;
  permissions: Permission[]
};
