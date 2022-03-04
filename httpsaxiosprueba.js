var express = require("express");
var app = express();
var bodyParser = require('body-parser');


// Soporte para bodies codificados en jsonsupport.
app.use(bodyParser.json());
// Soporte para bodies codificados
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/pruebaFuego', function (req, res) {
    console.log(req);
    res.send({
        "code": "SUCCESS",
        "data": {
            "emailAsesor": "cbacigalupo@inteligogroup.com",
            "invitaciones": [
                {
                    "email": "PBELMONTA@GMAIL.COM",
                    "link": "https://18xj.short.gy/TLM3KY"
                }
            ],
            "perfil": "CONSERVADOR"
        },
        "message": ""
    }   )
});

var server = app.listen(8888, function () {
    console.log('Server is running..'); 
});