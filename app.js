/**
 * Created by scmhzl on 2017/1/4.
 */
var express=require("express")
var path=require("path")
var routes=require("./routes/index.js")
var bodyParser=require("body-parser")
var cookieParser=require("cookie-parser")
var app=express()
//设置静态文件
app.use(express.static(path.join(__dirname,"public")))
//解析req中的body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//解析cookie
app.use(cookieParser())
//允许跨越
app.use(function(req,res,next){
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:7777");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Content-Type","multipart/form-data");
    next()
})
routes(app);
app.listen("80")
console.log("open at 80")



