const mongoose = require('mongoose');

const AcSchema = mongoose.Schema({
    name: { type: String, required:true},
    img: { type: String, required:true}
});

module.exports = mongoose.model("autocomplete", AcSchema);