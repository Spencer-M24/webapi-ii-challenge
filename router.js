// moduels

const express = require("express");
const router = express.Router();
const Db = require("./data/db.js");

// Get reqiest reponse

router.get("/", async (req, res) => {
    try {
        const posts = await Db.find(req.query);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving the posts"
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const post = req.body;
        if (post.title && post.contents) {
            const result = await Db.insert(post);
            res.status(201).json(result);
    
    
        } else {
            res.status(400).json({
                errorMessage: "Please provide title and contents for the post."
            });
        }
   
   
   
    } catch (error) {
        res.status(500).json({
            error: "There was an error while saving the post to the database"
        });
    }
});
