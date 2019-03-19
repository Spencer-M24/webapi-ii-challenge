// import moduels locations etc
// express and json data 
// router js connection file 

// Stretch Problems
// To work on the stretch problems you'll need to enable the cors middleware. Follow these steps:

// add the cors npm module: yarn add cors or npm i cors.
// add server.use(cors()) after server.use(express.json()).



const express=require("express");

const cors = require("cors")

const server=express();

const PostRouter=require("./router.js")

server.use(express.json());

server.use(cors())

server.use("/api/posts",PostRouter)



module.exports = server;