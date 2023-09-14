const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {  
    console.log('Request body:', req.body);  // debug log
    console.log('Session user ID:', req.session.user_id);  // debug log

    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    console.log('New comment created:', newComment);  // debug log

    res.status(200).json(newComment);
  } catch (err) {
    console.error('An error occurred:', err);  // debug log
    res.status(400).json(err);
  }
});

module.exports = router;
