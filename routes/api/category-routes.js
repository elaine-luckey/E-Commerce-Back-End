const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCats = await Category.findAll({
      include: [{model: Product}],
    });
  if (!allCats) {
    res.status(404).json({message: "Sorry, no categories were found. Please try again."});
    return;
  }
  res.status(200).json(allCats);
} catch (err) {
  console.log(err);
  res.status(500).json(err);
}
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const catById = await Category.findOne({
      include: [{ model: Product }],
      where: { id: req.params.id },
    });
    if (!catById) {
      res.status(404).json({ message: "No category was found with that ID. Please try another ID." });
      return;
    }
    res.status(200).json(catById);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const newCat = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(newCat);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCat = await Category.update(
      { category_name: req.body.category_name },
      {
        where: { id: req.params.id },
      }
    );
    if (!updateCat[0]) {
      res.status(404).json({ message: "No category was found with that ID. Please try another ID." });
      return;
    }
    res.status(200).json(updateCategory);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCat = await Category.destroy({
      where: { id: req.params.id },
    });
    if (!deleteCat) {
      res.status(404).json({ message: "No category was found with that ID. Please try another ID." });
      return;
    }
    res.status(200).json(deleteCat);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
