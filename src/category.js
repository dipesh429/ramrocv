
const arr= require ("./categories.json")

export default arr.map((each,k)=> ({label:each,value:k+1}))



