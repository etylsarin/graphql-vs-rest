import { IResolvers } from "apollo-server-express";
import _ from "lodash/fp";
import { User, users } from "../users";

export const resolvers: IResolvers = {
  Query: {
    users: (): User[] => {
      return users;
    },
    user: (_root: undefined, { id }: { id: string }): User => {
      const user = _.find({ id }, users);
      if (user) {
        return user;
      }
      throw new Error("failed to find user");
    }
  },
  Mutation: {
    createUser: (_root: undefined, { name, age }: { name: string, age: number }): User => {
      const index = users.length;
      users.push({
        id: `${index + 1}`,
        name,
        age
      });
      return users[index];
    },
    updateUser: (_root: undefined, { id, name, age }: { id: string, name?: string, age?: number }): User => {
      const index = _.findIndex({ id }, users);
      if (index > -1) {
        users[index] = {
          ...users[index],
          name: name || users[index].name,
          age: age || users[index].age
        };
        return users[index];
      }
      throw new Error("failed to update user");
    },
    deleteUser: (_root: undefined, { id }: { id: string }): User => {
      const index = _.findIndex({ id }, users);
      if (index > -1) {
        return users.splice(index, 1)[0];
      }
      throw new Error("failed to delete user");
    }
  }
}