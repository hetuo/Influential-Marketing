const app = require('APP'), {env} = app
const debug = require('debug')(`${app.name}:auth`)
const passport = require('passport')
const User = require('APP/db/models/user')
const Influencer = require('APP/db/models/influencer')
const Brand = require('APP/db/models/brand')
const OAuth = require('APP/db/models/oauth')
const auth = require('express').Router()

/*************************
 * Auth strategies
 *
 * The OAuth model knows how to configure Passport middleware.
 * To enable an auth strategy, ensure that the appropriate
 * environment variables are set.
 *
 * You can do it on the command line:
 *
 *   FACEBOOK_CLIENT_ID=abcd FACEBOOK_CLIENT_SECRET=1234 npm start
 *
 * Or, better, you can create a ~/.$your_app_name.env.json file in
 * your home directory, and set them in there:
 *
 * {
 *   FACEBOOK_CLIENT_ID: 'abcd',
 *   FACEBOOK_CLIENT_SECRET: '1234',
 * }
 *
 * Concentrating your secrets this way will make it less likely that you
 * accidentally push them to Github, for example.
 *
 * When you deploy to production, you'll need to set up these environment
 * variables with your hosting provider.
 **/

// Facebook needs the FACEBOOK_CLIENT_ID and FACEBOOK_CLIENT_SECRET
// environment variables.
OAuth.setupStrategy({
  provider: 'facebook',
  strategy: require('passport-facebook').Strategy,
  config: {
    clientID: env.FACEBOOK_CLIENT_ID,
    clientSecret: env.FACEBOOK_CLIENT_SECRET,
    callbackURL: `${app.rootUrl}/api/auth/login/facebook`,
  },
  passport
});

// Google needs the GOOGLE_CONSUMER_SECRET AND GOOGLE_CONSUMER_KEY
// environment variables.
OAuth.setupStrategy({
  provider: 'google',
  strategy: require('passport-google-oauth').Strategy,
  config: {
    consumerKey: env.GOOGLE_CONSUMER_KEY,
    consumerSecret: env.GOOGLE_CONSUMER_SECRET,
    callbackURL: `${app.rootUrl}/api/auth/login/google`,
  },
  passport
});

// Github needs the GITHUB_CLIENT_ID AND GITHUB_CLIENT_SECRET
// environment variables.
OAuth.setupStrategy({
  provider: 'github',
  strategy: require('passport-github2').Strategy,
  config: {
    clientID: env.GITHUB_CLIENT_ID,
    clientSecrets: env.GITHUB_CLIENT_SECRET,
    callbackURL: `${app.rootUrl}/api/auth/login/github`,
  },
  passport
});

// Other passport configuration:

passport.serializeUser((user, done) => {
  done(null, user)
});

passport.deserializeUser((user, done) => {
    if (user != null) {
      if (user.usertype == 'regular_user') {
        User.findById(user.id)
        .then(user => {
          console.log('deserialize did ok user.id=%d', user.id)
          done(null, user)
        })
        .catch(err => {
          console.log('deserialize did fail err=%s', err)
          done(err)
        })
      } else if (user.usertype == 'influencer') {
        Influencer.findById(user.id)
          .then(user => {
            console.log('deserialize did ok user.id=%d', user.id)
            done(null, user)
          })
          .catch(err => {
            console.log('deserialize did fail err=%s', err)
            done(err)
          })
      } else if (user.usertype == 'director') {
        Influencer.findById(user.id)
          .then(user => {
            console.log('deserialize did ok user.id=%d', user.id)
            done(null, user)
          })
          .catch(err => {
            console.log('deserialize did fail err=%s', err)
            done(err)
          })
      } else if (user.usertype == 'brand_account') {
        Brand.findById(user.id)
          .then(user => {
            console.log('deserialize did ok user.id=%d', user.id)
            done(null, user)
          })
          .catch(err => {
            console.log('deserialize did fail err=%s', err)
            done(err)
          })
      }
    }
  }
)

// passport-local is updated 1 year ago
// passport.use(new (require('passport-local').Strategy) (
//   (email, password, done) => {
//     debug('will authenticate user(email: "%s")', email)
//     User.findOne({where: {email}})
//       .then(user => {
//         if (!user) {
//           debug('authenticate user(email: "%s") did fail: no such user', email)
//           return done(null, false, { message: 'Login incorrect' })
//         }
//         return user.authenticate(password)
//           .then(ok => {
//             if (!ok) {
//               debug('authenticate user(email: "%s") did fail: bad password')
//               return done(null, false, { message: 'Login incorrect' })
//             }
//             debug('authenticate user(email: "%s") did ok: user.id=%d', user.id)
//             done(null, user)
//           })
//       })
//       .catch(done)
//   }
// ))

