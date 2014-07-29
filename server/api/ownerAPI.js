module.exports = function(router, ownerAPI){
//get all route
  router.route('/owner')
//Get all Owners
    .get(function(req, res) {
        Owner.find(function(err, owner) {
          if (err)
             res.send(err);
          else
            res.json(owner);
         });
    })
//Create an owner
    .post(function(req, res){
      var owner = new Owner();
      owner.name = req.body.name;

      owner.save(function(err){
        if(err)
          res.send(err);
        else
          res.json({message: 'owner created!'});
      });
    });

  //Route with ID
  router.route('/owner/:owner_id')
  //get a single owner
    .get(function(req, res){
      Owner.findById(req.params.owner_id, function(err, owner){
          if (err)
              res.send(err);
          else
            res.json(owner);
      });
    })
  //update a user with new info
    .put(function(req, res){
      // use our owner model to find the owner's we want
      Owner.findById(req.params.owner_id, function(err, owner) {

          if (err)
            res.send(err);
          else{
            if(req.body.explicit){
            User.update({roomID: owner.roomID}, {$set: {explicitPermission: req.body.explicit}}, {multi: true}, function(err, numberAffected){
              if(err) console.log(err)
              else {owner.explicit = req.body.explicit; console.log("success "+ numberAffected);}
            })
          }
          owner.rdioURL = req.body.email;
 	        // update the owner's info

          // save the bear
          owner.save(function(err) {
            if (err)
              res.send(err);
            else
              res.json({ message: "Owner Updated!" });
          });
        }
        });
    })

    //delete an owner
    .delete(function(req, res){
      Owner.remove({
        _id: req.params.owner_id
      }, function(err, owner){
        if(err)
          res.send(err);
        else
          res.json({message: owner.name+" successfully deleted"})
      })
    });

  };
