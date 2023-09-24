const Post = require('../models/post')


// module.exports.home = function(req, res){
//     // console.log(req.cookies);
//     // res.cookie('user_id', 25);


//      Post.find({}, function(err, posts){
//            return res.render('home', {
//         title: "Codeial | Home",
//         posts: posts
//     });
// })
 
// }
// module.exports.home = async function(req, res) {
//     try {
//         const posts = await Post.find({}).exec();

//         return res.render('home', {
//             title: "Codeial | Home",
//             posts: posts
//         });
//     } catch (err) {
//         console.error("Error in fetching posts:", err);
//         return res.status(500).send("Internal Server Error");
//     }
// }



module.exports.home = async function(req, res) {
    try {
        const posts = await Post.find({}).populate('user').exec();

        return res.render('home', {
            title: "codeial | home",
            posts: posts
        });
    } catch (err) {
        console.error("Error in fetching posts:", err);
        return res.status(500).send("Internal Server Error");
    }
}

// module.exports.actionName = function(req, res){}