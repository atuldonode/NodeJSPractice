const mongoose = require('mongoose');
let express = require("express");
const http = require("http");
const log = require('../helper/logger');
const jwt = require('jsonwebtoken');
let config = require('./../config.json');
const Doctor = require("../models/users");
const AddProductAdmin = require("../models/addProductAdmin/addProduct.model");

const app = express();

server = http.createServer({}, app);
server.listen(9070); //listen on port 3332

const io = require("socket.io").listen(server, {
    pingTimeout: 3000,
    pingInterval: 3000,
});
console.log("io connected @ 9070");

module.exports = (async () => {
    io.sockets.on('connection', async (socket) => {
        console.log("+++++++++++++++");
        // socket.on("rideRequest", (data) => {
        //     console.log("rideRequest", data, data.vehicleType._id)
        // });

        // socket.on('rideAccepted', (dada) => {
        //     console.log("TCL: dada", dada)
        //     io.emit('rideAcceptedAll', 'close');
        // })

        socket.on("globalSearch", async (data) => {
            try {
                const resData = await Promise.all([
                    Doctor.find({
                      $or: [{
                        firstName: {
                            "$regex": data.search,
                            $options: "i",
                        }
                    }, {
                      lastName: {
                            "$regex": data.search,
                            $options: "i",
                        }
                    }],
                    designation: "Doctor",
                        status: {
                          $ne: "deleted"
                        }
                    }),
                    AddProductAdmin.find({
                      productName: {
                            "$regex": data.search,
                            $options: "i",
                        },
                        status: {
                          $ne: "deleted"
                        }
                    }),
                ]);

                var result = []
               newD = await result.concat(...resData)

                io.emit("globalSearch", newD); //listner
            } catch (error) {
                console.log(error)
                io.emit("globalSearch", 0);
            }
        })


    //     socket.on('rideCancel', (dada) => {
    //         console.log("TCL: dada", dada)
    //     })

    //     socket.on("rideResponse", (data) => {
    //         log.debug('rideResponse');
    //     });

    //     socket.on("otpConfirmed", (data) => {})

    //     socket.on("liveLocation", (data) => {
    //         log.debug('liveLocation');
    //         console.log(data)

    //         io.to(data.user._id).emit("driverLocation", data);
    //     });

    //     socket.on("rideFare", (data) => {
    //         log.debug('rideFare');
    //         console.log(data)
    //         io.to(data.user._id).emit("rideFare", data);
    //         io.to(data.driver._id).emit("rideEnded", data);
    //     });

    //     socket.on("paymentComplete", (data) => {
    //         log.debug('paymentComplete');
    //         console.log(data)
    //         io.to(data.user._id).emit("paymentComplete", {
    //             paymentStatus: "Success"
    //         });
    //         // io.to(data.driver._id).emit("rideEnded", data);
    //     });


    //     socket.on("rideacceptedbyadmin", (data) => {
    //         console.log("rideacceptedbyadmin", data);
    //         io.to(data).emit("reloadPage", data)
    //     });
    });


})