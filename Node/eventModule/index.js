const EventEmitter = require ("events");
const events = new EventEmitter();

events.on ("my name", () => {
console.log("my name is Atul");
});

events.on ("my name", () => {
    console.log("my name is Atul");
    });


events.on ("my name", () => {
console.log("my name is Atul");
});

events.on ("my name", (sc, msg) =>{
console.log(`code is ${sc} and ${msg}`);
})
events.emit("my name", 200, "ok");