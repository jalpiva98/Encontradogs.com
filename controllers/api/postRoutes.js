const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");
const cloudinary = require("../../utils/cloudinary");
const upload = require("../../middleware/multer");


const handleErrorResponse = (res, err) => {
  console.error(err);
  res.status(500).json({ error: "An error occurred" });
};

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ["username"] }],
    });
    res.status(200).json(postData);
  } catch (err) {
    handleErrorResponse(res, err); 
  }
});

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
    handleErrorResponse(res, err);
  }
});

router.post("/", withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
  } catch (err) {
    handleErrorResponse(res, err); 
  }
});

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
    handleErrorResponse(res, err);
  }
});

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
    handleErrorResponse(res, err);
  }
});

// Handle image upload
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
    handleErrorResponse(res, err);
  }
});

module.exports = router;
