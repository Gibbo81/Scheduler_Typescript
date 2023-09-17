import { read } from "fs"
import { CyclingConfiguratrion } from "./service/dto/CyclingConfiguratrion"
import { ReadConfiguration } from "./service/ReadConfigurations"
import { CheckCyclicAction } from "./SqlLite/CheckCyclicAction"

var sqllite='C:/Repo/Scheduler_Typescript/src/SqlLite/Test_DB/Scheduler.db'

//ReadConfigurationToDTO()


//StartPluto()

var y = readStatusPluto()


console.log(100)


function StartPluto() {
    var y = new CheckCyclicAction(sqllite, 1)
    y.Start("pluto non c'è", new Date(), 99).then(x => "Started")
}

function readStatusPluto() {
    var y = new CheckCyclicAction(sqllite, 1)
    y.read("pluto non c'è").then(x => {
        console.log(`result is: ${x?.check(10)}`)
    })
    return y
}

   function ReadConfigurationToDTO() {
    var reader = new ReadConfiguration('C:/Repo/Scheduler_Typescript/ActionsConfiguration/Fixed/',
        'C:/Repo/Scheduler_Typescript/ActionsConfiguration/Cyclic/')
    var result = reader.load()
        .then(x => {
            console.log(`data : ${JSON.stringify(x)}`)
        })
}

