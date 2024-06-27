import { Router } from "express";
import UserController from "../controllers/UserController.ts";
// import { validateAdmin } from "../../auth/middlewares/authMiddleware.ts";

const router = Router();

router
  .route("/")
  // .post(validateAdmin, categoryController.createCategory)
  .get(UserController.getUser);

router
  .route("/:id")
  .get(UserController.getCategories)
  // .put(validateAdmin, categoryController.updateCategory)
  // .delete(validateAdmin, categoryController.deleteCategory);

export default router;
