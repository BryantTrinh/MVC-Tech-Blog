
// DONE


const router = require('express').Router();

const { Post } = require('../../models/');

const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  const body = req.body;

  try {
    const newPost = await Post.create({ ...body, userId: req.session.userId });
    res.json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.put('/:id', withAuth, async (req, res) => {
  try {
    const [affectedRows] = await Post.update(req.body, {
    where: {
      id: req.params.id,
    },
  });

  // we have to see if rows affected is greater than 0 and then send status 200 if good, 404 if not. catch error with 500

  if (affectedRows > 0) {
    res.status(200).end();
  } else {
    res.status(404).end();
  }
} catch (err) {
  res.status(500).json(err);
}
});


// router.delete id param withAuth, affected rows, need to use destroy method

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const [affectedRows] = Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;