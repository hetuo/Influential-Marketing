const db = require('.')
const { User, Influencer, Brand, Product, Category, Address, Order, OrderProduct, Product_Review, Campaign, HireInfluencer} = require('./models');

// db.didSync
// .then(() => db.sync({ force: true }))

//, Order, OrderProduct, Address, Category
let data = {

        userData: [
         {name: 'so may', email: 'god@example.com', password: '1234'},
         {name: 'Barack Obama', email: 'barack@example.gov', password: '1234'},
         {name: 'Lida Cannon', email: 'kalo@sokum.com', password: '1234'},
         {name: 'Chase Mitchell', email: 'apoinpe@bij.io', password: '1234'},
         {name: 'Gertrude Morgan', email: 'ekisutjul@ahtove.com', password: '1234'},
         {name: 'Josie Vargas', email: 'zuav@om.gov', password: '1234'},
         {name: 'Julian Soto', email: 'uzoho@hu.gov', password: '1234'},
         {name: 'Vincent Cohen', email: 'wu@tonin.edu', password: '1234'},
         {name: 'Tillie Higgins', email: 'acubizfew@pesohu.org', password: '1234'},
         {name: 'Frank Russell', email: 'seja@licgolul.org', password: '1234'},
         {name: 'Franklin Bishop', email: 'ogijeaja@veifus.com', password: '1234'},
         {name: 'Iva Carson', email: 'nikok@ejrib.gov', password: '1234'}
        ],

        brandData: [
           {name: 'brand1', category: 'food', email: 'brand1@brand.com', usertype: 'brand_account', geo: 'NY',zipcode: '10001', password_digest: '1234'},
           {name: 'brand2', category: 'food', email: 'brand2@brand.com', usertype: 'brand_account', geo: 'NY',zipcode: '10001', password_digest: '1234'},
           {name: 'brand3', category: 'beverage', email: 'brand3@brand.com', usertype: 'brand_account', geo: 'NY',zipcode: '10001', password_digest: '1234'},
           {name: 'brand4', category: 'food', email: 'brand4@brand.com', usertype: 'brand_account', geo: 'CA',zipcode: '90017', password_digest: '1234'},
           {name: 'brand5', category: 'food', email: 'brand5@brand.com', usertype: 'brand_account', geo: 'CA',zipcode: '90017', password_digest: '1234'},
           {name: 'brand6', category: 'beverage', email: 'brand6@brand.com', usertype: 'brand_account', geo: 'CA',zipcode: '90017', password_digest: '1234'},
           {name: 'brand7', category: 'food', email: 'brand7@brand.com', usertype: 'brand_account', geo: 'PA',zipcode: '15106', password_digest: '1234'},
           {name: 'brand8', category: 'food', email: 'brand8@brand.com', usertype: 'brand_account', geo: 'PA', zipcode: '15106', password_digest: '1234'},
           {name: 'brand9', category: 'beverage', email: 'brand9@brand.com', usertype: 'brand_account', geo: 'PA', zipcode: '15106', password_digest: '1234'}
        ],


        influencerData: [
          {name: 'influencer1', email: 'influencer1@influencer.com', zipcode: '10001', gender: 'male', password: '1234'},
          {name: 'influencer2', email: 'influencer2@influencer.com', zipcode: '10001', gender: 'female', password: '1234'},
          {name: 'influencer3', email: 'influencer3@influencer.com', zipcode: '10001', gender: 'male', password: '1234'},
          {name: 'influencer4', email: 'influencer4@influencer.com', zipcode: '90017', gender: 'female',password: '1234'},
          {name: 'influencer5', email: 'influencer5@influencer.com', zipcode: '90017', gender: 'male', password: '1234'},
          {name: 'influencer6', email: 'influencer6@influencer.com', zipcode: '90017', gender: 'female',password: '1234'},
          {name: 'influencer7', email: 'influencer7@influencer.com', zipcode: '90017', gender: 'male', password: '1234'},
          {name: 'influencer8', email: 'influencer8@influencer.com', zipcode: '15106', gender: 'female',password: '1234'},
          {name: 'influencer9', email: 'influencer9@in.com', usertype: 'influencer', geo: 'CA', zipcode: '15106', gender: 'male', password_digest: '123456', public_key: 'pk_test_dUpJ1puJKBLPgcFE7iaPdJoa', secret_key: 'sk_test_Y1mt48rrnpqB3QVpc2iZiG3t'},
          {name: 'director01', email: 'zzhang115@dons.usfca.edu', usertype: 'director', geo: 'CA', zipcode: '15106', gender: 'female', password_digest: '123456'}
       ],

        productData: [

         {name: 'St Louis', sku: 'GR1', description: {Warranty: 'Lifetime',
         Lens: 'Seafoam Mirrored Lens - Mirrored Lens Care',
         Frame: 'Handcrafted, Acetate Frames',
         Protection: '100% UVA / UVB protection',
         Prescription: 'Ready',
         Size: '46-23-145',
         Case: 'Premium Hard Case',
         Extras: 'Microfiber Cleaning Cloth'}, price: 300.00, quantity: 10, image:'/images/products/StLouis-MatteBlack-Website-Front_large.png'},

         {name: 'CBD', sku: 'GDN1', description: {Warranty: 'Lifetime',
         Lens: 'Grey',
         Hardware: '24K Gold Plated Hardware',
         Frame: 'Handcrafted, Acetate Frames',
         Protection: '100% UVA / UVB protection + AR Coating',
         Prescription: 'Ready',
         Size: '53-22-145',
         Case: 'Premium Hard Case',
         Extras: 'Microfiber Cleaning Cloth'}
         , price: 350.00, quantity: 20, image:'/images/products/CL-10-OysterBlack-Front_285a8f7d-6c3a-4981-a556-942442bfffe6_large.png'},

         {name: 'Orleans', sku: 'DSD1', description: {Warranty: 'Lifetime',
         Lens: 'Rose Mirrored',
         Hardware: 'Rose Gold Plated Titanium',
         Frame: 'Handcrafted, Acetate Frames',
         Protection: '100% UVA / UVB protection + AR Coating',
         Prescription: 'Ready',
         Size: '48-22-145',
         Case: 'Premium Hard Case',
         Extras: 'Microfiber Cleaning Cloth'}
        , price: 280.00, quantity: 50, image:'/images/products/Orleans-24KTitaniumCarnevale-Website-Front_1024x1024.png'},

         {name: 'Franklin', sku: 'BE1', description: {Warranty: 'Lifetime',
         Lens: 'Amber Polarized',
         Hardware: '24K Gold Plated',
         Frame: 'Handcrafted, Acetate Frames',
         Protection: '100% UVA / UVB protection + AR Coating',
         Prescription: 'Ready',
         Size: '49-21-145',
         Case: 'Premium Hard Case',
         Extras: 'Microfiber Cleaning Cloth'}, price: 200.00, quantity: 50, image:'/images/products/Franklin-Champagne24K-Front-Website_large.png'},

         {name: 'Breton', sku: 'DEB1', description: {Warranty: 'Lifetime',
         Lens: 'Green',
         Hardware: '24K Gold Plated',
         Frame: 'Handcrafted, Acetate Frames',
         Protection: '100% UVA / UVB protection + AR Coating',
         Prescription: 'Ready',
         Size: '53-22-145',
         Case: 'Premium Hard Case',
         Extras: 'Microfiber Cleaning Cloth'}
        , price: 100.00, quantity: 10, image:'/images/products/Breton-Black-Website-Front_large.png'},

        {name: 'Conti', sku: 'CB1', description: {Warranty: 'Lifetime',
        Lens: 'Green Polarized',
        Hardware: '24K Gold Plated',
        Frame: 'Handcrafted, Acetate Frames',
        Protection: '100% UVA / UVB protection + AR Coating',
        Prescription: 'Ready',
        Size: '46-24-142',
        Case: 'Premium Hard Case',
        Extras: 'Microfiber Cleaning Cloth'}
        , price: 270.00, quantity: 15, image:'/images/products/KREWE-Conti-Zulu-Sunglasses-Front_large.jpg'}
      ],
      categoryData: [
          {name: 'Regular User'},
          {name: 'Influencer'},
          {name: 'Brand Account'},
          {name: 'Director'},
          {name: 'Admin'}
      ],
      orderData: [
        {total: 10, user_id: 1, shipping_address_id: 1, billing_address_id: 1},
        {total: 20, user_id: 2, shipping_address_id: 2, billing_address_id: 2},
        {total: 30, user_id: 3, shipping_address_id: 3, billing_address_id: 3},
        {total: 40, user_id: 4, shipping_address_id: 4, billing_address_id: 1},
        {total: 50, user_id: 5, shipping_address_id: 4, billing_address_id: 2}
      ],
      productCategoryData: [
        {product_id: 1, category_id: 1},
        {product_id: 1, category_id: 3},
        {product_id: 1, category_id: 4},
        {product_id: 2, category_id: 2},
        {product_id: 3, category_id: 2},
        {product_id: 4, category_id: 2},
        {product_id: 4, category_id: 3},
        {product_id: 4, category_id: 4},
        {product_id: 5, category_id: 1},
        {product_id: 5, category_id: 4},
        {product_id: 6, category_id: 2}
      ],
      productReviewData: [
        {title: 'It was great! ', body: 'The pork belly is luscious, delicious, and melts in your mouth.... For the price and easy accessibility, it was great! ', stars: '5', product_id: 2, influencer_id: 2, image1: '/images/products/0.png'},
        {title: 'Tried: Hakata DX ', body: 'Their bone broth is thick, rich, unctuous, and bursting with flavor It is not white like the stuff I had in Tokyo before but more orange...', stars: '4', product_id: 4, influencer_id: 4, image1: '/images/products/1.png'},
        {title: 'One of the best ramen I have ever had! ', body: 'Tips: Get there 15 minutes before opening on weekends or if it fills up sign the waiting list on the door.', stars: '1', product_id: 3, influencer_id: 1, image1: '/images/products/2.png'},
        {title: 'GREAT RAMEN', body: 'Amazing! TIP: If you like your egg soft boiled, take out the egg as soon as you can.. Mines was fully cooked when I remembered I had an egg', stars: '5', product_id: 5, influencer_id: 3, image1: '/images/products/3.png'},
        {title: 'Pretty damn good!', body: 'This is my second visit to Marafuku. I thought about the ramen for months after visiting 2 months prior.', stars: '5', product_id: 2, influencer_id: 2, image1: '/images/products/4.png'},
        {title: 'This place has AMAZING ramen.', body: 'Expect long lines, 1hr or more.  But also expect awesome food.  4.5stars.  Even if you have a large party ', stars: '4', product_id: 4, influencer_id: 4, image1: '/images/products/5.png'},
        {title: 'The pork belly is luscious', body: 'I will definitely come back to try some of the other stuff.  I will come before I get hungry', stars: '1', product_id: 3, influencer_id: 1, image1: '/images/products/16.png'},
        {title: 'Marufuku ramen was awesome.', body: 'Amazing! something somethingsomethingsomething something something something something something ', stars: '5', product_id: 5, influencer_id: 3, image1: '/images/products/7.png'},
        {title: 'RAMEN WAS AWESOME!!!!!!!', body: 'super dope product!!! something something something', stars: '5', product_id: 2, influencer_id: 2, image1: '/images/products/8.png'},
        {title: 'Id recommend going there', body: 'Beautiful Ring!! something something somethingsomething something ', stars: '4', product_id: 4, influencer_id: 4, image1: '/images/products/9.png'},
        {title: 'Service was good. ', body: 'aweful worst product ever something something somethingsomething', stars: '1', product_id: 3, influencer_id: 1, image1: '/images/products/10.png'},
        {title: 'Very popular grub in Japantown', body: 'Amazing! something somethingsomethingsomething something something something something something ', stars: '5', product_id: 5, influencer_id: 3, image1: '/images/products/11.png'},
        {title: 'Service: polite and fast.', body: 'super dope product!!! something something something', stars: '5', product_id: 2, influencer_id: 2, image1: '/images/products/12.png'},
        {title: 'Would definitely recommend this place', body: 'Beautiful Ring!! something something somethingsomething something ', stars: '4', product_id: 4, influencer_id: 4, image1: '/images/products/13.png'},
        {title: 'Possibly the best ramen I ve ever had.', body: 'aweful worst product ever something something somethingsomething', stars: '1', product_id: 3, influencer_id: 1, image1: '/images/products/14.png'},
        {title: 'Some of the best Paitan Ramen I have ever had!!', body: 'Amazing! something somethingsomethingsomething something something something ', stars: '5', product_id: 5, influencer_id: 3, image1: '/images/products/15.png'},
      ],
      addressData: [
        {address1: '150 main street', city: 'Buffalo', state: 'NY', country: 'USA', zipcode: '12345', user_id: 1},
        {address1: '150 main street', address2: '45 grove lane', city: 'Pittsburgh', state: 'PA', country: 'USA', zipcode: '12345', user_id: 2},
        {address1: '10 Hello World ave.', city: 'Los Angeles', state: 'CA', country: 'USA', zipcode: '12345', user_id: 3},
        {address1: '7 My Street Is Cool', city: 'Wayne', state: 'NJ', country: 'USA', zipcode: '12345', user_id: 4},
      ],
      orderProductData: [
        { order_id: 1, product_id: 1, quantity: 10, line_total: 10 * 300.00 },
        { order_id: 1, product_id: 2, quantity: 3, line_total: 3 * 350.00 },
        { order_id: 1, product_id: 3, quantity: 1, line_total: 1 * 280.00 },
        { order_id: 1, product_id: 4, quantity: 2, line_total: 2 * 200 },
        { order_id: 1, product_id: 5, quantity: 1, line_total: 1 * 100.00 }
      ],
      campaignData: [
        {camptitle: 'Campaign11', campdetails: 'new feautures of our product are so good and how you like it', campstarttime:'2017-12-01 00:00:00' , campendtime:'2017-12-14 23:59:59' , campzipcode: '10001', campcreater: 'brand1', numinfluencers: 1, campbudget: 1000.00, payment_currency: 'usd', brand_id: 1},
        {camptitle: 'Campaign12', campdetails: 'new feautures of our service are so good and how you like it', campstarttime:'2017-12-15 00:00:00' , campendtime:'2017-12-31 23:59:59' , campzipcode: '10001', campcreater: 'brand1', numinfluencers: 2, campbudget: 2000.00, payment_currency: 'usd', brand_id: 1},
        {camptitle: 'Campaign21', campdetails: 'new feautures of our service are so good and how you like it', campstarttime:'2017-12-01 00:00:00' , campendtime:'2017-12-31 23:59:59' , campzipcode: '10001', campcreater: 'brand2', numinfluencers: 3, campbudget: 3000.00, payment_currency: 'usd', brand_id: 2},
        {camptitle: 'Campaign31', campdetails: 'new feautures of our service are so good and how you like it', campstarttime:'2018-01-01 00:00:00' , campendtime:'2018-01-31 23:59:59' , campzipcode: '10001', campcreater: 'brand3', numinfluencers: 5, campbudget: 5000.00, payment_currency: 'usd', brand_id: 3},
        {camptitle: 'Campaign32', campdetails: 'new feautures of our service are so good and how you like it', campstarttime:'2018-02-01 00:00:00' , campendtime:'2018-02-28 23:59:59' , campzipcode: '10001', campcreater: 'brand3', numinfluencers: 8, campbudget: 8000.00, payment_currency: 'usd', brand_id: 3},
      ],
      hireInfluencerData: [
        { hirestage: 0, payment_amount: 1000, campaign_id: 1, influencer_id: 1, brand_id: 1 },
        { hirestage: 0, payment_amount: 1000, campaign_id: 2, influencer_id: 1, brand_id: 1 },
        { hirestage: 0, payment_amount: 1000, campaign_id: 2, influencer_id: 2, brand_id: 1 },
        { hirestage: 0, payment_amount: 1000, campaign_id: 3, influencer_id: 3, brand_id: 2 },
        { hirestage: 0, payment_amount: 1000, campaign_id: 3, influencer_id: 4, brand_id: 2 },
        { hirestage: 0, payment_amount: 1000, campaign_id: 3, influencer_id: 5, brand_id: 2  },
      ],

    }



    const seedCartLineItem = () => db.Promise.map([
      { quantity: 3, product_id: 1, user_id: 1 }
    ], cartLineItem => db.model('cart_line_item').create(cartLineItem));

    const seedProductCategories = () => db.Promise.map([
      {product_id: 1, category_id: 1},
      {product_id: 1, category_id: 3},
      {product_id: 1, category_id: 4},
      {product_id: 1, category_id: 5},
      {product_id: 2, category_id: 2},
      {product_id: 3, category_id: 2},
      {product_id: 3, category_id: 3},
      {product_id: 3, category_id: 4},
      {product_id: 4, category_id: 1},
      {product_id: 4, category_id: 2},
      {product_id: 4, category_id: 5},
      {product_id: 5, category_id: 1},
      {product_id: 5, category_id: 2},
      {product_id: 5, category_id: 5},
      {product_id: 6, category_id: 2}
    ], productCategory => db.model('product_category').create(productCategory));


    db.didSync
      .then(() => db.sync({force: true}))
      .then(()=>Product.bulkCreate(data.productData))
      .then(()=>User.bulkCreate(data.userData))
      .then(()=>Influencer.bulkCreate(data.influencerData))
      .then(()=>Brand.bulkCreate(data.brandData))
      .then(()=>Category.bulkCreate(data.categoryData))
      .then(()=>Address.bulkCreate(data.addressData))
      .then(()=>Order.bulkCreate(data.orderData))
      .then(()=>OrderProduct.bulkCreate(data.orderProductData))
      .then(()=>Product_Review.bulkCreate(data.productReviewData))
      .then(()=>Campaign.bulkCreate(data.campaignData))
      .then(()=>HireInfluencer.bulkCreate(data.hireInfluencerData))
      .then(seedProductCategories)
      .then(productCategories => console.log(`Seeded ${productCategories.length} productCategory OK`))
      .then(seedCartLineItem)
      .then(cartLineItems => console.log(`Seeded ${cartLineItems.length} cartLineItems OK`))

      // .then(()=>db.model('product_category').create(data.productCategoryData))

      // .then(users => console.log(`Seeded ${users.length} users OK`))
      // //.then(seedProducts)
      // //.then(products => console.log(`Seeded ${products.length} products OK`))
      // .then(seedCategories)
      // .then(categories => console.log(`Seeded ${categories.length} categories OK`))
      // .then(seedProductCategories)
      // .then(productCategories => console.log(`Seeded ${productCategories.length} productCategory OK`))
      // .then(seedProductReviews)
      // .then(reviews => console.log(`Seeded ${reviews.length} reviews OK`))
      // .then(seedAddresses)
      // .then(addresses => console.log(`Seeded ${addresses.length} addresses OK`))
      // .then(seedOrders)
      // .then(orders => console.log(`Seeded ${orders.length} orders OK`))
      .catch(error => console.error(error))
      .finally(() => db.close());


