const cloudinary = require('cloudinary').v2;

// configures cloudinary with credentials
             
cloudinary.config({ 
    cloud_name: 'dddkhzegf', 
    api_key: '233696918957365', 
    api_secret: 'kba9wJKuBBaWpMLNNIlaN-3OAls',
    secure: true 
  });

  module.exports = cloudinary;