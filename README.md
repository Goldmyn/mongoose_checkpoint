# mongoose_checkpoint

# Simple Express and MongoDB CRUD Application

This project is a simple Express.js application that demonstrates how to connect to a MongoDB database using Mongoose. It includes basic CRUD operations for managing a collection of "Person" records, where each record contains a name, age, and favorite foods.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [API Functions](#api-functions)
- [Environment Variables](#environment-variables)
- [License](#license)

## Prerequisites

- Node.js (>= 14.x)
- MongoDB (either local or a cloud instance like MongoDB Atlas)
- npm or yarn

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Goldmyn/mongoose_checkpoint
   cd mongoose_checkpoint
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory of your project and add your MongoDB URI:
   ```plaintext
   MONGO_URI=your_mongodb_uri_here
   ```

## Usage

1. Start the server:

   ```bash
   npm run start
   ```

   The server will start and listen on `http://localhost:3000`.

2. You can use the defined API functions to perform CRUD operations. You can uncomment the required function calls inside the `connectDB` function to execute them.

## Features

- Connection to MongoDB using Mongoose
- Define a "Person" schema with fields for name, age, and favorite foods
- Basic CRUD operations for creating, reading, updating, and deleting "Person" records

## API Functions

The following functions are available in the application:

- `createUser()`: Create a single user record in the database.
- `manyUser()`: Create multiple user records in the database.
- `findPeopleByName()`: Find people by their name.
- `findOneByFavoriteFood()`: Find one person by their favorite food.
- `findById()`: Find a person by their ID.
- `findOneByIdAndUpdate()`: Find a person by ID and update their favorite foods.
- `findOnePersonAndUpdate()`: Find a person by name and update their age.
- `findPersonByIdAndDelete()`: Find a person by ID and delete them.
- `deleteManyByName()`: Delete multiple people by name.
- `findPeopleWhoLikeBurritos()`: Find people who like burritos.

## Environment Variables

This application uses `dotenv` to manage environment variables. Ensure you have the following in your `.env` file:

```
MONGO_URI=<your_mongodb_connection_string>
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
