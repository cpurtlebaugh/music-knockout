var mongoose = require('mongoose');
var User = require('./models/User');
var Trophy = require('./models/Trophy');

mongoose.connect('mongodb://localhost:27017/music-knockout');

var malachi;
var enid;

User.remove({}, function(err) {
  if (err) console.log(err);
  console.log('Users removed...');
  //let's remove trophies
  Trophy.remove({}, function(err) {
    if (err) console.log(err);
    console.log('Trophies removed...');
    //let's create users
    User.register(new User({
      username: 'malachi@email.com',
      age: 32,
      first_name: 'Malachi',
      last_name: 'Constant',
      wins: 1
    }),
    'poop', function(err, user) {
      malachi = user;
      User.register(new User({
        username: 'enid@email.com',
        age: 20,
        first_name: 'Enid',
        last_name: 'Coleslaw',
        wins: 3
      }),
      'poop', function(err, user) {
        enid = user;
        Trophy.create({ type: 'gold', img_url: 'http://www.webweaver.nu/clipart/img/nature/planets/smiling-gold-star.png'
          }, function(err, trophy) {
            malachi.trophies.push(trophy);
            malachi.save();
              Trophy.create({ type: 'silver', img_url: 'http://blog.red-lane.bolton.sch.uk/wp-content/uploads/2013/03/silver-star1.jpg'
            }, function(err, trophy) {
              enid.trophies.push(trophy);
              enid.save();
            });
          });
       });
    });
  });
});


