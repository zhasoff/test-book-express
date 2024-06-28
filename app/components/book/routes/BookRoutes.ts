import { Router } from "express";
import BookController from "../controllers/BookController.ts";
import multer from "multer";
import auth from "../../../shared/middleware/auth.ts";
// import { validateAdmin } from "../../auth/middlewares/authMiddleware.ts";

const router = Router();

router
  .route("/")
  .get(BookController.getBooks)
  .post(multer().none(), auth.verifyToken({ requiredRole: 1 }), BookController.createBook)

router
  .route("/:id")
  .get(BookController.getBook)
  .put(multer().none(), auth.verifyToken({ requiredRole: 1 }), BookController.updateBook)
  .delete(auth.verifyToken({ requiredRole: 1 }), BookController.deleteBook);

export default router;
