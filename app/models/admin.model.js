const mongoose = require('mongoose');
// on crréer un modéle de schema pour l'utiliser à la base
const AdminSchema = mongoose.Schema({
    nom: {type: String, required: true },
    occupation:  {type: String, required: true },
    date:  {type: String, required: true },
    email:  {type: String, required: true },
    password :  {type: String, required: true },
    telephone : {type: String, required: true },
    image :  {type: String },
    message :  {type: String, required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Admin', AdminSchema);