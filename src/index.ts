import { read } from "fs"
import { CyclingConfiguratrion } from "./service/dto/CyclingConfiguratrion"
import { ReadConfiguration } from "./service/ReadConfigurations"
import { CheckCyclicOperation } from "./SqlLite/CheckCyclicOperation"
import { CyclicOperationFactory } from "./businessLogic/Operations/CyclicOperationFactory"
import { DeleteFileAction } from "./businessLogic/Actions/DeleteFileAction"

var sqllite='C:/Repo/Scheduler_Typescript/src/SqlLite/Test_DB/Scheduler.db'

//ReadConfigurationToDTO()
//StartPluto()
//var y = readStatusPluto()
DeleteFileActionTestsManual(undefined)

console.log(100)


function StartPluto() {
    var y = new CheckCyclicOperation(sqllite, 1)
    y.Start("pluto non c'è", new Date(), 99).then(x => "Started")
}

function readStatusPluto() {
    var y = new CheckCyclicOperation(sqllite, 1)
    y.read("pluto non c'è").then(x => {
        console.log(`result is: ${x?.check(10)}`)
    })
    return y
}

function  DeleteFileActionTestsManual(filter: string ){
    var a = new DeleteFileAction('C:/pppp/', filter)
    a.execute().then(x => console.log(`result : ${JSON.stringify(x)}`))
}

function ReadConfigurationToDTO() {
    var reader = new ReadConfiguration('C:/Repo/Scheduler_Typescript/ActionsConfiguration/Fixed/',
                                       'C:/Repo/Scheduler_Typescript/ActionsConfiguration/Cyclic/',
                                       new CyclicOperationFactory(sqllite, 34))
    reader.load()
        .then(x => {
            console.log(`data : ${JSON.stringify(x)}`)
        })
}

