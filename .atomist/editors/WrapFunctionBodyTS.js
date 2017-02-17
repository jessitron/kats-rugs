"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PathExpression_1 = require("@atomist/rug/tree/PathExpression");
var Decorators_1 = require("@atomist/rug/operations/Decorators");
var WrapFunctionBodyTS = (function () {
    function WrapFunctionBodyTS() {
    }
    WrapFunctionBodyTS.prototype.edit = function (project) {
        var mg = new PathExpression_1.Microgrammar('syntaxNodeParser', ": \u27E6Parser[SyntaxNode]\u27E7 = $body", { body: "$endOfBody",
            endOfBody: "\u00A1\u27E6\n\n\u27E7\u00A1" });
        var eng = project.context().pathExpressionEngine().addType(mg);
        console.log("letsa go");
        eng.with(project, "//File()[@name=\"ElmParser.scala\"]/syntaxNodeParser()", function (n) {
            console.log("Matched node:" + n.value());
            console.log("with body: " + n.body().value());
        });
    };
    return WrapFunctionBodyTS;
}());
WrapFunctionBodyTS = __decorate([
    Decorators_1.Editor("WrapFunctionBodyTS", "change the type, and wrap the body, of certain functinos"),
    Decorators_1.Tags("documentation")
], WrapFunctionBodyTS);
exports.wrapFunctionBodyTS = new WrapFunctionBodyTS();
