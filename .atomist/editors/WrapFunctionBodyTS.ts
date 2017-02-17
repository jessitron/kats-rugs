import { EditProject } from '@atomist/rug/operations/ProjectEditor'
import { Project } from '@atomist/rug/model/Core'
import { Pattern } from '@atomist/rug/operations/RugOperation'
import { PathExpressionEngine, Microgrammar } from '@atomist/rug/tree/PathExpression'
import { Editor, Parameter, Tags } from '@atomist/rug/operations/Decorators'

@Editor("WrapFunctionBodyTS", "change the type, and wrap the body, of certain functinos")
@Tags("documentation")
class WrapFunctionBodyTS {

    edit(project: Project) {

      let mg = new Microgrammar('syntaxNodeParser',
       `: ⟦Parser[SyntaxNode]⟧ = $body`,
       {  body: `$endOfBody`,
          endOfBody: `¡⟦

⟧¡`})
      let eng: PathExpressionEngine = project.context().pathExpressionEngine().addType(mg)

 console.log("letsa go");

       eng.with<any>(project, `//File()[@name="ElmParser.scala"]/syntaxNodeParser()`, n => {
        console.log("Matched node:" + n.value())
        console.log("with body: " + n.body().value())

      })
    }
}

export let wrapFunctionBodyTS = new WrapFunctionBodyTS()
