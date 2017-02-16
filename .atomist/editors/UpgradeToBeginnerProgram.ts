import { ProjectEditor } from '@atomist/rug/operations/ProjectEditor'
import { Project } from '@atomist/rug/model/Core'
import { Result, Status } from '@atomist/rug/operations/RugOperation'
import { PathExpressionEngine } from '@atomist/rug/tree/PathExpression'

class UpgradeToBeginnerProgram implements ProjectEditor {
    tags: string[] = ["documentation"]
    name: string = "UpgradeToBeginnerProgram"
    description: string = "Added to a project by AddTypeScriptEditor"


    edit(project: Project): Result {
      let eng: PathExpressionEngine = project.context().pathExpressionEngine()
      let elmMain = project.findFile("src/Main.elm")
      let mainFunctionBody = null

      eng.with<any>(elmMain, `/Elm()/function[/functionName[@value="main"]]/body`,
        body => {mainFunctionBody = body.value()}
      );

      console.log("The main function body is " + mainFunctionBody)
      if (mainFunctionBody == null) {
        return new Result(Status.Error, "Cound not get main function body");
      }

      // TODO: other declarations need to come too. And also imports

      project.copyEditorBackingFileOrFail("BeginnerProgram.elm", "src/NewMain.elm")

      let elmMain2 = project.findFile("src/NewMain.elm")

      eng.with<any>(elmMain2, `/Elm()/function`,
        f => {console.log("I see a function: " + f.functionName().value())}
      );

      eng.with<any>(elmMain2, `/Elm()/function[/functionName[@value="main"]]/body`,
        body => {body.update(mainFunctionBody)}
      );

      // project.deleteFile("src/Main.elm")
      // project.copyFileOrFail("src/NewMain.elm", "src/Main.elm")
      // project.deleteFile("src/NewMain.elm")

       return new Result(Status.Success, "I did a thing")
    }


}

export let hello = new UpgradeToBeginnerProgram()
