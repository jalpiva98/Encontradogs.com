const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");
const cloudinary = require("../../utils/cloudinary");
const upload = require("../../middleware/multer");
const sequelize = require("../../config/connection"); // Adjust the path as needed
const { Op } = require("sequelize");

// Function to handle error responses
const handleErrorResponse = (res, err) => {
  console.error(err);
  res.status(500).json({ error: "An error occurred" });
};

// Get all posts with associated user usernames
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ["username"] }],
    });
    res.status(200).json(postData);
  } catch (err) {
    // Handle errors and send a 500 Internal Server Error response
    handleErrorResponse(res, err);
  }
});

// Get a specific post by ID with associated user and comments
router.get("/posts/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["username"] },
        {
          model: Comment,
          include: [{ model: User, attributes: ["username"] }],
        },
      ],
    });
    if (!postData) {
      res.status(404).json({ message: "No post found with that id!" });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    // Handle errors and send a 500 Internal Server Error response
    handleErrorResponse(res, err);
  }
});

// Create a new post (requires authentication)
router.post("/", withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
  } catch (err) {
    // Handle errors and send a 500 Internal Server Error response
    handleErrorResponse(res, err);
  }
});

// Update an existing post by ID (requires authentication)
router.put("/posts/:id", withAuth, async (req, res) => {
  try {
    const updatedPost = await Post.update(
      {
        ...req.body,
      },
      {
        where: { id: req.params.id },
      }
    );

    if (!updatedPost) {
      res.status(404).json({ message: "No post found with that id!" });
      return;
    }
    res.status(200).json(updatedPost);
  } catch (err) {
    // Handle errors and send a 500 Internal Server Error response
    handleErrorResponse(res, err);
  }
});

// Delete a post by ID (requires authentication)
router.delete("/posts/:id", withAuth, async (req, res) => {
  try {
    await Comment.destroy({
      where: { post_id: req.params.id },
    });

    const deletedPost = await Post.destroy({
      where: { id: req.params.id },
    });

    if (!deletedPost) {
      res.status(404).json({ message: "No post found with that id!" });
      return;
    }
    res.status(200).json(deletedPost);
  } catch (err) {
    // Handle errors and send a 500 Internal Server Error response
    handleErrorResponse(res, err);
  }
});


router.get('/searchs', async (req, res) => {
  try {
    const { search } = req.query;
    let postData;
    console.log(search);
    if (search) {
      // If a search query is provided, perform the search
      const query = 'SELECT * FROM post WHERE LOWER(`title`) LIKE $1';
      postData = await sequelize.query(query, {
        bind: [`%${search}%`],
        type: sequelize.QueryTypes.SELECT,
        model: Post,
        mapToModel: true
      });
    } else {
      console.log('HOLAAAAAAAAAAA');
      // If no search query is provided, fetch all posts
      postData = await Post.findAll({
        include: [{ model: User, attributes: ['username'] }],
      });
    }
    res.status(200).json(postData);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "An error occurred" });
  }
});


// Handle image upload to Cloudinary
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "Pets", // specifies cloudinary folder name
    });

    // Respond with the image URL from Cloudinary
    res.status(200).json({ secure_url: result.secure_url });
  } catch (err) {
    // Handle errors and send a 500 Internal Server Error response
    handleErrorResponse(res, err);
  }
});

module.exports = router;