import { EditProject } from '@atomist/rug/operations/ProjectEditor'
import { Project } from '@atomist/rug/model/Core'
import { Pattern } from '@atomist/rug/operations/RugOperation'
import { PathExpressionEngine, Microgrammar } from '@atomist/rug/tree/PathExpression'
import { Editor, Parameter, Tags } from '@atomist/rug/operations/Decorators'

@Editor("WrapFunctionBodyTS", "change the type, and wrap the body, of certain functinos")
@Tags("scala")
class WrapFunctionBodyTS {

    edit(project: Project) {

      let mg = new Microgrammar('syntaxNodeParser',
       `: $declaredType = $body`,
       { declaredType: "Parser[SyntaxNode]",
         body: everythingUpTo(literalWithWhitespace(`

`))})
      let eng: PathExpressionEngine = project.context().pathExpressionEngine().addType(mg)

       eng.with<any>(project, `//File()[@name="ElmParser.scala"]/syntaxNodeParser()`, n => {
        console.log("Matched node:" + n.value())
        let currentBody = n.body().value().trim();
        n.declaredType().update(`Parser[PositionedSyntaxNode]`)
        n.body().update(`positionedNode(${currentBody})

`)
        console.log("After:" + n.value())
      })

      function everythingUpTo(matcher: String) {
        return `¡${matcher}¡`;
      }

      function literalWithWhitespace(matcher: String) {
        return `⟦${matcher}⟧`;
      }
    }

}

export let wrapFunctionBodyTS = new WrapFunctionBodyTS()
