// const Comment = require('../models/comments');

// const Post = require('../models/post');

// module.exports.create = function (req, res){
//     Post.findById(req.body.post , function(err, post){
//         if(post){
//             Comment.create({
//                 content: req.body.content,
//                 post: req.body.post,
//                 user: req.user._id
//             }, function (err, comment){
//                 post.comment.push(comment);
//                 post.save();

//                 res.redirect('/')
//             })
//         }
//     })
// }

const Comment = require('../models/comments');
const Post = require('../models/post');

module.exports.create = async function (req, res) {
    try {
        const post = await Post.findById(req.body.post);

        if (post) {
            const comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comment.push(comment);
            await post.save();

            res.redirect('/');
        } else {
            // Handle the case where the post is not found
            res.status(404).send('Post not found');
        }
    } catch (err) {
        // Handle any errors that occurred during the process
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};
