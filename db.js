'use strict';

const mongoose = require('mongoose');

const appSchema = mongoose.Schema({
  mail: { type: String, required: true, index: { unique: true } }
});

addMail = (req, res, next) => {
    let app = new appSchema({
        mail = req['query']['mail'])
    };
    app.save();
