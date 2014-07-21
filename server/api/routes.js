Owner = require('../models/owner.js')

module.exports = function(router){

  router.get('/', function(req, res) {
     res.json({ message: 'hooray! welcome to our api!' });
  });


//get all route
  router.route('/owner')

    .get(function(req, res) {
    	  Owner.find(function(err, owner) {
    		  if (err)
    			   res.send(err);
    	     res.json(owner);
         });
    });

  //get one route
  router.route('/owner/:owner_id')
    .get(function(req, res){
      Owner.findById(req.params.owner_id, function(err, owner){
          if (err)
				      res.send(err);
			     res.json(owner);
      });
    })

    .put(function(req, res){
      // use our owner model to find the owner's we want
      Owner.findById(req.params.owner_id, function(err, owner) {

          if (err)
            res.send(err);

          owner.rdioURL = req.body.email; 	// update the owner's info

          // save the bear
          owner.save(function(err) {
            if (err)
              res.send(err);

            res.json({ message: "owner's email updated!" });
          });

        });
    });

  	// update the owner with this id (accessed at PUT owner/:owner_id)

};
