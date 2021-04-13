const Admin = require('../models/admin.model.js');

// Create and Save a new Admin
exports.create = (req, res) => {
    // Validate request
    //on test sur le champ le plus prioritaire
    if(!req.body.nom) {
        return res.status(400).send({
            message: " nom can not be empty"
        });
    }

    // Create an Admin
    const admin = new Admin({
        nom: req.body.nom || "Untitled admin", 
        occupation: req.body.occupation,
        date: req.body.date,
        email: req.body.email,
        password : req.body.password,
        telephone : req.body.telephone,
        image : req.body.image,
        message : req.body.message
        
    });

    // Save Admin in the database
    admin.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating Admin !"
        });
    });
};

// Retrieve and return all admins from the database.
//then : notre objet , send: to API

//findall Admin
exports.findAll = (req, res) => {
    Admin.find()
    .then(admins => {
        res.send(admins);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving entity!"
        });
    });
};

// Find a single admin by ID
exports.findOne = (req, res) => {
    Admin.findById(req.params.adminId)
    .then( admin => {
        if(!admin) {
            return res.status(404).send({
                message: "Admin not found with id " + req.params.adminId
            });            
        }
        res.send(admin);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Admin not found with id " + req.params.adminId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving admin with id " + req.params.adminId
        });
    });
};

// Update admin identified by Id in the request
exports.update = (req, res) => {
    // tout d'abord on fait un teste de validation sur tout les champs
    if(!req.body.occupation) {
        return res.status(400).send({
            message: " occupation can not be empty"
        });}
    if(!req.body.email) {
         return res.status(400).send({
            message: " email can not be empty"
        });
    }
    if(!req.body.password) {
        return res.status(400).send({
           message: " password can not be empty"
       });
   }

    // Find admin by id and update it with the request body
    Admin.findByIdAndUpdate(req.params.adminId, {
        nom: req.body.nom || "Untitled Admin"
    }, {new: true})
    .then(admin => {
        //on teste tout d'abord l'éxistance de l'objet
        if(!admin) {
            return res.status(404).send({
                message: "Admin not found with id " + req.params.adminId
            });
        }
        res.send(admin); //else si il éxiste , on envoie l'objet à l'API
    }).catch(err => { //lever une exception
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "admin not found with id " + req.params.adminId
            });                
        }
        return res.status(500).send({
            message: "Error updating admin with id " + req.params.adminId
        });
    });
};

// Delete Admin with the specified adminId in the request
exports.delete = (req, res) => {
    Admin.findByIdAndRemove(req.params.adminId) //içi on applique la méthode qui trouve l'objet par son id et la supprime
    .then(admin => {
        if(!admin) {
            return res.status(404).send({
                message: "  not found with id " + req.params.adminId
            });
        }
        res.send({message: "Admin deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.nom === 'NotFound') {
            return res.status(404).send({
                message: "Admin not found with id " + req.params.adminId
            });                
        }
        return res.status(500).send({
            message: "Could not delete adminwith id " + req.params.adminId
        });
    });
};
