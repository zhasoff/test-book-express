import express from 'express';
import bodyParser from 'body-parser';

import app, { handelAppError } from "./server.js";
import initializeDb from './db/index.ts';

const port = process.env.PORT || 3000;

const start = async () => {
  const { sequelize } = await initializeDb();
  if (sequelize) {
    await sequelize.sync({ force: true });
  }
  
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  handelAppError();

  app.listen(port, () => {
    console.log(`Запущен: http://localhost:${port}`);
  });
};

start();
