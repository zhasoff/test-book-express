import { Router } from "express";
import UserController from "../controllers/UserController.ts";
import multer from "multer";
// import { validateAdmin } from "../../auth/middlewares/authMiddleware.ts";

const router = Router();

router
  .route("/")
  .post(multer().none(), UserController.createUser)
  .get(UserController.getUser);

router
  .route("/:id")
  .get(UserController.getCategories)
// .put(validateAdmin, categoryController.updateCategory)
// .delete(validateAdmin, categoryController.deleteCategory);

router
  .route("/login")
  .post(multer().none(), UserController.signInUser)
export default router;
