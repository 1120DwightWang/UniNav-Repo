const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6363e2a7af0e2079432d0097',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry:{ "coordinates": [cities[random1000].longitude,cities[random1000].latitude], "type": "Point" },
            images: [
            {
                url: 'https://res.cloudinary.com/dtrhmdapa/image/upload/v1667724369/YelpCamp/goavh6yf4ul9zlujneip.jpg',
                filename: 'YelpCamp/goavh6yf4ul9zlujneip'
            },
            {
                url: 'https://res.cloudinary.com/dtrhmdapa/image/upload/v1667724368/YelpCamp/zex1cshg8qqz9oodxkr8.jpg',
                filename: 'YelpCamp/zex1cshg8qqz9oodxkr8'
            }
        ]
        })
    await camp.save();
}
}

seedDB().then(() => {
    mongoose.connection.close();
})