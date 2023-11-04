import { ReadConfiguration } from "./service/ReadConfigurations"
import { CheckCyclicOperation } from "./SqlLite/CheckCyclicOperation"
import { CyclicOperationFactory } from "./businessLogic/Operations/CyclicOperationFactory"
import { ActionFactory } from "./service/ActionFactory"
import { DeleteFilesAction } from "./fileSystem/actions/DeleteFilesAction"
import { MoveFilesActionWithFilter } from "./fileSystem/actions/MoveFileActionWithFilter"
import { MoveFilesActionWithoutFilter } from "./fileSystem/actions/MoveFilesActionWithoutFilter"

var sqllite='C:/Repo/Scheduler_Typescript/src/SqlLite/Test_DB/Scheduler.db'

//ReadConfigurationTest()
//insertNewCyclicOperation('123Star', new Date(), 113)
//completeCyclicOperation('123Star', new Date())
//StartPluto()
//var y = readStatusPluto()
//DeleteFileActionTestsManual(undefined)
//MoveFilesActionTest_NoFilter('C:/zzzzzz/','C:/zzzzzz/pppppp/');
MoveFilesActionTest_WithFilter('C:/zzzzzz/','C:/zzzzzz/pppppp/', 'tit');

console.log(100)


function StartPluto() {
    var y = new CheckCyclicOperation(sqllite, 1)
    y.start("pluto non c'è", new Date(), 234).then(x => console.log(`started: ${x}`))
}

function insertNewCyclicOperation(operationName: string, date: Date, schedulerId: number) {
    var y = new CheckCyclicOperation(sqllite, 1)
    y.create(operationName, date, schedulerId).then(x => console.log(`created: ${operationName}`))
}

function completeCyclicOperation(operationName: string, date: Date) {
    var y = new CheckCyclicOperation(sqllite, 1)
    y.close(operationName, date).then(x => console.log(`closed: ${operationName}`))
}

function readStatusPluto() {
    var y = new CheckCyclicOperation(sqllite, 1)
    y.read("pluto non c'è").then(x => {
        console.log(`result is: ${x?.check(10)}`)
    })
    return y
}

function  DeleteFileActionTestsManual(filter: string ){
    var a = new DeleteFilesAction('C:/pppp/', filter)
    a.execute().then(x => console.log(`result : ${JSON.stringify(x)}`))
}

function ReadConfigurationTest() {
    var reader = new ReadConfiguration('C:/Repo/Scheduler_Typescript/ActionsConfiguration/Fixed/',
                                       'C:/Repo/Scheduler_Typescript/ActionsConfiguration/Cyclic/',
                                       new CyclicOperationFactory(sqllite, 34, new ActionFactory()))
    reader.load()
        .then(x => {
            console.log(`data : ${JSON.stringify(x)}`)
        })
}

function MoveFilesActionTest_NoFilter(from: string, to: string) {
    var m = new MoveFilesActionWithoutFilter(from, to);
    m.execute().then(x => console.log(`result : ${JSON.stringify(x)}`))
}
function MoveFilesActionTest_WithFilter(from: string, to: string, filter: string) {
    var m = new MoveFilesActionWithFilter(from, to, filter);
    m.execute().then(x => console.log(`result : ${JSON.stringify(x)}`))
}