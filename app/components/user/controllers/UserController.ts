import { Request, Response } from "express";
import UserService from "../services/UserService.ts";
// import ApiFeatures from "../../../shared/services/ApiFeatures.ts";
import User from "../models/User.ts";

class UserController {
  async createUser(req: Request, res: Response) {
    const { username, password,email, role } = req.body;
    const user = await UserService.createUser({ username, password, email, role });
    return res.json(user);
  }

  async getCategories(req: Request, res: Response) {
    // const apiFeatures = new ApiFeatures(Category, req.query);
    // const results = await apiFeatures.run();

    // return res.json(results);
  }

  async getUser(req: Request, res: Response) {
    const { id } = req.params;
    const user = await UserService.getUser({ id: +id });

    if (!user)
      return res.status(404).json({ message: "User not found" });
    return res.json(user);
  }

  // async updateUser(req: Request, res: Response) {
  //   const { id } = req.params;
  //   const { name, parentId } = req.body;
  //   const user = await UserService.updateUser({
  //     id: +id,
  //     name,
  //     parentId,
  //   });

  //   if (!user)
  //     return res.status(404).json({ message: "User not found" });

  //   return res.json(user);
  // }

  // async deleteUser(req: Request, res: Response) {
  //   const { id } = req.params;
  //   const user = await UserService.deleteUser({ id: +id });

  //   if (!user)
  //     return res.status(404).json({ message: "User not found" });

  //   return res.json(user);
  // }
}

export default new UserController();
