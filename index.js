// Import necessary libraries
import mongoose from "mongoose"; // Mongoose is an ODM for MongoDB and Node.js
import "dotenv/config"; // dotenv is used to load environment variables from a .env file
import express from "express"; // Express is a web application framework for Node.js

// Initialize express app
const app = express();
const port = 3000; // Define the port for the server

// Function to connect to the MongoDB database
async function connectDB() {
  try {
    // Connect to the database using the connection URI stored in environment variables
    await mongoose.connect(
      process.env.MONGO_URI
      /* Uncomment the below options if needed for connection settings
      , {
        useNewUrlParser: true, // Use the new URL string parser
        useUnifiedTopology: true, // Use the new topology engine
      }*/
    );
    console.log("Connected to DB"); // Log success message

    // Example function calls (uncomment to use)
    // createUser();
    // manyUser();
    // findPeopleByName();
    // findOneByFavoriteFood();
    // findById();
    // findOneByIdAndUpdate();
    // findOnePersonAndUpdate();
    // findPersonByIdAndDelete();
  } catch (error) {
    console.log(error); // Log any connection errors
  }
}

// Define a schema for the Person collection
const personSchema = new mongoose.Schema({
  name: {
    type: String, // Name should be a string
    required: true, // Name field is required
  },
  age: {
    type: Number, // Age should be a number
  },
  favoriteFoods: {
    type: [String], // Favorite foods should be an array of strings
  },
});

// Create a model for the Person schema
const Person = mongoose.model("Person", personSchema);

// Function to create a single user record in the database
async function createUser() {
  try {
    const newPerson = await Person.create({
      name: "Mandy Kugo",
      age: 30,
      favoriteFoods: ["Pizza", "Burger"],
    });
    console.log(newPerson); // Log the created person object
  } catch (error) {
    console.log(error); // Log any errors that occur
  }
}

// Function to create multiple user records in the database
async function manyUser() {
  const arrayOfPeople = [
    {
      name: "John Bright",
      age: 32,
      favoriteFoods: ["Rice", "Beans"],
    },
    {
      name: "Edward Ben",
      age: 34,
      favoriteFoods: ["Yam", "Eggs"],
    },
    {
      name: "Sarah John",
      age: 39,
      favoriteFoods: ["Salad", "Beans"],
    },
    {
      name: "Nelson Mandy",
      age: 36,
      favoriteFoods: ["Noodles", "Apple"],
    },
  ];

  try {
    const people = await Person.create(arrayOfPeople); // Create multiple records in the database
    console.log(people); // Log the created people objects
  } catch (error) {
    console.error(error); // Log any errors
  }
}

// Function to find people by name from the database
async function findPeopleByName() {
  try {
    const people = await Person.find({ name: "Mandy Kugo" }); // Find people with the given name
    console.log(people); // Log the found people
  } catch (err) {
    console.error("Error finding people by name:", err); // Log any errors
  }
}

// Function to find one person by their favorite food
async function findOneByFavoriteFood() {
  try {
    const person = await Person.findOne({ favoriteFoods: "Apple" }); // Find a person by a specific favorite food
    console.log(person); // Log the found person
  } catch (err) {
    console.error(err); // Log any errors
  }
}

// Function to find a person by their ID
async function findById() {
  try {
    const person = await Person.findById({ _id: "6734f8294b3b7ed5f8174cea" }); // Find a person by their ID
    console.log("Found person by ID:", person); // Log the found person
  } catch (error) {
    console.error(error); // Log any errors
  }
}

// Function to find a person by their ID and update their favorite foods
async function findOneByIdAndUpdate() {
  try {
    const person = await Person.findById({ _id: "6734f8294b3b7ed5f8174ce8" }); // Find a person by their ID
    person.favoriteFoods.push("Hamburger"); // Add a new favorite food

    const updatedPerson = await person.save(); // Save the updated person object
    console.log("Update person by ID:", updatedPerson); // Log the updated person
  } catch (err) {
    console.error(err); // Log any errors
  }
}

// Function to Find and update by ID

async function findOnePersonAndUpdate() {
  try {
    const personName = await Person.findOneAndUpdate(
      { name: "Edward Ben" },
      { age: 20 },
      { new: true }
    );
    console.log(personName);
  } catch (error) {
    console.log(error);
  }
}

async function findPersonByIdAndDelete() {
  try {
    const deletedPerson = await Person.findByIdAndDelete({
      _id: "6734f8294b3b7ed5f8174cea",
    });
    console.log(deletedPerson);
  } catch (error) {
    console.log(error);
  }
}

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log("Connected to port:3000"); // Log the port the server is running on
  connectDB(); // Call the function to connect to the database
});
