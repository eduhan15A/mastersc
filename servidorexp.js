const expressLib = require("express");
const parser = require('body-parser');
const multiparty = require('multiparty');
const fs = require('fs');
const port = 3001;
var app = expressLib();
var path = require("path");
const plantilla = require("ejs");
const connectMysql = require("./Services/db_Connect_Mysql");

app.use(expressLib.static('public'))
app.use(expressLib.static('Views'))
app.set("view engine", "ejs");



app.get('/lista', (req, res) => {
    var obj = {};
    connectMysql.query('SELECT * FROM Contactos', function (err, result) {
        if (err) {
            throw err;
        } else {
            res.render("page", {
                data: req.url,
                contactos: result
            });
        }

    });

});

app.get('*', (req, response) => {

    response.render("page", {
        data: req.url
    });
});

app.post('/postContactData', (req, res) => {
    var form = new multiparty.Form();
    var data = {
        data: {}
    };

    form.parse(req, function (err, fields, files) {
        if (err) {
            console.log(err);
            data.data.err = err;
            res.render("postdata2", data);
            return;
        }

        //No valid file?
        if (!files['archivo'][0].originalFilename || files['archivo'][0].originalFilename === '') {
            fs.unlink(files['archivo'][0].path, (err) => {
                if (err) {
                    console.warn(err, ' File not deleted: ' + files['archivo'][0].path);
                }
                console.log('Temporal file ' + files['archivo'][0].path + ' was deleted');
            });
            data.data.noFile = 'No valid file';
            res.render("postContactData", data);
            return;
        }

        //Copy uploaded file
        var ext = /(\.[\w\d-]*)$/g.exec(files['archivo'][0].originalFilename);
        ext ? ext = ext[0] : ext = '';
        var filename = (new Date()).getTime();
        var fullfile = path.join(__dirname, 'public', 'archivos', filename + ext);
        var fullfileinfo = path.join(__dirname, 'public', 'archivos', filename + '.txt');
        fs.writeFileSync(fullfile, fs.readFileSync(files['archivo'][0].path));

        //Build up info file
        var info = '';
        for (var i in fields) {
            data.data[i] = fields[i];
            info += i + ' : ' + fields[i] + '\n';
        }
        fs.writeFileSync(fullfileinfo, info);

        //Prepare for view
        data.data.file = filename + ext;
        data.data.fileInfo = filename + '.txt';

        //Clean up ur dirty work
        fs.unlink(files['archivo'][0].path, (err) => {
            if (err) {
                console.warn(err, ' File not deleted: ' + files['archivo'][0].path);
            } else {
                console.log('Temporal file ' + files['archivo'][0].path + ' was deleted');
            }
        });


        connectMysql.connect();


        res.render("postContactData", data);
    });
});


console.log(`Running at Port ${port}`);
app.listen(port);
