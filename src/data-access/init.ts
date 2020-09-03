import { Sequelize } from 'sequelize';

const uri = process.env.DB_URI;
if (!uri) {
  console.error('DB_URI is not provided');
  process.exit(1);
}
export const sequelize = new Sequelize(uri, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

sequelize.authenticate().then(() => {
  console.log('Connection established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
