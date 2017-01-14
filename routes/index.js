module.exports=function(app){
	app.use("/sign",require("./sign"));
	app.use("/posts",require("./posts"))
	app.use("/comments",require("./comments"))
}