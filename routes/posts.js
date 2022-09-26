const express = require('express');
const { json } = require('express/lib/response');

const router = express.Router();
const Post = require('../models/posts')


//GET ALL POSTS
router.get("/", async(req, res)=>{
   try{
        const posts = await Post.find().sort({ date_released : -1});
        res.json(posts);
   }catch(err){
       res.json({message:err})
   }
})

//GET ALL NEXT WEEK POSTS
router.get("/comingsoon", async(req, res)=>{
    try{
         const posts = await Post.find();
         let today = new Date();
         let Seventhday = nextweek();
         let newArray = []
         for(var i=0; i<posts.length; i++ ) {
             let postsDate = new Date(posts[i].date_released)
            if (postsDate > today && postsDate < Seventhday) {
                newArray.push(posts[i]);
              } else {
                console.log('⛔️ date is not in the range');
              }
         }
         res.json(newArray);
    }catch(err){
        res.json({message:err})
    }
 })

 //GET ALL COMING SOON POSTS
router.get("/nextweek", async(req, res)=>{
    try{
         const posts = await Post.find().sort({ date_released : -1});
         let today = new Date();
         let Seventhday = nextweek();
         let newArray = []
         for(var i=0; i<posts.length; i++ ) {
             let postsDate = new Date(posts[i].date_released)
            if (postsDate > today) {
                newArray.push(posts[i]);
              } else {
                console.log('⛔️ date is not in the range');
              }
         }
        res.json(newArray);
    }catch(err){
        console.log({message:err})
        res.status(500).json({error:true, message: "Internal Server Error"});
    }
 })

 //GET ALL PREVIOUS RELEASE POSTS
router.get("/previousreleases", async(req, res)=>{
    try{
         const posts = await Post.find().sort({ date_released : -1});
         let today = new Date();
         let Seventhday = nextweek();
         let newArray = []
         for(var i=0; i<posts.length; i++ ) {
             let postsDate = new Date(posts[i].date_released)
            if (postsDate < today) {
                newArray.push(posts[i]);
              } else {
                console.log('⛔️ date is not in the range');
              }
         }
        res.json(newArray);
    }catch(err){
        console.log({message:err})
        res.status(500).json({error:true, message: "Internal Server Error"});
    }
 })

  //GET ALL PREVIOUS RELEASE POSTS
router.get("/previousreleasess", async(req, res)=>{
    try{
        let genre = req.query.genre||"All";
        let sort = req.query.sort || "date_released";
        const genreOptions = ["Action","Drama","Fantasy","Sci-Fi","Adventure",
        "Thriller","Crime","Comedy","Family","Musical","Romance","Mystery","Humorous", "Suspense", "Biography"]
        genre === "All"
                ? (genre = [...genreOptions])
                : (genre = req.query.genre.split(","))
        req.query.sort? (sort = req.query.sort.split(",")) : (sort = [sort]);
        let sortBy = {};
        if(sort[1]){
            sortBy[sort[0]] = sort[1];
        }else{
            sortBy[sort[0]] = "-1";
        }

         const posts = await Post.find().where("genres")
                            .in([...genre])
                            .sort(sortBy)
         let today = new Date();
         let Seventhday = nextweek();
         let newArray = []
         for(var i=0; i<posts.length; i++ ) {
             let postsDate = new Date(posts[i].date_released)
            if (postsDate < today) {
                newArray.push(posts[i]);
              } else {
                console.log('⛔️ date is not in the range');
              }
         }
         const total =  await Post.countDocuments({
            genres:{$in:[...genre]},
        })
        const response =  {
            error: false,
            total,
            genres: genreOptions,
            newArray
        }
        res.status(200).json(response);
    }catch(err){
        console.log({message:err})
        res.status(500).json({error:true, message: "Internal Server Error"});
    }
 })

 //GET ALL COMING SOON POSTS
