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

  async signInUser({ email }: UserInterface) {
    try {
      const user = await User.findOne({ where: { email } });
      return user;
    } catch (err) {
      console.log(err);
    }
  }

  async getUsers() {
    try {
      const users = await User.findAll();
      return users;
    } catch (err) {
      console.log(err);
    }
  }

  async getUserMe({id}) {
    try {
      const users = await User.findOne({ where: { id } });
      return users;
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

  async updateUser({ role,id }: UserInterface) {
    try {
      await User.update({role }, { where: { id } });
      const user = await User.findByPk(id);
      return user;
    } catch (err) {
      console.log(err);
    }
  }


}

export default new UserService();
