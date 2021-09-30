var express=require('express');
const mongoose = require("mongoose")
const { response } = require("express");

const WishListSchema = new mongoose.Schema({
    Wish : {
        type: String,
        required: true 
    }
}) 

const Wishlist = new mongoose.model('Wishlist', WishListSchema);
module.exports = Wishlist;