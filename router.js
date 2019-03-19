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




router.delete('/:id',async(req,res)=>{
    
    try{
          const id=req.params.id;
          if(id){
            const result=await Db.remove(req.params.id);
            res.status(201).json(result); 
             
             
          }else{
            res.status(404).json({message: "The post with the specified ID does not exist." })
          }
    }     
    catch(error){
          res.status(500).json({error: "The post could not be removed"})
         
    }
  })
  
  module.exports=router;
  
  router.put('/:id',async(req,res)=>{
      try{
         const id =req.params.id;
         const post=req.body;
         if(id && post.title && post.contents){
           const result= await Db.update(id,post)
           res.status(201).json(result)
      
      
        } if(!id){
          res.status(404).json({message: "The post with the specified ID does not exist."})
         }
         else{
          res.status(400).json({errorMessage: "Please provide title and contents for the post."})  
         }
  
    
        }
      catch(error){
         res.status(500).json({ error: "The post information could not be modified." })
      }
  
  })
  
  router.get('/:id',async(req,res)=>{
       try{
          const id= req.params.id;
      
          if(id){
     
     
            const result=await Db.findById(id)
            res.status(200).json(result)}
        
        
        
            else{
            res.status(404).json({message: "The post with the specified ID does not exist."})}
        
  
       }
       catch{
          res.status(500).json({error: "The post information could not be retrieved." })
  
       }
  
  
  
  })