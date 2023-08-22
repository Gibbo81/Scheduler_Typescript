import { CyclingConfiguratrion } from "./service/dto/CyclingConfiguratrion"

console.log(`hello me!`)

var data = `
{
  "CyclingTime" : 20,
  "Actions" :[
    {"one":"1", "two":"2"},
    {"car":"fiat", "dog":"fido", "cat":"black"}
  ],
  "Parallel": false
}`

   var dto = JSON.parse(data) as CyclingConfiguratrion

   var y=34
   y = y+69
   console.log(y)
