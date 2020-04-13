KeyPair -> Key _ ":" _ ValueCaught {% function(d) {return {key:d[0], value:d[4]}} %}
Key -> [a-zA-Z]:+ 	{% function(d) {return d[0].join("")} %}
ValueCaught -> "{{" [^}}]:+ "}}"  {% function(d) {return d[1].join("")} %}
_ -> [\s]:*     {% function(d) {return null } %}