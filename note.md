#.toString()=number cannot be directly showed in browser so we should use.toString()

#parseFloat:- is only for numbers not strings. 
#parseFloat(req.query.anynumber):-makes web dynamic only for url. should add ?any=anynumber
#parseFloat(req.params.anynumber):-makes web dynamic only for url. should add /anynumber and "/:any" in route in code
#for string just use req.query.anystring or req.params.anystring

BackEnd
1.what is backend ?
=backend developer wo banda hai jo ki server and db program
karta hai

2.why backend
=to make websites more usable and purposefult for the
audience, to make websites dynamic(interactive with audience)

#js to learn for backend
#Must to do topics:
Es6 modules
Destructing syntax
Promises/async await
Fetch api
Closures
Dom manipulation
Array methods

#node modules
Think of a Node.js module as a small, reusable block of code

#Server-side development, in simple terms, refers to the process of creating and maintaining the part of a software application that runs on the server, typically a remote computer or a cloud-based server. This server-side code is responsible for processing and managing data, handling requests from client-side devices (like web browsers or mobile apps), and generating responses to send back to those devices.

#In-Simple
Server-side development is like the "behind-the-scenes" work in software. It's the part that happens on a big computer somewhere far away (the server) where you can't see it.

Imagine ordering pizza online. When you click the "Order" button, the server-side is where the magic happens. It figures out what pizza you want, checks if you have money, and tells the pizza shop to make your pizza. Then, it sends you a message when it's on its way.

#A runtime environment, in simple terms, is like a platform or a stage where a specific type of program or code can run. It provides the necessary tools and resources for that code to execute.

#create a server
const http = require("http");

const PORT = 4000;

const server = http.createServer((req, res) => {
  res.write("Hello");
  res.end(); //(always end)
});
server.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});

#EXPRESS
mainly used for routing
1.get=url ma data dekhine ho vanne(search gareko kura url ma dekhinxa )
2.post=url ma data nadekhine ho vanne

#Basic express server
const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("hey");
});
app.listen(4000, () => {
  console.log("Server is running at 4000");
});

#Middleware:- routing hunnu aaghi chalne, user input paxi(like checking authication of user)
app.use(function(req, res){
console.log ("hello from middleware");});
problem:- middleware chalyo vanne req jaam hunxa ani aarko route ma jadaina
solution(use of next()):-
app.use (function(rea, res, next){
console.log ("hello from middleware");
next()});

#: paxi lekheko kura=params
${req.params.username} to make web dynamic
params vanneko parameter ho. tyo vanneko chai user input ho. hami le www.facebook.com/profile/params. params vanneko user ko search item jun website ma pailai dekhi aako hunna

#ejs is a template engine 
#ejs:-markup style which converts into html,like a advance html.html dont have a superpower to calculate like 1+1 but ejs has. EJS (Embedded JavaScript) is a tool that helps you build web pages dynamically. It lets you create web pages that can change and show different content based on data or conditions. For example, if you have a website and want to say "Hello" to each visitor with their name, EJS can make it happen. It's like having a super-flexible web page that can say "Hello, [Visitor's Name]" to anyone who comes by.
1.npm i ejs
2.configure ejs
app.set("view engine","ejs")
3.create views folder and make ejs file
views/index.ejs
4.replace send with render
5.in render, write name of views bhitra ko file ko name and dont mentioned .ejs
app.get("/", function (req, res) {
  res.render("index");
});

#Static files:- images, style, frontend js lai setup garne
steps:-
1.create folder public
2.create folders images,styles, javascripts inside public
3.configure the express static in index.js
4.understand path

#express generator:- it makes folder automatically. all routing files are inside it automatically
steps:-
1.install it in laptop/device globally
npm i express-generator -g
2.to create new app anywhere:
open cmd move to desktop
create new app:express appname --view=ejs
3.use 2 commands
a.cd appname
b.npm i
c.open it on vs code(code .)

#mongodb
CODE SIDE        MONGODB SIDE
DB Setup         DB Formation
MODEL            Collection
Schema           Documents
yo banauda       yo yeta banxa

1.install mongodb
download from browser (done one time)
2.install mongoose js
npm i mongoose
3.require and setup connection
const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/dbname")
const userschema=mongoose.schema({
  username:string,
  name:string,
  age:number
})

mongoose.model(naam,schema)
4.make schema
5.create model and export

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/dbname");
const userschema = mongoose.Schema({
  username: String,
  name: String,
  age: Number,
});
module.exports= mongoose.model("database ma banne naam(collection)", userschema);

#cookies and session:-cookies is a data stored in browser and session in server

#Express-Session:- cannot use flash meaasge without express session

#flash message:-Those messages (notification,alerts)that pop up like a warning.
1.install connect-flash
2.make sure to setup express-session
3.put connect in index.js
const expressSession=require("express-session");
const flash-require("connect-flash");

app.use(flash());
4.kunai route ma flash create garne
5.kunai aarko route ma chaluna try garne

flash message ko matlab server ko kunai route ma kunai data banaune ani tyo data lai aarko route ma pauna

#error handling=try {
    //block of code
  } catch (error) {
    console.error("error msg like(Error generating QR code):", error.message);
    res.status(500).send("Internal Server Error");}

#Authentication and Authorization 
strategy:-(login with ....)    
steps:-
1.follow the 3 code img
2.npm i passport passport-local passport-local-mongoose mongoose express-session
3.write app.js code first in app.js file and write it after view engine and before logger(express-generator)
4.setup user.js then properly
5.in index.js try register first and then other codes as well

#json: way to organize and store data in a simple and human-readable format(bunch of objects)
example:{
  "person": {
    "name": "Alice",
    "age": 30,
    "isStudent": false,
    "hobbies": ["reading", "painting"]
  },
  "address": {
    "city": "Exampleville",
    "zipcode": "12345"
  }
}
In this JSON data, there are two main objects (person and address), each with its own set of key-value pairs. The ability to nest objects makes JSON a flexible format for organizing and exchanging structured data.

REST API