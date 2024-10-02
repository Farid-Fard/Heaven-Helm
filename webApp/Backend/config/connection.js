

// require("dotenv").config();
const mongoose = require("mongoose");
require("dotenv").config()
const uri = process.env.MONGODB_URI


async function main() {
    await mongoose.connect(uri);
};


main()
.then( ()=> console.log("DB connected successfully!") )
.catch( (error)=> console.log(error) );


module.exports = main;