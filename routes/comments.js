/**
 * Created by scmhzl on 2017/1/7.
 */
var express = require('express');
var router = express.Router();
var PostModel = require('../models/posts');
var CommentModel = require('../models/comments');
var moment=require("moment");
var Promise=require("promise");

//添加评论
router.post("/addComment/:postId",function (req,res) {
    var postId = req.params.postId;
    var comment = {
       author:req.cookies.user._id,
       postId:postId,
       content:req.body.content
    }
    Promise.all([
          CommentModel.create(comment),//创建评论
          PostModel.getPostById(postId),// 获取文章信息
          CommentModel.getComments(postId)// 获取该文章所有留言
      ])
        .then(function (result) {
            console.log(1)
            var post = result[1];
            post.comments = result[2];
            console.log(post)
            res.send(JSON.stringify({state:200,message:"评论成功",data:[post]}))
        })
})

//删除评论
router.post("/delComment/:postId/:commentId/:authorId",function (req,res) {
    var commentId = req.params.commentId,
        postId = req.params.postId
    Promise.all([
        CommentModel.delCommentById(commentId,req.params.authorId),
        PostModel.getPostById(postId),
        CommentModel.getComments(postId)
    ])
        .then(function (result) {
            var post=result[1];
            post.comments=result[2];
            res.send(JSON.stringify({state:200, message: "删除评论成功", data: [post]}))
        })
        .catch(function () {
            res.send(JSON.stringify({state: 101, message: "网哥灰去火星咯，请刷新召回网哥"}))
        })
})




module.exports = router
