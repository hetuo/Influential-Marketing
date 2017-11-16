'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('APP/db/models/user');
const Influencer = require('APP/db/models/influencer');
const Brand = require('APP/db/models/brand');
const Product = require('APP/db/models/product');
const Address = require('APP/db/models/address');
const Order = require('APP/db/models/order');
const OrderProduct = require('APP/db/models/order_product');
const Category = require('APP/db/models/category');
const Comment = require('APP/db/models/comment');
const Product_Review = require('APP/db/models/product_review')
const Cart_Line_Item = require('APP/db/models/cart_line_item')

const Campaign = require('APP/db/models/campaign');
const HireInfluencer = require('APP/db/models/hire_influencer');

Address.belongsTo(User)
Address.belongsTo(Brand)
//hasMany / belongsToMany
Product.belongsToMany(Category, {through: 'product_category'});
Category.belongsToMany(Product, {through: 'product_category'});

Product_Review.belongsTo(Influencer)
Product_Review.belongsTo(Product)
Product.hasMany(Product_Review)

Comment.belongsTo(Product_Review)
Comment.belongsTo(User)

Cart_Line_Item.belongsTo(User)
Cart_Line_Item.belongsTo(Product)
Cart_Line_Item.belongsTo(Brand)

Order.belongsTo(User)
Order.belongsTo(Brand)
Order.belongsTo(Address, {as: 'shipping_address'})
Order.belongsTo(Address, {as: 'billing_address'})

OrderProduct.belongsTo(Order)
OrderProduct.belongsTo(Product)

Campaign.belongsTo(Brand)
Brand.hasMany(Campaign)
HireInfluencer.belongsTo(Campaign)
Campaign.hasMany(HireInfluencer)
HireInfluencer.belongsTo(Influencer)
Influencer.hasMany(HireInfluencer)
HireInfluencer.belongsTo(Brand)
Brand.hasMany(HireInfluencer)

module.exports = {
	User,
	Influencer,
	Brand,
	Product,
	Address,
	Category,
	Product_Review,
	Cart_Line_Item,
	Order,
	OrderProduct,
	Comment,
	Campaign,
	HireInfluencer
};
