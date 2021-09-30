// const add = ( a, b) => {
// return  a+b;
// };

// module.exports = add;

const add = (a, b) => {
    return a+b;
};

const sub = (a, b) => {
    return a-b;
};


var name = "atul"
// module.exports.add = add;
// module.exports.sub = sub;

module.exports = {add, sub, name};