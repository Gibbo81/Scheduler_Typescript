import { FixedConfiguratrion } from "../../service/dto/FixedConfiguratrion";

test('Fixed Configuration is correctly deserialized', () =>{
  var data = `
{
  "OperationName" : "pippus",
  "ExecutionTimes" : [
    "21:15",
    "7:56",
    "22:1"
  ],
  "MaxDelta": 10,
  "ExcludedWeekDays": [7],
  "ExcludedYearDays": [
    "12-27",
    "1-30",
    "3-2"
  ],
  "Actions" :[
    {"one":"1", "two":"2"},
    {"car":"fiat", "dog":"fido", "cat":"black"}
  ],
  "Parallel": false
}`

   var dto = JSON.parse(data) as FixedConfiguratrion

   expect(dto.OperationName).toBe('pippus')
   expect(dto.MaxDelta).toBe(10)
   expect(dto.ExecutionTimes.length).toBe(3)
   expect(dto.ExecutionTimes[0]).toBe("21:15")
   expect(dto.ExecutionTimes[1]).toBe("7:56")
   expect(dto.ExecutionTimes[2]).toBe("22:1")
   expect(dto.ExcludedWeekDays.length).toBe(1)
   expect(dto.ExcludedWeekDays[0]).toBe(7)
   expect(dto.ExcludedYearDays.length).toBe(3)
   expect(dto.ExcludedYearDays[0]).toBe("12-27")
   expect(dto.ExcludedYearDays[1]).toBe("1-30")
   expect(dto.ExcludedYearDays[2]).toBe("3-2")
   expect(dto.Parallel).toBe(false)
   expect(dto.Actions.length).toBe(2)
   expect(dto.Actions[0]['one']).toBe('1')
   expect(dto.Actions[0]['two']).toBe('2')
   expect(dto.Actions[1]['car']).toBe('fiat')
   expect(dto.Actions[1]['dog']).toBe('fido')
   expect(dto.Actions[1]['cat']).toBe('black')
})
