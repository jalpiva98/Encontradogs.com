const { User } = require('../models');

const userData = [
  {
    username: 'dogfinder1',
    email: 'doggo@example.com',
    password: 'password123',
  },
  {
    username: 'Gatlitos',
    email: 'catmaster@example.com',
    password: 'securepassword',
  },
  {
    username: 'gatriciostar',
    email: 'gatrick@example.com',
    password: 'mysecretpass',
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
