/**
 * Created by scmhzl on 2017/1/3.
 */
var Comment=require("../mongodb/mongodb").Comment
var marked = require('marked');

// 将 comment 的 content 从 markdown 转换成 html
Comment.plugin('contentToHtml', {
    afterFind: function (comments) {
        return comments.map(function (comment) {
            comment.content = marked(comment.content);
            return comment;
        });
    }
});

module.exports={
    //创建评论
    create:function(comment){
        return Comment
            .create(comment)
            .exec()
    },
    // 通过用户 id 和评论 id 删除一个留言
    delCommentById: function delCommentById(commentId, author) {
        return Comment.remove({ author: author, _id: commentId }).exec();
    },
    // 通过文章 id 删除该文章下所有留言
    delCommentsByPostId: function delCommentsByPostId(postId) {
        return Comment.remove({ postId: postId }).exec();
    },
    // 通过文章 id 获取该文章下所有留言，按留言创建时间升序
    getComments: function getComments(postId) {
        return Comment
            .find({ postId: postId })
            .populate({ path: 'author', model: 'User' })
            .sort({ _id: 1 })
            .addCreatedAt()
            .contentToHtml()
            .exec();
    },
    // 通过文章 id 获取该文章下留言数
    getCommentsCount: function getCommentsCount(postId) {
        return Comment.count({ postId: postId }).exec();
    }
}