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
      /* Uncomment the below options if needed for connection settings, I was getting errors so i turned it to a comment 
      , {
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
      }*/
    );
    console.log("Connected to DB"); // Log success message

    // All Database function calls (uncomment the needed to use)

    // createUser();
    // manyUser();
    // findPeopleByName();
    // findOneByFavoriteFood();
    // findById();
    // findOneByIdAndUpdate();
    // findOnePersonAndUpdate();
    // findPersonByIdAndDelete();
    // deleteManyByName();
    // findPeopleWhoLikeBurritos();
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
    {
      name: "Mary Crane",
      age: 33,
      favoriteFoods: ["Pizza", "Chicken"],
    },
    {
      name: "Linda Mary",
      age: 35,
      favoriteFoods: ["Sharwama", "Beef"],
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
    const people = await Person.find({ name: new RegExp("Mandy Kugo", "i") }); // Find people with the given name
    console.log(people); // Log the found people
  } catch (err) {
    console.error("Error finding people by name:", err); // Log any errors
  }
}

// Function to find one person by their favorite food
async function findOneByFavoriteFood() {
  try {
    const person = await Person.findOne({
      favoriteFoods: new RegExp("apple", "i"),
    }); // Find a person by a specific favorite food
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

// Function to find a person by name and update their age
async function findOnePersonAndUpdate() {
  try {
    // Use case-insensitive regex to find the person by name "Edward Ben"
    const personName = await Person.findOneAndUpdate(
      { name: new RegExp("Edward Ben", "i") }, // Find by name, case insensitive
      { age: 20 }, // Update the age to 20
      { new: true } // Return the updated document
    );

    // Log the updated person object
    console.log(personName);
  } catch (error) {
    // Log any errors that occur
    console.log(error);
  }
}

// Function to find a person by their ID and delete them
async function findPersonByIdAndDelete() {
  try {
    // Find the person by their ID and delete them from the database
    const deletedPerson = await Person.findByIdAndDelete({
      _id: "6734f8294b3b7ed5f8174cea", // Specify the ID of the person to delete
    });

    // Log the deleted person object
    console.log(deletedPerson);
  } catch (error) {
    // Log any errors that occur
    console.log(error);
  }
}

// Function to delete multiple people by name
async function deleteManyByName() {
  try {
    // Use case-insensitive regex to delete all persons with name "Mary"
    const toBeDeleted = await Person.deleteMany({
      name: new RegExp(/Mary/, "i"), // Specify the name pattern to match, case insensitive
    });

    // Log the result of the deletion operation
    console.log(toBeDeleted);
  } catch (error) {
    // Log any errors that occur
    console.log(error);
  }
}

async function findPeopleWhoLikeBurritos() {
  try {
    const results = await Person.find({
      favoriteFoods: new RegExp("burritos", "i"),
    }) // Find people who like burritos
      .sort({ name: 1 }) // Sort by name in ascending order
      .limit(2) // Limit the results to 2
      .select("-age"); // Only select the name field while excluding the age field

    console.log("People who like burritos:", results);
  } catch (error) {
    console.error("Error finding people who like burritos:", error); // Log any errors encountered
  }
}

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log("Connected to port:3000"); // Log the port the server is running on
  connectDB(); // Call the function to connect to the database
});
