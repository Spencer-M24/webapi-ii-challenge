const express = require ('express');

const db = require('./data/db.js');

const server = express ();


server.use(express.json());



server.get('/api/posts',  (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            res.status(500).res.json({ error: 'The posts information could not be retrieved'})
        })
})


server.get('/api/posts/:id',  (req, res) => {
    const id = req.params.id;



    db.findById(id)
    .then(post => {
        if(post.length) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'The post with the specified ID does not exist.' })
        }
    })
    .catch(err => {
        res.status(500).json({ error: 'The post information could not be retrieved'})
    })
});

server.post('/api/posts',  (req, res) => {
const postInfo = req.body;