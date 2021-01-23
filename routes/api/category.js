const express = require('express');
const router = express.Router();
const Category = require('../../models/Category');

// @route           GET /category
// @description     Test route
router.get('/', async (req, res) => {
  try {
    const category = await Category.find();

    res.send(category);
  } catch (error) {
    console.log(error);
    res.status(500).send('server error');
  }
});

// @route           GET /category/:id
// @description     Test route
router.get('/:id', async (req, res) => {
  try {
    let id = await req.params.id;
    const category = await Category.findById(id);

    res.json(category);
  } catch (error) {
    res.status(400).send('error getting category');
  }
});

// @route           POST /category
// @description     Add a category
router.post('/', async (req, res) => {
  try {
    const category = await Category(req.body);

    category.save();
    res.status(200).send('New category added successfully.');
  } catch (error) {
    res.status(400).send('Error adding new category.')
  }
});

// @route           POST /category/:id
// @description     Add a subcategory
router.post('/:id', async (req, res) => {
  try {
    let category = await Category.findById(req.params.id);
    console.log(req.params.id);
    if (!category) res.status(404).send('No Category to add a subcategory to.');

    category.categoryName = req.body.categoryName;
    category.subcategories = req.body.subcategories;


    await category.save();
    res.status(200).send('New category added successfully.');
  } catch (error) {
    res.status(400).send('Error adding new category.')
  }
});

// @route           DELETE /category/:id
// @description     Delete a category
router.delete('/:id', async (req, res) => {
  try {
    let id = await req.params.id;

    const category = await Category.findByIdAndDelete({ _id: id });
    
    res.send(category);
  } catch (error) {
    res.status(400).send('Error deleting a category.');
    
  }
});

// @route           PUT /category/:id
// @description     Update a category
router.put('/:id', async (req, res) => {
  try {
    let id = await req.params.id;
    let category = await Category.findById(id);

    if (!category) res.status(404).send('No category to update');

    roadmap.categoryName = req.body.categoryName;
    roadmap.subcategories = req.body.subcategories;

    await category.save();
    res.json('Category updated succesfully');
  } catch (error) {
    res.status(400).send('Error updating category');
  }
})
module.exports = router;