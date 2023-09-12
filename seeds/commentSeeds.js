const { Comment } = require('../models');

const commentData = [
  {
    comment_text: 'En qué podemos ayudar?',
    user_id: 2, 
    post_id: 1,
  },
  {
    comment_text: 'Awww, que bonito!',
    user_id: 1, 
    post_id: 2, 
  },
  {
    comment_text: 'Yo soy Veterinario',
    user_id: 3, 
    post_id: 1, 
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