//User.bulkCreate(data.userData)
// .then(res=>Product.bulkCreate(data.productData))
// .then(res=>Category.bulkCreate(data.categoryData))

// .then(res=>Order.bulkCreate(data.orderData))
// .then(res=>OrderProduct.bulkCreate(data.orderProductData))
//
// .then(res=>Address.bulkCreate(data.addressData))

//
// User.bulkCreate(data.userData)
// .then(res=>Address.bulkCreate(data.addressData))
// .then(res=>Order.bulkCreate(data.orderData))
// .then(res=>Product.bulkCreate(data.productData))
// .then(res=>OrderProduct.bulkCreate(data.orderProductData))

// const seedUsers = () => db.Promise.map([
//  {name: 'so may', email: 'god@example.com', password: '1234'},
//  {name: 'Barack Obama', email: 'barack@example.gov', password: '1234'},
//  {name: 'Lida Cannon', email: 'kalo@sokum.com', password: '1234'},
//  {name: 'Chase Mitchell', email: 'apoinpe@bij.io', password: '1234'},
//  {name: 'Gertrude Morgan', email: 'ekisutjul@ahtove.com', password: '1234'},
//  {name: 'Josie Vargas', email: 'zuav@om.gov', password: '1234'},
//  {name: 'Julian Soto', email: 'uzoho@hu.gov', password: '1234'},
//  {name: 'Vincent Cohen', email: 'wu@tonin.edu', password: '1234'},
//  {name: 'Tillie Higgins', email: 'acubizfew@pesohu.org', password: '1234'},
//  {name: 'Frank Russell', email: 'seja@licgolul.org', password: '1234'},
//  {name: 'Franklin Bishop', email: 'ogijeaja@veifus.com', password: '1234'},
//  {name: 'Iva Carson', email: 'nikok@ejrib.gov', password: '1234'}
// ], user => db.model('users').create(user));

