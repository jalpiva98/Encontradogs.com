const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");
const cloudinary = require("../../utils/cloudinary");
const upload = require("../../middleware/multer");

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
router.get("/:id", async (req, res) => {
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
router.put("/:id", withAuth, async (req, res) => {
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
router.delete("/:id", withAuth, async (req, res) => {
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

// Search for posts based on matching words in title or content
router.get("/search", async (req, res) => {
  try {
    const searchQuery = req.query.q; // Get the search query from the request query parameters

    // Use Sequelize's Op.or to search for posts with matching title or content
    const matchingPosts = await Post.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${searchQuery}%` } }, // Match words in the title
          { content: { [Op.like]: `%${searchQuery}%` } }, // Match words in the content
        ],
      },
      include: [{ model: User, attributes: ["username"] }],
    });

    res.status(200).json(matchingPosts);
  } catch (err) {
    // Handle errors and send a 500 Internal Server Error response
    handleErrorResponse(res, err);
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