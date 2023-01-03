const session = require('express-session');
 const MongoStore = require('connect-mongo');
module.exports = app => {
      app.set("trust proxy", 1)
      app.use(
        session({
      
       secret: process.env.SESS_SECRET || 'my super secret',
       resave: true,
       saveUninitialized: true,
       store: MongoStore.create({ 
         mongoUrl: 'mongodb://127.0.0.1:27017/basic-auth', 
         ttl: 24 * 60 * 60 
     }),
       cookie: {        
         maxAge: 24 * 60 * 60 * 1000 
       }
     })
    )
  }