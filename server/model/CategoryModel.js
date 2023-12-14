const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
name:{
  type: String,
  required: true
},
color:{
  type: String,
},
icon:{
  type: String,
},
});


const category = mongoose.model('Product', categorySchema);

module.exports = category