"use strict";
var RugOperation_1 = require("@atomist/rug/operations/RugOperation");
var UpgradeToBeginnerProgram = (function () {
    function UpgradeToBeginnerProgram() {
        this.tags = ["documentation"];
        this.name = "UpgradeToBeginnerProgram";
        this.description = "Added to a project by AddTypeScriptEditor";
    }
    UpgradeToBeginnerProgram.prototype.edit = function (project) {
        var eng = project.context().pathExpressionEngine();
        var elmMain = project.findFile("src/Main.elm");
        var mainFunctionBody = null;
        eng.with(elmMain, "/Elm()/function[/functionName[@value=\"main\"]]/body", function (body) { mainFunctionBody = body.value(); });
        console.log("The main function body is " + mainFunctionBody);
        if (mainFunctionBody == null) {
            return new RugOperation_1.Result(RugOperation_1.Status.Error, "Cound not get main function body");
        }
        project.copyEditorBackingFileOrFail("BeginnerProgram.elm", "src/NewMain.elm");
        var elmMain2 = project.findFile("src/NewMain.elm");
        eng.with(elmMain2, "/Elm()/function", function (f) { console.log("I see a function: " + f.functionName().value()); });
        eng.with(elmMain2, "/Elm()/function[/functionName[@value=\"main\"]]/body", function (body) { body.update(mainFunctionBody); });
        return new RugOperation_1.Result(RugOperation_1.Status.Success, "I did a thing");
    };
    return UpgradeToBeginnerProgram;
}());
exports.hello = new UpgradeToBeginnerProgram();