// const seedOrders = () => db.Promise.map([
//   {total: 10, user_id: 1, shipping_address_id: 1, billing_address_id: 1},
//   {total: 20, user_id: 2, shipping_address_id: 2, billing_address_id: 2},
//   {total: 30, user_id: 3, shipping_address_id: 3, billing_address_id: 3},
//   {total: 40, user_id: 4, shipping_address_id: 4, billing_address_id: 1},
//   {total: 50, user_id: 5, shipping_address_id: 4, billing_address_id: 2}
// ], order => db.model('order').create(order));


// {Warranty: 'Lifetime',
// Lens: 'Seafoam Mirrored Lens - Mirrored Lens Care',
// Frame: 'Handcrafted, Acetate Frames',
// Protection: '100% UVA / UVB protection',
// Prescription: 'Yes',
// Size: '46-23-145',
// Case: 'Premium Hard Case',
// Extras: 'Microfiber Cleaning Cloth'}

// {Warranty: 'Lifetime',
// Lens: 'Green',
// Hardware: '24K Gold Plated',
// Frame: 'Handcrafted, Acetate Frames',
// Protection: '100% UVA / UVB protection + AR Coating',
// Prescription: 'Ready',
// Size: '53-22-145',
// Case: 'Premium Hard Case',
// Extras: 'Microfiber Cleaning Cloth'}


