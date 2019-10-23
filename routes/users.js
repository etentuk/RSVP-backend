const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  // const events = req.body.events;

  const newUser = new User({
    firstName,
    lastName,
    email,
    password,
    // events,
  });

  newUser.save()
    .then((user) => {
      // console.log(user);
      res.json({success: true, data: user});
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/login').post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email})
    .then((user)=>{
      if(user.password === password){
        res.json({success: true, data: user})
      }else{
        res.json({success: false, message: 'Incorrect details'})
      }
    })
    .catch(error=>{
      res.json({success: false, message: 'Incorrect details'})
    });
});

router.route('/update/:id').post((req, res) => {
  console.log('Params', req.params.id);
  User.findById(req.params.id)
    .then(user => {
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.email = req.body.email;

      user.save()
        .then(() => res.json({success: true, message: 'Profile Updated!'}))
        .catch(error => res.json({success: false, message: 'Incorrect details'}));
    })
    .catch(err => res.json({success: false, message: 'Incorrect details'}));
});

module.exports = router;