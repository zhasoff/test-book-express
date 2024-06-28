import { Router } from "express";
import UserController from "../controllers/UserController.ts";
import multer from "multer";
import auth from "../../../shared/middleware/auth.ts";

const router = Router();

router
  .route("/")
  .get(UserController.getUser)

router
  .route("/:id/role")
  .put(multer().none(),auth.verifyToken({ requiredRole: 1 }), UserController.changeUserRole)

router
  .route("/login")
  .post(multer().none(), UserController.signInUser)

  router
  .route("/register")
  .post(multer().none(), UserController.createUser)

router
  .route("/all")
  .get(auth.verifyToken({ requiredRole: 1 }), UserController.getUsers)

router
  .route("/me")
  .get(auth.getIdByToken(), UserController.getUserMe)

export default router;