router.get("/nextweeks", async(req, res)=>{
    try{
        let genre = req.query.genre||"All";
        let sort = req.query.sort || "date_released";
        const genreOptions = ["Action","Drama","Fantasy","Sci-Fi","Adventure",
        "Thriller","Crime","Comedy","Family","Musical","Romance","Mystery","Humorous", "Suspense", "Biography"]
        genre === "All"
                ? (genre = [...genreOptions])
                : (genre = req.query.genre.split(","))
        req.query.sort? (sort = req.query.sort.split(",")) : (sort = [sort]);
        let sortBy = {};
        if(sort[1]){
            sortBy[sort[0]] = sort[1];
        }else{
            sortBy[sort[0]] = "-1";
        }

         const posts = await Post.find().where("genres")
                                        .in([...genre])
                                        .sort(sortBy)
         let today = new Date();
         let Seventhday = nextweek();
         let newArray = []
         for(var i=0; i<posts.length; i++ ) {
             let postsDate = new Date(posts[i].date_released)
            if (postsDate > today) {
                newArray.push(posts[i]);
              } else {
                console.log('⛔️ date is not in the range');
              }
         }
         const total =  await Post.countDocuments({
            genres:{$in:[...genre]},
        })
        const response =  {
            error: false,
            total,
            genres: genreOptions,
            newArray
        }
        res.status(200).json(response);
    }catch(err){
        console.log({message:err})
        res.status(500).json({error:true, message: "Internal Server Error"});
    }
 })

 //GET ALL PREVIOUS WEEK POSTS
router.get("/previousweek", async(req, res)=>{
    try{
         const posts = await Post.find();
         let today = new Date();
         let Seventhday = previousweek();
         console.log("Seventhday:"+Seventhday);
         let newArray = []
         for(var i=0; i<posts.length; i++ ) {
             let postsDate = new Date(posts[i].date_released)
            if (postsDate < today && postsDate > Seventhday) {
                newArray.push(posts[i]);
              } else {
                console.log('⛔️ date is not in the range');
              }
         }
         res.json(newArray);
    }catch(err){
        res.json({message:err})
    }
 })

  //GET ALL POSTS BY SEARCH CHARACTERS
//SPECIFIC POST
router.get('/search', async(req, res)=>{
    try{
        const search = req.query.movieName||"";
        let genre = req.query.genre||"All";
        let sort = req.query.sort || "date_released";
        const genreOptions = ["Action","Drama","Fantasy","Sci-Fi","Adventure",
        "Thriller","Crime","Comedy","Family","Musical","Romance","Mystery","Humorous", "Suspense", "Biography"]
        genre === "All"
                ? (genre = [...genreOptions])
                : (genre = req.query.genre.split(","))
        req.query.sort? (sort = req.query.sort.split(",")) : (sort = [sort]);
        let sortBy = {};
        if(sort[1]){
            sortBy[sort[0]] = sort[1];
        }else{
            sortBy[sort[0]] = "-1";
        }
        const posts = await Post.find({movie_name:{$regex:search, $options:"i"}})
                        .where("genres")
                        .in([...genre])
                        .sort(sortBy)
        
        const total =  await Post.countDocuments({
            genres:{$in:[...genre]},
            movie_name: {$regex:search, $options:"i"},
        })
        const response =  {
            error: false,
            total,
            genres: genreOptions,
            posts
        }
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:true, message: "Internal Server Error"});
    }
})

//CREATE POST
router.post("/", async(req, res)=>{
    const post = new Post({
        streaming_partner : req.body.streaming_partner,
        movie_name : req.body.movie_name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        language: req.body.language,
        date_released: req.body.date_released,
        display_date: req.body.display_date,
        starring: req.body.starring,
        director: req.body.director,
        vote_count: req.body.vote_count,
        vote_average: req.body.vote_average,
        genres: req.body.genres,
        video_url: req.body.video_url
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

nextweek = () => {
    var today = new Date();
    var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7);
    return nextweek;
}

previousweek = () => {
    var today = new Date();
    var previousweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()-7);
    return previousweek;
}


module.exports = router;