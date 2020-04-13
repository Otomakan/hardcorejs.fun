const faParse = require("./index.js")
const assert = require("assert")
const describe = require('mocha').describe
// const {describe, it} = mocha

describe('Main Parser', function(){
    describe('Simple Valid Input', function(){
        it('should return an object with two keys', function(){
            assert.equal(faParse(`name:{{Jack}} lastName: {{Misteli}}`), {name:"Jack" , lastName: "Misteli"})
        })
    })
    describe('Mising ":" ', function(){
        it('should return an object with two keys', function(){
            assert.equal(faParse(`name {{Jack}} lastName: {{Misteli}}`), {name:"Jack" , lastName: "Misteli"})
        })
    })
    describe('invalid opening brackets', function(){
        it('should return an error', function(){
            assert.equal(faParse(`name: {Jack}} lastName: {{Misteli}}`), {name:"Jack" , lastName: "Misteli"})
        })
    })
})