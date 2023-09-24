const Post = require('../models/post');

module.exports.home = async function (req, res) {
    try {
        const posts = await Post.find({}).populate('user').exec();
console.log(posts);
        return res.render('home', {
            title: "codeial | home",
            posts: posts
        });
    } catch (err) {
        console.error("Error in fetching posts:", err);
        return res.status(500).send("Internal Server Error");
    }
}
