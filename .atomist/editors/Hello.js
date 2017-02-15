"use strict";
var RugOperation_1 = require("@atomist/rug/operations/RugOperation");
var PathExpression_1 = require("@atomist/rug/tree/PathExpression");
var Hello = (function () {
    function Hello() {
        this.tags = ["demo"];
        this.name = "Hello";
        this.description = "Make the app display a greeting and nothing else";
    }
    Hello.prototype.edit = function (project) {
        var pathExp = new PathExpression_1.PathExpression("/src//Elm()/function[/functionName[@value=\"main\"]]/body");
        project.addFile("hello.txt", "Hello, World!");
        return new RugOperation_1.Result(RugOperation_1.Status.Success, "I made a file");
    };
    return Hello;
}());
exports.hello = new Hello();
