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
    location: '20.632302, -100.473404',
    time: 'Morning',
    imageUrl:'https://estaticos-cdn.prensaiberica.es/clip/823f515c-8143-4044-8f13-85ea1ef58f3a_16-9-discover-aspect-ratio_default_0.jpg'
  },
  {
    title: 'Gato en Colonia del Valle',
    content: 'Encontré Gato gordo en Colonia del Valle',
    user_id: 2,
    category: 'Cat',
    size: 'Large',
    color: 'Black',
    breed: 'Persian',
    location: '20.64676, -100.359421',
    time: 'Afternoon',
    imageUrl: 'https://res.cloudinary.com/dddkhzegf/image/upload/v1695257600/Pets/rfvjejpebpqazgy8tnzu.jpg'
  },
  {
    title: 'Pajarito Caído en Polanco',
    content: 'Encontré un pajarito caido en Newton',
    user_id: 3,
    category: 'Bird',
    size: 'Small',
    color: 'Gray',
    breed: 'Sparrow',
    location: '20.670372, -100.451946',
    time: 'Evening',
    imageUrl: 'https://endanea.com/wp-content/uploads/2015/10/endanea-mascotas-pajaro-caido-nido.jpg'
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
