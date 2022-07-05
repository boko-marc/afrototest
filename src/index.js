require('dotenv').config()
// application
const app = require('./app')
// connect to database
const db = require('./Database');
// listening port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port url http://localhost:${PORT}.`);
});

// insert super admin in database
const user = require('../src/Modeles/users')
function initial() {
    user.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new user({
          name: 'Admin',  
          email: "admin@gmail.com",
          password: 123456789,
          role: 1,
          birthdate: '05-07-2022',
          bio: 'is admin'
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added Admin to user collection");
        });
    }
})
};
initial()