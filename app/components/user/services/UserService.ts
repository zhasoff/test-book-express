import { UserInterface } from "../interfaces/UserInterface.ts";
import User from "../models/User.ts";

class UserService {
  async createUser({ username, password, email, role }: UserInterface) {
    try {
      const user = await User.create({ username, password, email, role });
      return user;
    } catch (err) {
      console.log(err);
    }
  }

  // async signInUser({ email, password }: UserInterface) {
  //   try {
  //     const user = await User.findOne({ email, password });
  //     return user;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  async getUsers() {
    try {
      const categories = await User.findAll();
      return categories;
    } catch (err) {
      console.log(err);
    }
  }

  async getUser({ id }: UserInterface) {
    try {
      const user = await User.findByPk(id);
      return user;
    } catch (err) {
      console.log(err);
    }
  }

  async updateUser({ id, username, password, role }: UserInterface) {
    try {
      await User.update({ username, password, role }, { where: { id } });
      const user = await User.findByPk(id);
      return user;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteUser({ id }: UserInterface) {
    try {
      const user = await User.destroy({ where: { id } });
      return user;
    } catch (err) {
      console.log(err);
    }
  }

  async getUsersCount() {
    try {
      const categoriesCount = await User.count();
      return categoriesCount;
    } catch (err) {
      console.log(err);
    }
  }
}

export default new UserService();
