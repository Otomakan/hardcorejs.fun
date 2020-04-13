// Generated automatically by nearley, version 2.18.0
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "KeyPair", "symbols": ["Key", "_", {"literal":":"}, "_", "ValueCaught"], "postprocess": function(d) {return {key:d[0], value:d[4]}}},
    {"name": "Key$ebnf$1", "symbols": [/[a-zA-Z]/]},
    {"name": "Key$ebnf$1", "symbols": ["Key$ebnf$1", /[a-zA-Z]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "Key", "symbols": ["Key$ebnf$1"], "postprocess": function(d) {return d[0].join("")}},
    {"name": "ValueCaught$string$1", "symbols": [{"literal":"{"}, {"literal":"{"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "ValueCaught$ebnf$1", "symbols": [/[^}}]/]},
    {"name": "ValueCaught$ebnf$1", "symbols": ["ValueCaught$ebnf$1", /[^}}]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "ValueCaught$string$2", "symbols": [{"literal":"}"}, {"literal":"}"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "ValueCaught", "symbols": ["ValueCaught$string$1", "ValueCaught$ebnf$1", "ValueCaught$string$2"], "postprocess": function(d) {return d[1].join("")}},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", /[\s]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {return null }}
]
  , ParserStart: "KeyPair"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
