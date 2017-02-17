import { EditProject } from '@atomist/rug/operations/ProjectEditor'
import { Project } from '@atomist/rug/model/Core'
import { Pattern } from '@atomist/rug/operations/RugOperation'
import { Editor, Parameter, Tags } from '@atomist/rug/operations/Decorators'

@Editor("WrapFunctionBodyTS", "change the type, and wrap the body, of certain functinos")
@Tags("documentation")
class WrapFunctionBodyTS implements EditProject {

    @Parameter({
        displayName: "Some Input",
        description: "Example of how to specify a parameter using decorators",
        pattern: Pattern.any,
        validInput: "A description of the valid input",
        minLength: 1,
        maxLength: 100
    })
    input_parameter: string;

    edit(project: Project) {
        project.addFile("hello.txt", "Hello, World!\n" + this.input_parameter + "\n");
    }
}

export let wrapFunctionBodyTS = new WrapFunctionBodyTS()