// const seedProducts = () => db.Promise.map([
//
//  {name: 'St Louis', sku: 'GR1', description: {Warranty: 'Lifetime',
//  Lens: 'Seafoam Mirrored Lens - Mirrored Lens Care',
//  Frame: 'Handcrafted, Acetate Frames',
//  Protection: '100% UVA / UVB protection',
//  Prescription: 'Ready',
//  Size: '46-23-145',
//  Case: 'Premium Hard Case',
//  Extras: 'Microfiber Cleaning Cloth'}, price: 299.99, quantity: 10, image:'/images/products/StLouis-MatteBlack-Website-Front_large.png'},
//
//  {name: 'CBD', sku: 'GDN1', description: {Warranty: 'Lifetime',
//  Lens: 'Grey',
//  Hardware: '24K Gold Plated Hardware',
//  Frame: 'Handcrafted, Acetate Frames',
//  Protection: '100% UVA / UVB protection + AR Coating',
//  Prescription: 'Ready',
//  Size: '53-22-145',
//  Case: 'Premium Hard Case',
//  Extras: 'Microfiber Cleaning Cloth'}
//  , price: 349.99, quantity: 20, image:'/images/products/CL-10-OysterBlack-Front_285a8f7d-6c3a-4981-a556-942442bfffe6_large.png'},
//
//  {name: 'Orleans', sku: 'DSD1', description: {Warranty: 'Lifetime',
//  Lens: 'Rose Mirrored',
//  Hardware: 'Rose Gold Plated Titanium',
//  Frame: 'Handcrafted, Acetate Frames',
//  Protection: '100% UVA / UVB protection + AR Coating',
//  Prescription: 'Ready',
//  Size: '48-22-145',
//  Case: 'Premium Hard Case',
//  Extras: 'Microfiber Cleaning Cloth'}
// , price: 279.99, quantity: 50, image:'/images/products/Orleans-24KTitaniumCarnevale-Website-Front_1024x1024.png'},
//
//  {name: 'Franklin', sku: 'BE1', description: {Warranty: 'Lifetime',
//  Lens: 'Amber Polarized',
//  Hardware: '24K Gold Plated',
//  Frame: 'Handcrafted, Acetate Frames',
//  Protection: '100% UVA / UVB protection + AR Coating',
//  Prescription: 'Ready',
//  Size: '49-21-145',
//  Case: 'Premium Hard Case',
//  Extras: 'Microfiber Cleaning Cloth'}, price: 200.00, quantity: 50, image:'/images/products/Franklin-Champagne24K-Front-Website_large.png'},
//
//  {name: 'Breton', sku: 'DEB1', description: {Warranty: 'Lifetime',
//  Lens: 'Green',
//  Hardware: '24K Gold Plated',
//  Frame: 'Handcrafted, Acetate Frames',
//  Protection: '100% UVA / UVB protection + AR Coating',
//  Prescription: 'Ready',
//  Size: '53-22-145',
//  Case: 'Premium Hard Case',
//  Extras: 'Microfiber Cleaning Cloth'}
// , price: 99.99, quantity: 10, image:'/images/products/Breton-Black-Website-Front_large.png'},
//
// {name: 'Conti', sku: 'CB1', description: {Warranty: 'Lifetime',
// Lens: 'Green Polarized',
// Hardware: '24K Gold Plated',
// Frame: 'Handcrafted, Acetate Frames',
// Protection: '100% UVA / UVB protection + AR Coating',
// Prescription: 'Ready',
// Size: '46-24-142',
// Case: 'Premium Hard Case',
// Extras: 'Microfiber Cleaning Cloth'}
// , price: 270.00, quantity: 15, image:'/images/products/KREWE-Conti-Zulu-Sunglasses-Front_large.jpg'}
//
// ], product => db.model('product').create(product));

