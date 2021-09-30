// const bioData = {
//     name : "atul",
//     surname: "Donode",
//     age: 26
// }
// const jsonData = JSON.stringify(bioData);
// console.log(jsonData);
// const objData = JSON.parse(jsonData);
// console.log(objData);


//1 convert obj into json
//2 add other file this json data
//3 read file 
//4 json to abj
// 5 console log


const fs = require ("fs");                      //2
const bioData = {
    name : "atul",
    surname: "Donode",
    age: 26
}

const jsonData = JSON.stringify(bioData);
console.log(jsonData);                              //1

fs.writeFile('json1.json', jsonData, (err) => {
//     console.log("done");                                //2
});

fs.readFile("json1.json", "utf-8", (err, data) => {
console.log(data);                                          //3
});

const objData = JSON.parse(jsonData);
console.log(objData);                                   //4






