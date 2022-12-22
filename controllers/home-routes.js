// home route require express and we need Post, Comment, User
// DONE

const router = require('express').Router();

const { Post, Comment, User } = require('../models/');

// get route to get a single post





router.get('/post/:id', async (req, res) => {
  try{
    const postData =await Post.findByPk(req.params.id, {
      include: [User, Comment, User]
    });

    if (postData) {
      res.render('single-post', {
        post: postData.get({
          plain: true })
        });
      } else {
        res.status(404).end();
      }
    } catch (err) {
      res.status(500).json(err);
    }
      });

  router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
      res.render('login');
  });
  
  router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }

      res.render('signup');
  });
  



// get all the posts for our homepage
// we have to create an array for const posts, have to use postData.map instead 

// router.get('/', async (req, res) => {
//   try {
//     const postData = await Post.findAll({
//       include: [User],
//   });

//     res.render('all-posts', { posts: postData });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


  router.get('/', async (req, res) => {
    try {
      const postData = await Post.findAll({
        include: [User],
      });

      // map turns postData into an array and we do post as a callback function. 'post' callback function references to each element  of the postData array.

      const posts = postData.map((post) => post.get
      ({ plain: true }));

        res.render('all-posts', { posts });
      } catch (err) {
        res.status(500).json(err);
      }
  });



module.exports = router;