// const seedCategories = () => db.Promise.map([
//     {name: 'Mens'},
//     {name: 'Womens'},
//     {name: 'Mirrored'},
//     {name: 'Gold Hardware'}
// ], category => db.model('category').create(category));

// const seedProductCategories = () => db.Promise.map([
//   {product_id: 1, category_id: 1},
//   {product_id: 1, category_id: 3},
//   {product_id: 1, category_id: 4},
//   {product_id: 2, category_id: 2},
//   {product_id: 3, category_id: 2},
//   {product_id: 4, category_id: 2},
//   {product_id: 4, category_id: 3},
//   {product_id: 4, category_id: 4},
//   {product_id: 5, category_id: 1},
//   {product_id: 5, category_id: 4},
//   {product_id: 6, category_id: 2}
// ], productCategory => db.model('product_category').create(productCategory));

// const seedProductReviews = () => db.Promise.map([
//   {title: 'This product is awesome', body: 'super dope product!!! something something something', stars: '5', product_id: 2, user_id: 2},
//   {title: 'This product is awesome', body: 'Beautiful Ring!! something something somethingsomething something ', stars: '4', product_id: 4, user_id: 4},
//   {title: 'This product is awesome', body: 'aweful worst product ever something something somethingsomething', stars: '1', product_id: 3, user_id: 12},
//   {title: 'This product is awesome', body: 'Amazing! something somethingsomethingsomething something something something something something ', stars: '5', product_id: 5, user_id: 8}
// ], reviews => db.model('product_review').create(reviews));
//
// const seedAddresses = () => db.Promise.map([
//   {address1: '150 main street', city: 'Buffalo', state: 'NY', country: 'USA', zipcode: '12345', user_id: 1},
//   {address1: '150 main street', address2: '45 grove lane', city: 'Pittsburgh', state: 'PA', country: 'USA', zipcode: '12345', user_id: 2},
//   {address1: '10 Hello World ave.', city: 'Los Angeles', state: 'CA', country: 'USA', zipcode: '12345', user_id: 3},
//   {address1: '7 My Street Is Cool', city: 'Wayne', state: 'NJ', country: 'USA', zipcode: '12345', user_id: 4},
// ], addresses => db.model('address').create(addresses));

// db.didSync
//   .then(() => db.sync({force: true}))
//   .then(seedUsers)
//   .then(users => console.log(`Seeded ${users.length} users OK`))
//   //.then(seedProducts)
//   //.then(products => console.log(`Seeded ${products.length} products OK`))
//   .then(seedCategories)
//   .then(categories => console.log(`Seeded ${categories.length} categories OK`))
//   .then(seedProductCategories)
//   .then(productCategories => console.log(`Seeded ${productCategories.length} productCategory OK`))
//   .then(seedProductReviews)
//   .then(reviews => console.log(`Seeded ${reviews.length} reviews OK`))
//   .then(seedAddresses)
//   .then(addresses => console.log(`Seeded ${addresses.length} addresses OK`))
//   .then(seedOrders)
//   .then(orders => console.log(`Seeded ${orders.length} orders OK`))
//   .catch(error => console.error(error))
//   .finally(() => db.close());
