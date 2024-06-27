import { Request, Response } from "express";
import UserService from "../services/UserService.ts";
// import ApiFeatures from "../../../shared/services/ApiFeatures.ts";
import User from "../models/User.ts";
import bcrypt from 'bcrypt'
import auth from "../../../shared/middleware/auth.ts";

class UserController {
  async createUser(req: Request, res: Response) {
    const { username, password, email, role } = req.body;

    const emailExist = await User.findOne({
      where: { email }
    });

    if (emailExist) {
      return res.status(400).send({ message: 'Такой Email уже существует' })
    }

    const user = await UserService.createUser({ username, password: await bcrypt.hash(password, 5), email, role });
    return res.json(user);
  }

  async getCategories(req: Request, res: Response) {
    // const apiFeatures = new ApiFeatures(Category, req.query);
    // const results = await apiFeatures.run();

    // return res.json(results);
  }

  async signInUser(req: Request, res: Response) {
   try{
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email }
    });
    if (!user) {
      return res.status(404).json('Пользователь с таким Email не найден');
    }
    console.log('aaa',user.dataValues);
    
    const passwordValid = await bcrypt.compare(password, user.dataValues.password);
    if (!passwordValid) {
      return res.status(404).json('Неверный логин или пароль');
    }
    const token = auth.generateToken({ id:user.dataValues.id, role: user.dataValues.role })
    console.log('aaaaa',token);
    
    return res.json("Kasd");
   } catch {
    return res.status(400).json({message: 'Ошибка'});

   }
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
