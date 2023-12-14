const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//GET all categories
router.get('/', async(req, res) => {
  try{
    // find all categories and include associated Products
    const dataCategory = await Category.findAll({include: [{model: Product}]});
    res.status(200).json(dataCategory)
  }catch (error) {
    res.status(500).json(error)
  }
});

//GET a single category 
router.get('/:id', async(req, res) => {
  try {
    // find one category by its `id` value and include associated Products
    const dataCategory = await Category.findByPk(req.params.id, 
      {
        include: [{model : Product}]
    });

    if(!dataCategory) {
    res.status(200).json({message: 'No category found with this id!'});
    return;
  }
    
    res.status(200).json(dataCategory);
  } catch (err) {
    res.sendStatus(500).json(err);
  }
});

//CREATE category
router.post('/', async(req, res) => {
  // create a new category
  try {
    const dataCategory = await Category.create(req.body);
    res.status(200).json(dataCategory)
  }catch (err){
    res.status(400).json(err)
  }
});

//UPDATE category
router.put('/:id', async(req, res) => {
  // update a category by its `id` value
  try{
    const dataCategory = await Category.update(req.body, {
      where: {id:req.params.id}
    })
    res.status(200).json(dataCategory)
  }catch  (error) {
    res.status(500).json(err)
  }
});

//Delete category
router.delete('/:id', async(req, res) => {
  // delete a category by its `id` value
  try{
    const dataCategory = await Category.destroy({
      where:{
        id: req.params.id
      }
    })

    if(!dataCategory){
      res.status(404).json({ message: 'Error: No category exists with this id.'});
      return;
    }

    res.status(200).json(dataCategory);
  }catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
