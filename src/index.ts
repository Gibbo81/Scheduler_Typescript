import { read } from "fs"
import { CyclingConfiguratrion } from "./service/dto/CyclingConfiguratrion"
import { ReadConfiguration } from "./service/ReadConfigurations"
import { CheckCyclicAction } from "./SqlLite/CheckCyclicAction"

var sqllite='C:/Repo/Scheduler_Typescript/src/SqlLite/Test_DB/Scheduler.db'

//ReadConfigurationToDTO()

// var x = new CheckCyclicAction("pippo", 20, sqllite,1)
// x.check().then(x => console.log(`result is: ${x}`))
var y = new CheckCyclicAction("pluto non c'è", 20, sqllite, 1)
y.check().then(x => console.log(`result is: ${x}`))


console.log(100)


   function ReadConfigurationToDTO() {
    var reader = new ReadConfiguration('C:/Repo/Scheduler_Typescript/ActionsConfiguration/Fixed/',
        'C:/Repo/Scheduler_Typescript/ActionsConfiguration/Cyclic/')
    var result = reader.load()
        .then(x => {
            console.log(`data : ${JSON.stringify(x)}`)
        })
}

