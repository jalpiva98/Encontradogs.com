const { Post } = require('../models');

const postData = [
  {
    title: 'Perro Insurgentes Sur',
    content: 'Encontré este perro en Insurgentes Sur',
    user_id: 1, 
  },
  {
    title: 'Gato en Colonia del Valle',
    content: 'Encontré Gato gordo en Colonia del Valle',
    user_id: 2, 
  },
  {
    title: 'Pajarito Caído en Polanco',
    content: 'Encontré un pajarito caido en Newton',
    user_id: 3, 
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
