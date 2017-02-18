import { EditProject } from '@atomist/rug/operations/ProjectEditor'
import { Project } from '@atomist/rug/model/Core'
import { Pattern } from '@atomist/rug/operations/RugOperation'
import { PathExpressionEngine, Microgrammar, TreeNode } from '@atomist/rug/tree/PathExpression'
import { Editor, Parameter, Tags } from '@atomist/rug/operations/Decorators'

@Editor("AddPuppies", "change the type, and wrap the body, of certain functinos")
@Tags("elm")
class AddPuppies {

    edit(project: Project) {
      let eng = project.context().pathExpressionEngine();

      project.findFile("resources/styles.css").append("img.puppy { width: 100% }")

       let elmSource = `/src/File()[@name="Main.elm"]/Elm()`

        eng.with<any>(project, elmSource, n => {
           addImport(n, "Html.Attributes")
       })

       addPuppy(project, "roswell1.jpg")
       addPuppy(project, "roswell2.jpg")
       addPuppy(project, "roswell3.jpg")
       addPuppy(project, "giphy8.gif")

       function addPuppy(project: Project, puppyFile: string) {
          let childrenOfMainDiv = `/src/File()[@name="Main.elm"]/Elm()/functionDeclaration[/functionName[@value='main']]/body/functionApplication/argument[2]/listLiteral`
          let puppyImage = `Html.br [] [], Html.img [ Html.Attributes.src "${puppyFile}", Html.Attributes.class "puppy"] []`
          project.copyEditorBackingFileOrFail(puppyFile, 'resources/' + puppyFile)

          eng.with<any>(project, childrenOfMainDiv, n => {
              //console.log("Matched node:" + n.value())
              addToListLiteral(n, puppyImage)
              //console.log("After:" + n.value())
            })
       }

      function addImport(elmRootNode: TreeNode, neededImport: String) {
        let firstImport = `/importStatement[1]`
        eng.with<any>(elmRootNode, firstImport, n => {
        // console.log("Matched import:" + n.value())
         n.update(`import ${neededImport}\n${n.value()}`)
        // console.log("After:" + n.value())
        })
      }

      function addToListLiteral(n, newItem: string) {
        let valueWithoutCloseBrace = n.value().substring(0, n.value().length - 2)
          // todo: if list is empty, don't put a comma
        let newValue = valueWithoutCloseBrace + ", " + newItem + " ]"
        n.update(newValue);
      }
    }


}

export let addPuppies = new AddPuppies()
