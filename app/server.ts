import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import categoryToutes from "../app/components/category/routes/categoryRoutes.ts"
import UserRoutes from "../app/components/user/routes/UserRoutes.ts"


const app = express();

app.use(cookieParser());
app.use(cors());

app.use("/api/category", categoryToutes);
app.use("/api/users", UserRoutes);


export const handelAppError = () => {
  app.use(function (req: any, res: any, next: any) {
    res.status(404).send("Не найденно");
  });

  app.use(function (err: any, req: any, res: any, next: any) {
    console.error(err.stack);
    res.status(500).send("Сломалось!");
  });
};

export default app;
