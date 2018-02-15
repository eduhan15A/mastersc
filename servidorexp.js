const expressLib = require ("express");
const port = 3001;
var app = expressLib();
var path    = require("path");
const plantilla = require("ejs");

//app.use(expressLib.static("public"));
//app.use(app.router);
//app.use(expressLib.static(path.join(__dirname, 'public')));

app.use(expressLib.static('public'))
app.use(expressLib.static('Views'))
app.set("view engine","ejs");


app.get('*', (req,response)=>{
//response.send('Hola Chiquitín');
 //response.sendFile(path.join(__dirname+'/index.html'));
//response.sendFile(path.join(__dirname+'../views/index.ejs'));

		response.render("page", { data: req.url });
		//response.render("contacto")

});
//app.get('/contacto', (req,response)=>{
	//	response.render("contacto")
//});


console.log(`Running at Port ${port}`);
app.listen(port);