auth.get('/whoami', (req, res) => {
  console.log("whoami backend req:", req.user.usertype);
  if (req.user != null) {
    let usertype = req.user.usertype;
    if (usertype == 'regular_user') {
      User.findOrCreate({
        where:{ email : req.user.email}
      })
      .then(returnedUser => {
        console.log("auth.js whoami: ", returnedUser[0]);
        res.send(returnedUser[0])
      })
    } else if (usertype == 'influencer') {
      Influencer.findOrCreate({
        where:{ email : req.user.email}
      })
      .then(returnedUser => res.send(returnedUser[0]))
    } else if (usertype == 'director') {
      Influencer.findOrCreate({
        where:{ email : req.user.email}
      })
      .then(returnedUser => res.send(returnedUser[0]))
    } else if (usertype == 'brand_account') {
      Brand.findOrCreate({
        where:{ email : req.user.email}
      })
      .then(returnedUser => res.send(returnedUser[0]))
    }
  }
})

// login, i.e. "you remember `me`, right?"
auth.put('/regularlogin', (req, res, next)=>{
  console.log('sessionID',req.sessionID)
  User.findOne({
    where:{
      email:req.body.email
    }
  }).then(user=>{
      if(!user) {
        res.sendState(401)
      }else if (req.body.password != user.password_digest){
        res.sendState(401)
      }
      else{
        return user.update({
          email: req.body.email,
          password: req.body.password,
          session_id: req.sessionID
        })
      }
    }).then(updated=>{
      req.logIn(updated, err=>{
          if(err) return next(err);
          res.json(updated)
        })
    })
    .catch(next)
})

auth.put('/influencerlogin', (req, res, next)=>{
  console.log('sessionID',req.sessionID)
  Influencer.findOne({
    where:{
      email:req.body.email
    }
  }).then(user=>{
      if(!user) {
        res.sendState(401)
      }else if (req.body.password != user.password_digest || user.usertype != 'influencer'){
        res.sendState(401)
      }
      else{
        return user.update({
          email: req.body.email,
          password: req.body.password,
          session_id: req.sessionID
        })
      }
    }).then(updated=>{
      req.logIn(updated, err=>{
          if(err) return next(err);
          res.json(updated)
        })
    })
    .catch(next)
})

auth.put('/brandlogin', (req, res, next)=>{
  console.log('sessionID',req.sessionID)
  Brand.findOne({
    where:{
      email:req.body.email
    }
  }).then(user=>{
      if(!user) {
        res.sendState(401)
      } else if (req.body.password != user.password_digest) {
        res.sendState(401)
      }
      else{
        return user.update({
          email: req.body.email,
          password: req.body.password,
          session_id: req.sessionID
        })
      }
    }).then(updated=>{
      req.logIn(updated, err=>{
          if(err) return next(err);
          res.json(updated)
        })
    })
    .catch(next)
})

auth.put('/directorlogin', (req, res, next)=>{
  console.log('sessionID',req.sessionID)
  Influencer.findOne({
    where:{
      email:req.body.email
    }
  }).then(user=>{
      if(!user) {
        res.sendState(401)
      } else if (req.body.password != user.password_digest || user.usertype != 'director') {
        res.sendState(401)
      }
      else{
        return user.update({
          email: req.body.email,
          password: req.body.password,
          session_id: req.sessionID
        })
      }
    }).then(updated=>{
      req.logIn(updated, err=>{
          if(err) return next(err);
          res.json(updated)
        })
    })
    .catch(next)
})

auth.put('/sociallogin', (req, res, next)=>{
  console.log("sociallogin auth:", req.body);
  User.findOrCreate({
    where: {
      email: req.body.email
    }
  }).spread((user, created)=>{
    console.log('user: ', user);
    return user.update(req.body)
  }).then(updated=>{
    req.logIn(updated, err=>{
      if(err) return next(err)
      res.json(updated)
    })
  })
})

auth.put('/regularsignup', (req, res, next)=>{
  console.log('body',req.body);
  User.findOrCreate({
    where: {
      email: req.body.email
    }
  }).spread((user, created)=>{
    console.log('user: ', user);
    return user.update(req.body)
  }).then(updated=>{
    req.logIn(updated, err=>{
      if(err) return next(err)
      res.json(updated)
    })
  })
})

auth.put('/influencersignup', (req, res, next)=>{
  console.log('body',req.body);
  Influencer.findOrCreate({
    where: {
      email: req.email
    }
  }).spread((user, created)=>{
    console.log('influencer: ', user)
    return user.update(req.body)
  }).then(updated=>{
    req.logIn(updated, err=>{
      if(err) return next(err)
      res.json(updated)
    })
  })
})

auth.put('/brandsignup', (req, res, next)=>{
  console.log('body',req.body);
  Brand.findOrCreate({
    where: {
      email: req.email
    }
  }).spread((user, created)=>{
    console.log('brand: ', user)
    return user.update(req.body)
  }).then(updated=>{
    req.logIn(updated, err=>{
      if(err) return next(err)
      res.json(updated)
    })
  })
})
//this route is probably out dated
auth.post('/:strategy/login', (req, res, next) =>
  passport.authenticate(req.params.strategy, {
    successRedirect: '/'
  })(req, res, next)
)

auth.post('/logout', (req, res, next) => {
  console.log(req.user)
  User.emptySessionId(req.user.id)
    .then(()=>{
      req.session.destroy();
      req.logout()
      res.redirect('/api/auth/whoami')
    })
})

module.exports = auth
