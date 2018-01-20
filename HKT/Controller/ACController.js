const AcSchema = require("../model/autocomplete");


const addAC = (name, img, callback) => {
    AcSchema.create({name: name, img:img}, (err, res)=>{
        if (err){
            callback(err, null);
        } else {
            callback(null, res._id);
        }
    });
};


const autoComp = (reg, callback) => { 
    AcSchema.find({ "name" : { $regex: reg, $options: 'i' }}, (err, list) =>{
            if (err) callback(err, null);
            else {
                callback(null, list);
            }

    }).limit(5);
}
module.exports = {
    addAC : addAC,
    autoComp: autoComp
}