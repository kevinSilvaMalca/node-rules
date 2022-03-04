const RuleEngine = require('node-rules');
JSONfn = require('json-fn');
const Handlebars = require('handlebars');

async function procesoRules() {
    const arrayRules = [];
    const jsonRule = [
        {
            condition: "this.data['perfil'] === '' || this.data['perfil'] === null",
            consequence: 'd-41de86ccf3fc4336a6bf01526a13b5b1'
        },
        {
            condition: "this.data['perfil'] !== '' || this.data['perfil'] !== null",
            consequence: 'd-cc18c4cf533847d983634dd8a71e6af6'
        }
    ]

    await jsonRule.map(async (v) => {
        ruleString = '{"condition":"function (R) { R.when({{{conditionRule}}}); }","consequence":"function (R) { this.result = false;this.reason = \'{{consequenceRule}}\'; R.stop(); }"}';
        var template = Handlebars.compile(ruleString);
        var rule = template({
            conditionRule: v.condition,
            consequenceRule: v.consequence
        });
        
        var rulesObject = JSONfn.parse(rule);
        arrayRules.push(rulesObject);
    })

    // var template = Handlebars.compile(ruleString);
    // var rule = template({
    //     conditionRule: jsonRule.condition,
    //     consequenceRule: jsonRule.consequence
    // });

    // var str2 = JSONfn.parse(arrayRules);

    // var str3 = JSONfn.stringify(str2);
    // console.log(str3);


    // var ruleString = {"condition": function (R) {R.when(prueba);},"consequence": function (R) {this.result = false;this.reason = "VALIDACION SIN PERFIL";R.stop();}}

    // var str2 = JSONfn.stringify(ruleString);
    // console.log(str2);


    var R = new RuleEngine();
    R.register(arrayRules);
    // /* Fact with less than 500 as transaction, and this should be blocked */



    var fact = {
        "data": {
            "perfil": "asdasd",
            "emailAsesor": "a@gmail.com",
            "email": "b@gmail.com",
            "link": "https://18xj.short.gy/P0uIdS"
        }
    };

    R.execute(fact, function (data) {
        if (data.result) {
            console.log("Valid transaction");
        } else {
            console.log(data.reason);
        }
    });
}

procesoRules();