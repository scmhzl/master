/**
 * Created by scmhzl on 2017/1/7.
 */
var express = require('express');
var router = express.Router();
var PostModel = require('../models/posts');
var CommentModel = require('../models/comments');
var moment=require("moment");
var Promise=require("promise");


// POST /posts 发表一篇文章
router.post('/writeArticle', function(req, res) {
    var author = req.cookies.user._id,
        title = req.body.title,
        content = req.body.content
    var postData = {
        title:title,
        content:content,
        author:author,
        pv:0,//浏览量
        like:[],//喜欢
        upDataTime:moment().format("YYYY-MM-DD HH:mm")
    }
    PostModel.create(postData)
        .then(function (result) {
            res.send(JSON.stringify({state:100,message:"发表成功"}))
        })
        .catch(function () {
            res.send(JSON.stringify({state:101,message:"网哥灰去火星咯，请刷新召回网哥"}))
        })
});

//获取所有用户或是特定用户文章页面
router.get('/getAllArticle', function(req, res) {
    // var author = req.cookies.user ? req.cookies.user._id : "";
    PostModel.getPosts()
        .then(function (posts) {
            res.send(JSON.stringify({state:100,message:"获取成功",data:posts}))
        })
        .catch(function () {
            res.send(JSON.stringify({state:101,message:"网哥灰去火星咯，请刷新召回网哥"}))
        })
})

//单独获取一篇文章
router.get('/getOneArticle/:postId', function(req, res) {
    var postId = req.params.postId;
    Promise.all([
        PostModel.getPostById(postId),// 获取文章信息
        CommentModel.getComments(postId),// 获取该文章所有留言
        PostModel.incPv(postId)// pv 加 1
    ])
        .then(function (result) {
            var post = result[0];
            post.comments = result[1];
            res.send(JSON.stringify({state:200,message:"获取成功",data:[post]}))

        })
        .catch(function () {
            res.send(JSON.stringify({state:101,message:"网哥灰去火星咯，请刷新召回网哥"}))
        });
})

//删除一篇文章
router.post('/delArticle/:postId', function(req, res) {
    var postId = req.params.postId;
    var author = req.cookies.user._id;
    Promise.all([
        PostModel.delPostById(author,postId),//删除对应文章
        PostModel.getPosts()//获取全部文章
    ])
        .then(function (result) {
           res.send(JSON.stringify({state:100,message:"获取成功",data:result[1]}))
        })
        .catch(function () {
            res.send(JSON.stringify({state:101,message:"网哥灰去火星咯，请刷新召回网哥"}))
        });
})

//喜欢
//isOnly 点赞前是否跳转到评论页面  1跳转 0没有跳转
router.post("/like/:postId/:isOnly",function (req,res) {
    var postId = req.params.postId;
    var name = req.cookies.user._id;
   PostModel.getPostById(postId)
       .then(function (result) {
           var len = result.like.length,
               bool = true;
           for(var i=0;i<len ;i++){
               if(result.like[i] === name){
                   result.like.splice(i,1)
                   bool = false;
               }
           }
           if(bool){
               result.like.push(name)
           }
           var author = result.author._id
            result.author = author//后台对author类型的要求，所以要转化
           PostModel.updatePostById(postId,author,result)
               .then(function () {
                   if(req.params.isOnly === "0"){
                       PostModel.getPosts()
                           .then(function (posts) {
                               res.send(JSON.stringify({state: 300, message: bool ? "点赞成功" : "已取消点赞", data: posts}))
                           })
                           .catch(function () {
                               res.send(JSON.stringify({state: 101, message: "网哥灰去火星咯，请刷新召回网哥"}))
                           })
                   }else{
                       Promise.all([
                           PostModel.getPostById(postId),
                           CommentModel.getComments(postId),
                       ])
                           .then(function(result){
                               var post=result[0];
                               post.comments=result[1];
                               res.send(JSON.stringify({state: 300, message: bool ? "点赞成功" : "已取消点赞", data: [post]}))
                           })
                   }

               })
               .catch(function () {
                   res.send(JSON.stringify({state: 101, message: "网哥灰去火星咯，请刷新召回网哥"}))
               })
       })
       .catch(function () {
           res.send(JSON.stringify({state:101,message:"网哥灰去火星咯，请刷新召回网哥"}))
       })
})

//获取一篇原始文章  做修改用
router.get("/getRawArticle/:postId",function (req,res) {
    var postId = req.params.postId;
    if(postId !== "write"){
        PostModel.getRawPostById(postId)
            .then(function (result) {
                res.send(JSON.stringify({state:100,message:"获取成功",data:[result]}))
            })
            .catch(function () {
                res.send(JSON.stringify({state:101,message:"网哥灰去火星咯，请刷新召回网哥"}))
            });
    }
})

//更新一篇文章
router.post("/upDataArticle/:postId",function (req,res) {
    var postId = req.params.postId,
        title = req.body.title,
        content = req.body.content,
        author = req.cookies.user._id;
    var post = {
        title:title,
        content:content,
        upDataTime:moment().format("YYYY-MM-DD HH:mm")
    }
    PostModel.updatePostById(postId,author,post)
        .then(function (result) {
            res.send(JSON.stringify({state:100,message:"获取成功",data:""}))
        })
        .catch(function () {
            res.send(JSON.stringify({state:101,message:"网哥灰去火星咯，请刷新召回网哥"}))
        })
})

module.exports = router
