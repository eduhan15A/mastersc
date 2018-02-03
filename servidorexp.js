const expressLib = require ("express");
const port = 3001;
var app = expressLib();
var path    = require("path");
app.use(expressLib.static("public"));
//app.use(app.router);
//app.use(expressLib.static(path.join(__dirname, 'public')));


app.get('/', (req,response)=>{
//response.send('Hola Chiquitín');
 response.sendFile(path.join(__dirname+'/index.html'));
});


console.log(`Running at Port ${port}`);
app.listen(port);