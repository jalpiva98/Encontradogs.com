// this are the modules we requiere, also the models for databases
const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// this is the route to get the homepage
router.get("/", async (req, res) => {
  try {
        // it also finds all the posts
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ["username"] }],
    });
    // we then convert the data to plain js object
    const posts = postData.map((post) => post.get({ plain: true }));
    // it renders the page with the posts
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// Route to render individual post page
router.get("/post/:id", withAuth, async (req, res) => {
  try {
        //  it gets also the user and the comments they made in each post
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["username"] },
        {
          model: Comment,
          include: [{ model: User, attributes: ["username"] }],
        },
      ],
    });
    // we algo pass post data to plain JavaScript object
    const post = postData.get({ plain: true });
    // next we render post template with the post data and if it is logged in 
    //added console log, because i made an error with capital letters and it was not showing anything
    //gonna leave that there for future ref
    console.log(`ESTO ES EL POST: ${Object.keys(post.User)}`);
    res.render("post", {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// this is the route to that renders the dashboard page with all posts by the current user
// and its user nameeee
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: { user_id: req.session.user_id },
      include: [{ model: User, attributes: ["username"] }],
    });
    // again we pass post data to plain js obj
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("dashboard", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("signup");
});

//this renders the new post route page
router.get("/newpost", (req, res) => {
  if (req.session.logged_in) {
    res.render("newpost");
    return;
  }
  res.redirect("/login");
});

//this renders the edit post page
router.get("/editpost/:id", async (req, res) => {
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

    const post = postData.get({ plain: true });

    res.render("editpost", {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// module exports router
module.exports = router;