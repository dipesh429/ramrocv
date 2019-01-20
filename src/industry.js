
const arr= require ("./industries.json")


export default arr.map((each,k)=> ({label:each,value:each.toLowerCase()}))


