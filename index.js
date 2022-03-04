const RuleEngine = require('node-rules');
const Handlebars = require('handlebars');
/* Sample Rule to block a transaction if its below 500 */

var ruleString = [
    {
        "condition": function (R) { 
            R.when(this.data["perfil"]["prueba"] === "" || this.data["perfil"]["prueba"] === null); 
        },  
        "consequence": function (R) { 
            this.result = false; 
            this.reason = "VALIDACION SIN PERFIL"; 
            R.stop(); 
        },
    },
    {
        "condition": function (R) {
            R.when(this.data["perfil"]["prueba"] !== "" || this.data["perfil"]["prueba"] !== null);
        },
        "consequence": function (R) {
            this.result = false;
            this.reason = "VALIDACION CON PERFIL";
            R.stop();
        }
    }
];
var template = Handlebars.compile(ruleString);
var rule = template({ jsonhead: '["perfil"]["prueba"]' });

console.log(JSON.parse(rule));




/* Creating Rule Engine instance and registering rule */
var R = new RuleEngine();
R.register(rule);
/* Fact with less than 500 as transaction, and this should be blocked */



var fact = {
    "data": {
        "perfil": { "prueba": "" },
        "emailAsesor": "a@gmail.com",
        "email": "b@gmail.com",
        "link": "https://18xj.short.gy/P0uIdS"
    }
};

console.log(fact['data']['perfil'])

R.execute(fact, function (data) {
    if (data.result) {
        console.log("Valid transaction");
    } else {
        console.log("Blocked Reason:" + data.reason);
    }
});