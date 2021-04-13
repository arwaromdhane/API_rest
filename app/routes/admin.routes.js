module.exports = (app) => {
    const admins = require('../controllers/admin.controller.js');

    // Create a new Admin
    app.post('/admins', admins.create);

    // Retrieve all Admin
    app.get('/admins', admins.findAll);

    // Trouver l'admin avec son id
    app.get('/admins/:id', admins.findOne);

    // Update admin aprés la récupération avec son id
    app.put('/admins/:id', admins.update);
    
    // Delete admin avec son id
    app.delete('/admins/:id', admins.delete);
}