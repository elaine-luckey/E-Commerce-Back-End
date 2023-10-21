const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const findAllTags = await Tag.findAll({
      include: [{model: Product}],
    });
    if(!findAllTags) {
      res.status(404).json({message: "No tags were found using that tag. Please try again."});
      return;
    }
    res.status(200).json(findAllTags);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
try {
  const findTagById = await Tag.findOne({
    include: [{model: Product}],
    where: {id: req.params.id},
  });
  if(!findTagById) {
    res.status(404).json({message: "No tags were found using that tag. Please try again."});
    return;
  }
  res.status(200).json(findTagById);
} catch(err) {
  console.log(err);
  res.status(500).json(err);
}
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const createNewTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(createNewTag);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTagName = await Tag.update(req.body, {
      where: {id: req.params.id},
    });
    if(!updateTagName[0]) {
      res.status(404).json({message: "No tags were found using that tag. Please try again."});
      return;
    }
    res.status(200).json(updateTagName);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete one tag by its `id` value
  try {
    const deleteOneTag = await Tag.destroy({
      where: {id: req.params.id},
    });
    if (!deleteOneTag){
      res.status(404).json({message:"No tags were found using that tag. Please try again."});
      return;
    }
    res.status(200).json(deleteOneTag);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
