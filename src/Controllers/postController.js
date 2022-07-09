const Post = require('../Modeles/posts')

// function create user logged post
// i set automatically user logged id to post field : author

exports.create = (req,res,next) => {
    try {
        // verify request body
        if(!req.body.title || !req.body.message)
        {
            return res.status(400).json({
                message: 'Post title and message are required'
            })
        }
        // create post
        const new_post = new Post({
            title: req.body.title,
            message: req.body.message,
            author: req.body.author
        })
        new_post.save().then((post)=> {
            return  res.status(201).json({message:'Post create succefuly',post, succes:true,status:201})
        })
 
    } catch (error) {
        res.status(500).json({error})
    }

}

// get post by id
exports.getPost = (req,res,next) => {
    Post.findById(req.params.id).populate('author').then((post) => {
        if(!post) {
            return res.status(401).json({message : 'Post not found', status:401,succes:false})
        }
        return res.status(200).json({post, status:200,succes:true})
    })
}


// delete post by id
exports.deletePost = (req,res,next) => {
    Post.findByIdAndDelete(req.params.id).then((post) => {
        if(!post) {
            return res.status(401).json({message : 'Post not found', status:401,succes:false})
        }
        return res.status(200).json({message: `Post ${post._id} account delete`, status:200,succes:true})
    })
}

// update post by post id
exports.updatePost = (req,res,next) => {
    try {
        // verify request body
        if(!req.body.title || !req.body.message)
        {
            return res.status(400).json({
                message: 'Post title and message are required'
            })
        }
       
        // update post
        Post.findByIdAndUpdate(req.params.id,{
            title: req.body.title,
            message: req.body.message,
            author:req.body.author
        }, { new:true}).populate('author').then(post => {
            if(!post) 
            {
                return res.status(401).json({message :'Post not found',status:401,succes:false})
            }
            return res.status(200).json({message:'Post update succefuly',post, status:200, succes:true})
        })
    } catch (error) {
        res.status(500).json({error})
    }
}

// get all post create by user logged
exports.getPostsByUserLogged = (req,res, next) => {
    Post.findOne({author: req.params.id}).populate('author').then((posts) => {
       return res.json({message: 'All post created', posts})
    })
}

// get all posts
exports.getAllPosts = (req,res,next) => {
    Post.find({}).populate('author').then(posts=> {
        return res.json({posts})
    })
}



