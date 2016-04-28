'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({


    nombre: {type: String, trim: true, required: true},
    apellido: {type: String, trim: true, required: true},
    nivelMilitar: {type: String, lowercase: true, trim: true, required: true},
    edad: {type: String, required: true},
    habilitado: {type: String, enum: ['si','no'] ,required: true}
});

module.exports = mongoose.model('User', userSchema);
