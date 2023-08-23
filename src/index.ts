import { read } from "fs"
import { CyclingConfiguratrion } from "./service/dto/CyclingConfiguratrion"
import { ReadConfiguration } from "./service/ReadConfigurations"


var reader = new ReadConfiguration('C:/Repo/Scheduler_Typescript/ActionsConfiguration/Fixed/', 
                                   'C:/Repo/Scheduler_Typescript/ActionsConfiguration/Cyclic/')
var result = reader.load()
                   .then(x => {
                        console.log(`data : ${JSON.stringify(x)}`)     
                   })

   var y=34
   y = y+69
   console.log(y)
