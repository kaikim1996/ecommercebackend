// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongs To Category
Product.belongsTo(Category, {
  foreignKey: 'category_id'
})

// Categories have many Products
Category.hasMany(Product, {
  foreignKey:'category_id',
  onDelete: 'SET NULL'
});

// Products belongToMany Tags (through ProductTag)
Tag.belongsToMany(Product,{through: ProductTag});

// Tags belongToMany Products (through ProductTag)
Product.belongsToMany(Tag, {through: ProductTag});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
