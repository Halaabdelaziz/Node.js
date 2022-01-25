const mongoose = require('mongoose');;
const { Schema } = mongoose;



const stdSchema = new Schema(
  {
    stdname: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: Number,
  },
 
);

const student = mongoose.model('students',stdSchema);
module.exports = student;

