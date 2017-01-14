var express=require("express")
var router=express.Router()
var sha1=require("sha1")
var formidable  =require("formidable")
var userModel=require("../models/users")

//自动登录
router.post("/autoLogin",function (req,res) {
    if(typeof (req.cookies.user) !== "undefined"){
        var name = req.cookies.user.name
        var password = req.cookies.user.password;
        userModel.getUserByName(name)
            .then(function (result) {
                if(result){
                    if(result.password === password){
                        res.cookie("user",result,{maxAge:60*60*24*1000,httpOnly: true})//httpOnly :true 防止xss攻击 （跨脚本攻击）
                        return res.send(JSON.stringify({state:100,message:"登陆成功",user:result}));
                    }
                }
            })
    }
})

//注册
router.post("/up",function (req,res) {
    var name = req.body.name,
        password = req.body.password
	//校验参数
	if(!(name.length>=1 && name.length<=10)){
		return res.send(JSON.stringify({state:101,message:"用户名限制在1-10字符"}))
	}
	if(password.length<6){
        return res.send(JSON.stringify({state:102,message:"密码至少6个字符"}))
	}

	//查看用户名是否存在
    userModel.getUserByName(name)
		.then(function (result) {
			//如果存在
			if(result){
                return res.send(JSON.stringify({state:101,message:"用户名已存在"}))
			}
            var user = {
                name:name,
                password:sha1(password)
                //avatar:avatar
            }
            userModel.create(user)
                .then(function (result) {
                    // 此 user 是插入 mongodb 后的值，包含 _id
                     var users = result.ops[0];
                    res.cookie("user",users,{maxAge:60*60*24*1000,httpOnly: true})//httpOnly :true 防止xss攻击 （跨脚本攻击）
                    return res.send(JSON.stringify({state:100,message:"注册成功",user:users}))
                })
                .catch(function () {
                    return res.send(JSON.stringify({state:103,message:"网哥灰去火星咯，请刷新召回网哥"}))
                })
        })
		.catch(function () {
            return res.send(JSON.stringify({state:103,message:"网哥灰去火星咯，请刷新召回网哥"}))
        })
})

//登陆
router.post("/in",function(req,res){
	var name = req.body.name;
	var password = req.body.password;
    userModel.getUserByName(name)
		.then(function (result) {
			if(!result){
				return res.send(JSON.stringify({state:104,message:"用户名不存在"}))
			}
            if(sha1(password) === result.password){
               res.cookie("user",result,{maxAge:60*60*24*1000,httpOnly: true})//httpOnly :true 防止xss攻击 （跨脚本攻击）
                return res.send(JSON.stringify({state:100,message:"登陆成功",user:result}));
            }
            return res.send(JSON.stringify({state:103,message:"账户与密码不匹配"}))
        })
        .catch(function () {
            return res.send(JSON.stringify({state:103,message:"网哥灰去火星咯，请刷新召回网哥"}))
        })
})

//退出
router.post("/out",function(req,res){
    res.clearCookie("user")
    res.send(JSON.stringify({state:200,message:"退出成功"}))
})

module.exports = router;