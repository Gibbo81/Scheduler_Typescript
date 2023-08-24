
import { CyclingConfiguratrion } from "../../service/dto/CyclingConfiguratrion";


test('Cycling Configuration is correctly deserialized', () =>{
  var data = `
{
  "OperationName" : "plutus",
  "CyclingTime" : 20,
  "Actions" :[
    {"one":"1", "two":"2"},
    {"car":"fiat", "dog":"fido", "cat":"black"}
  ],
  "Parallel": false
}`

   var dto = JSON.parse(data) as CyclingConfiguratrion

   expect(dto.OperationName).toBe('plutus')
   expect(dto.CyclingTime).toBe(20)
   expect(dto.Parallel).toBe(false)
   expect(dto.Actions.length).toBe(2)
   expect(dto.Actions[0]['one']).toBe('1')
   expect(dto.Actions[0]['two']).toBe('2')
   expect(dto.Actions[1]['car']).toBe('fiat')
   expect(dto.Actions[1]['dog']).toBe('fido')
   expect(dto.Actions[1]['cat']).toBe('black')
})
