const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

//GET all tags
router.get('/', async(req, res) => {
  try {
    // find all tags
    const dataTag = await Tag.findAll({
      // be sure to include its associated Product data
      include: [{
        model: Product, through: ProductTag
      }]
    })
    res.status(200).json(dataTag)
  } catch (error) {
    res.status(500).json(error)
  }
});

//GET single tag 
router.get('/:id', async(req, res) => {
  try {
    // find a single tag by its `id`
    const dataTag = await Tag.findOne({
      // be sure to include its associated Product data
      where: {id: req.params.id},
      include: [{model: Product, 
      through: ProductTag}]
    });

    if(!dataTag) {
    res.status(200).json({message: 'No tag found with this id!'});
    return;
  }
    res.status(200).json(dataTag);
} catch (err) {
  res.sendStatus(500).json(err);
}  
});

//CREATE tag
router.post('/', async(req, res) => {
  // create a new tag
  try {
    const dataTag = await Tag.create(req.body);
    res.status(200).json(dataTag);
  } catch (err) {
    res.status(500).json(err);
  }
});


//UPDATE tag
router.put('/:id', async(req, res) => {
  // update a tag's name by its `id` value
  try {
    const dataTag = await Tag.update(req.body, {
      where: {id:req.params.id}
    })
    res.status(200).json(dataTag)
  } catch (error) {
    res.status(500).json(error)
  }
});

router.delete('/:id', async(req, res) => {
  // delete on tag by its `id` value
  try {
    const dataTag = await Tag.destroy({
      where:{
        id: req.params.id
      }
    })

    if(!dataTag){
      res.status(404).json({message: 'Error: This tag does not exist!'});
      return;
    }

    res.status(200).json(dataTag);
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
