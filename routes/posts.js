const express = require('express');

const router = express.Router();
const Post = require('../models/posts')

//GET ALL POSTS
router.get("/", async(req, res)=>{
   try{
       console.log("Fetching posts");
        const posts = await Post.find();
        res.json(posts);
   }catch(err){
       res.json({message:err})
   }
})

//CREATE POST
router.post("/", async(req, res)=>{
    const post = new Post({
        streamingPartner : req.body.streamingPartner,
        movieName : req.body.movieName,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        language: req.body.language,
        dateReleased: req.body.dateReleased,
        starring: req.body.starring,
        director: req.body.director,
    });

    try{
    const savedPost = await post.save();
     res.json(savedPost);
    }catch(err){
        res.json({message: err})
    }
})

//SPECIFIC POST
router.get('/:postId', async(req, res)=>{
    try{
        const post = await Post.findById(req.params.postId);
        res.json(post);
    }catch(err){
        res.json({message: err})
    }
})

//DELETE POST
router.delete('/:postId', async(req, res)=>{
    try{
        const removedPost = await Post.deleteOne({_id:req.params.postId});
        res.json(removedPost);
    }catch(err){
        res.json({message: err})
    }
})

//UPDATE POST
router.patch('/:postId', async(req, res)=>{
    try{
        const updatedPost = await Post.updateOne(
            {_id:req.params.postId},
            { $set: {movieName: req.body.movieName}}
        );
        res.json(updatedPost);
    }catch(err){
        res.json({message: err})
    }
})



module.exports = router;