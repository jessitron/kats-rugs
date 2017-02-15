import { ProjectEditor } from '@atomist/rug/operations/ProjectEditor'
import { Project } from '@atomist/rug/model/Core'
import { Result, Status } from '@atomist/rug/operations/RugOperation'
import { PathExpression } from '@atomist/rug/tree/PathExpression'

class Hello implements ProjectEditor {
    tags: string[] = ["demo"]
    name: string = "Hello"
    description: string = "Make the app display a greeting and nothing else"
    edit(project: Project): Result {

       let pathExp = new PathExpression(`/src//Elm()/function[/functionName[@value="main"]]/body`)

       project.addFile("hello.txt", "Hello, World!")
       return new Result(Status.Success, "I made a file")
    }
}

export let hello = new Hello()
