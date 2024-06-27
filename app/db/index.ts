import sequelize from './config.js';

const initialize = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    return { sequelize };
  } catch (error) {
    console.error('Unable to connect to the database:', error);

    return {};
  }
};

export default initialize;
