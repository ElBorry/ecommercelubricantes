import mongoose from 'mongoose';
import User from '../data/mongo/models/user.model.js'; // Updated path
import Products from '../data/mongo/models/products.model.js'; // Assuming similar path
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config(); // Ensure dotenv is installed and configured

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('Connected to MongoDB Atlas');
  importData();
}).catch(err => {
  console.error('Error connecting to MongoDB Atlas', err);
});

async function importData() {
  try {
    // Import Users
    const usersData = JSON.parse(fs.readFileSync('./src/data/fs/files/users.json', 'utf8'));
    await User.deleteMany({});
    await User.insertMany(usersData);
    console.log('Users imported successfully');

    // Import Products
    const productsData = JSON.parse(fs.readFileSync('./src/data/fs/files/products.json', 'utf8'));
    await Products.deleteMany({});
    await Products.insertMany(productsData);
    console.log('Products imported successfully');

    // Disconnect from MongoDB
    mongoose.disconnect();
  } catch (error) {
    console.error('Error during data import', error);
    mongoose.disconnect();
  }
}
