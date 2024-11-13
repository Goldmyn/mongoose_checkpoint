import mongoose from "mongoose";
import "dotenv/config";

const app = express();
const port = 3000;

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    createUser();
  } catch (error) {
    console.log(error);
  }
}

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  favoriteFoods: {
    type: [String],
  },
});

const Person = mongoose.model("Person", personSchema);

async function createUser() {
  const newPerson = await Person.create({
    name: "Mandy Kugo",
    age: 30,
    favoriteFoods: ["Pizza", "Burger"],
  });
}

async function manyUser(arrayOfPeople) {
  arrayOfPeople = await Person.create([
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
  ]);
}

//Create a function to find person

async function findPerson() {
    
}
// Listen on port 3000
app.listen(port, () => {
  console.log("Connected to port:3000");
});
