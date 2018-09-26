
module.exports = function(app, db) {
    var ObjectID = require('mongodb').ObjectID;
    //timestamps, temperary
    var dt = new Date();
    var utcDate = dt.toUTCString();

    app.get('/getcontact/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('alphausers').findOne(details, (err, item) => {
          if (err) {
              console.log('[ERROR 150] failed to get user; most likely no internet connection or error in code. Error in detail: ' + err +  + '  [' + utcDate + ']')
            res.send({'ERROR 150':'failed to get user; most likely no internet connection or error in code.'});
          } else {
            console.log( '[INFO] Request to pull contact info for contact ID: ' + id  + ' [' + utcDate + ']');
            res.send(item);
          } 
        });
      });

    const collection = 
    app.post('/addcontact/', (req, res) => {
      const user = { fName: req.body.fName, 
        lName: req.body.lName, 
        email: req.body.email, 
        address: req.body.address, 
        phone1: req.body.phone1, 
        phone2: req.body.phone2, 
        comp: req.body.comp, 
        notes: req.body.notes };
      db.collection('alphausers').insert(user, (err, result) => {
        if (err) { 
          res.send({ 'ERROR 200': 'FAILED TO ADD USER, please refer to console for a detail explination.' }); 
          console.log("ERROR 200: FAILED TO ADD USER. Detailed error: " + err);
        } else {
          console.log('user has been added.');
          res.redirect('back');
          //res.send(result.ops[0]);
        }
      });
    });
    
    app.put('/updatecontactr/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const note = { 
          fName: req.body.fName, 
          lName: req.body.lName, 
          email: req.body.email, 
          address:req.body.address, 
          phone1:req.body.phone1, 
          phone2:req.body.phone2, 
          comp:req.body.comp, 
          notes:req.body.notes };
        db.collection('alphausers').update(details, note, (err, result) => {
          if (err) {
              res.send({'Error 205':'Failed to update user, please refer to console for a detail explination.'});
              console.log("ERROR 205: Failed to update the user. Detailed error: " + err);
          } else {
              res.send(note);
          } 
        });
      });

      app.get('/getcontacts', (req, res) => {
        db.collection('alphausers').find( {} ).toArray(function(err, results) {
         if (err){
          console.log("ERROR 100: failed to get all users; most likely no internet connection or error in code.");
        } else {
          console.log("server results:")
          console.log(results);
          res.send(results);
        }
      })
    }
      );

      app.get('/delcontact/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('alphausers').remove(details, (err, item) => {
          if (err) {
            res.send({'error':'An error has occurred'});
          } else {
            console.log('Contact  ' + id + "has been deleted.");
            res.redirect('back');
            //res.send('Note ' + id + ' deleted!');
          } 
        });
      });


  


};