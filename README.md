项目简介：
使用react+mongodb搭建个人博客,所有样式均未调整
功能：
首页根据是否登录显示不同的内容，以及相关操作；
文章总数、评论总数，喜欢总数等；
文章的发表；
文章作者管理文章以及评论删除；
文章喜欢以及评论；
用户的登陆注册；


主要技术：
1、react技术，redux管理所有所有状态，react-router设置页面路由；
2、express+mongolass进行后台数据的操作和管理；
3、webpack打包；
4、使用es6编写，babel转译；
5、前后端分离，$ajax数据交互；

博客预览
  git clone https://github.com/scmhzl/master.git
  cd blog
  npm install
  npm install -g supervisor
  supervisor --harmony app
  npm start
  
  
 未完善：
 1、调整样式
 2、添加评论回复功能
 3、添加上传头像功能
 4、router按需加载
 5、移动端
