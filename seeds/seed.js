const sequelize = require('../config/connection');
const seedUsers = require('../seeds/userSeeds');
const seedPosts = require('../seeds/postSeeds');
const seedComments = require('../seeds/commentSeeds');

const seedAll = async () => {
  try {
    await sequelize.sync({ force: true });

    await seedUsers();
    await seedPosts();
    await seedComments();

    console.log('Database seeded successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedAll();
