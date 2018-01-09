var express = require('express')
var mysql = require('mysql')
var bodyParser = require("body-parser")
var jade = require('jade')
var app = express()
var pool = mysql.createPool({
	host:"127.0.0.1",
	user:"root",
	password:"suhao",
	database:"cococ",
	port: "3306"
})
var list = express.Router()
app.use(bodyParser.urlencoded({}))
app.use("/list",list)

list.post("/tian",function(req,res){
	var arr = req.body
	pool.getConnection(function(err,connection){
    	if(err){
    		console.log('connection::'+err)
    		return
    	}
    	var sql = "insert into text(name,textname,text) values(?,?,?)"
    	connection.query(sql,[arr.user,arr.bookname,arr.txt],function(err,data){
    		if(err){
	    		console.log('sql::'+err)
	    		return
	    	}
    		res.send("ok")
    		connection.end()
    	})
    })
})

list.get("/list",function(req,res){
	var user = req.query.user
	pool.getConnection(function(err,connection){
    	if(err){
    		console.log('connection::'+err)
    		return
    	}
    	var sql = "select * from text name"
    	connection.query(sql,[],function(err,data){
    		if(err){
	    		console.log('sql::'+err)
	    		return
	    	}
    		var str = jade.renderFile("./1.jade",{pretty:true,titles:user,arr:data})
    		res.send(str)
    		connection.end()
    	})
    })
})

list.get("/text",function(req,res){
	var uid = req.query.uid
	console.log(uid)
	pool.getConnection(function(err,connection){
    	if(err){
    		console.log('connection::'+err)
    		return
    	}
    	var sql = "select * from text where uid = ?"
    	connection.query(sql,[uid],function(err,data){
    		if(err){
	    		console.log('sql::'+err)
	    		return
	    	}
    		var str = jade.renderFile("./2.jade",{pretty:true,arr:data})
    		res.send(str)
    		connection.end()
    	})
    })
})

app.use(express.static("./"))
app.listen(8000,function(){
	console.log("ok")
})
