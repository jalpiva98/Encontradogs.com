const { Post } = require('../models');

const postData = [
  {
    title: 'Perro Insurgentes Sur',
    content: 'Encontré este perro en Insurgentes Sur',
    user_id: 1,
    category: 'Dog',
    size: 'Medium',
    color: 'Brown',
    breed: 'Mixed',
    location: 'Insurgentes Sur',
    time: 'Morning',
  },
  {
    title: 'Gato en Colonia del Valle',
    content: 'Encontré Gato gordo en Colonia del Valle',
    user_id: 2,
    category: 'Cat',
    size: 'Large',
    color: 'Black',
    breed: 'Persian',
    location: 'Colonia del Valle',
    time: 'Afternoon',
  },
  {
    title: 'Pajarito Caído en Polanco',
    content: 'Encontré un pajarito caido en Newton',
    user_id: 3,
    category: 'Bird',
    size: 'Small',
    color: 'Gray',
    breed: 'Sparrow',
    location: 'Polanco',
    time: 'Evening',
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
