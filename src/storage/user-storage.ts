import { User } from '../models/user';
import { v4 as uuidv4 } from 'uuid';

export class UserStorage {

  private users: Map<string, User> = new Map();

  getAll(): User[] {
    return [...this.users.values()].filter(user => !user.isDeleted);
  }

  get(id: string): User | undefined {
    return this.users.get(id);
  }

  update(id: string, user: User): User {
    this.users.set(id, user);
    return user;
  }

  create(user: User): User {
    user.id = uuidv4();
    this.users.set(user.id, user);
    return user;
  }

  delete(id: string): void {
    const user = this.users.get(id);
    if (user) {
      user.isDeleted = true;
    }
  }
}
