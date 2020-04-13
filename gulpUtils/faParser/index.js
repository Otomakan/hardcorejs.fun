var nearley = require("nearley")
var grammar = require("./faGrammar.js")
const Readable = require('stream').Readable;
module.exports = faParser


function faParser(input, opts){
    // Map values will contain the key Pairs
    let mappedValues = {

    }
    //Beggining must be key
    // const s = new Readable();
    // s.push(string)
    if (typeof input==="string") {
        const r = new Reader(input)
        return r.read()
    }
    
}

class Reader{
    constructor(targetString){
        this.currentType = "key"
        this.currentValue = ""
        this.objectRepresentation = {}
        this.targetString = targetString 
        this.currentIndex = 0
        this.currentChar = targetString[0]
        this.currentKey = ""
    }

    read(){
        while(this.currentIndex < this.targetString.length){
            if(this.currentType === "key")
                this.keyReader()
            
            if(this.currentType === "value")
                this.valueReader()
        }
        return this.objectRepresentation
    }
    keyReader(){
        const currentChar = this.targetString[this.currentIndex]
        if(currentChar ===":"){
            this.objectRepresentation[this.currentValue.trim()] = ""
            this.currentKey = this.currentValue.trim()
            // Switch current Type to value so that we next use the value reader
            this.currentType = "value"
            // We check if the next type is a open bracket
            this.next()
            this.checkOpenBrackets()

          
            // We skip the next lookAhead
            this.next(1)
            this.currentValue = ""
        }
        else if (!currentChar.match(/[A-Za-z0-9$_-\s]/)){
            this.error(`${this.currentChar} is not a valid key character`)
        }
        else if ( this.currentChar != " "){
            this.currentValue += currentChar
        }
        this.next()
    }

    checkOpenBrackets(){
        while(this.currentChar!="#"){
            if(this.currentChar!=" "){
               this.error(`It looks like the key ${this.currentValue} is messed up please follow ":" with "{{"`)
           }
            try{
                this.next()
            }
            catch(e){
                this.error(`It looks like the key ${this.currentValue} doesn't have a matching value`)
            }
        }
            if (this.lookAhead(1)!="#"){
                this.error('You haven\'t matched your first open bracket')
            }
    }
    valueReader(){
        while(this.currentChar!="#" && this.lookAhead(1)!="#"){
            this.currentValue += this.currentChar
            if(this.lookAhead(1) === null){
                this.error(`There is a formating problem at the key ${this.currentKey}`)
            }
            this.next()
        }
        this.objectRepresentation[this.currentKey] = this.currentValue + this.currentChar
        this.currentType = "key"
        this.currentValue = ""
        this.next(3)
    }
    next(steps){
        var steps = steps || 1
        if( this.currentIndex < this.targetString.length ){
            this.currentIndex += steps
            this.currentChar = this.targetString[this.currentIndex]
        }
        else 
            throw "You have reached the last index"
    }
    error(message){
        throw `There was an error at index ${this.currentIndex} ${message? " : "+message : null}`
    }
    lookAhead(steps, singleChar){
        var singleChar = singleChar | true
        var steps = steps || 1
        const nextIndex = this.currentIndex+steps
        const {currentIndex, targetString} = this
        if (this.targetString.length <= nextIndex ){
            return null
        }
        if (singleChar)
            return targetString[nextIndex]
        
        else {
            return targetString.subString(currentIndex, nextIndex)
        }
    }
}
// function nearlyParser(string, opts){
//     console.log(string)
//     var parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar))
//     parser.feed(string)
//     console.log(parser.results.length)
//     return parser.results
// }