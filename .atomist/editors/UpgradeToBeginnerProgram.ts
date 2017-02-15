import { ProjectEditor } from '@atomist/rug/operations/ProjectEditor'
import { Project } from '@atomist/rug/model/Core'
import { Result, Status } from '@atomist/rug/operations/RugOperation'

class UpgradeToBeginnerProgram implements ProjectEditor {
    tags: string[] = ["documentation"]
    name: string = "UpgradeToBeginnerProgram"
    description: string = "Added to a project by AddTypeScriptEditor"
    edit(project: Project): Result {
       project.addFile("hello.txt", "Hello, World!")
       return new Result(Status.Success, "I made a file")
    }
}

export let hello = new UpgradeToBeginnerProgram()
