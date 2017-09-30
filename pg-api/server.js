var compression = require('compression');
var express = require('express');
var cors = require('cors');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler')
var pg = require('pg');

const PORT = 3000;

let pool = new pg.Pool({
    database: 'InfluentialDB',
    user: 'Alex_Guo',
    password: '4AbcJMz9!',
    port: 5432,
    ssl: false,
    max: 20,
    min: 4,
    idleTimeoutMillis: 1000
});

var helmet = require('helmet');

var app = express();

app.use(compression());

app.use(helmet());

app.use(cors())

if (app.get('env') === 'development') {
  app.use(errorHandler());
  console.log('error Handler loaded!');
}

app.use(favicon(path.join(__dirname, 'public', 'Influencer-Marketing-API.ico')));
app.use(logger('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use( (req, res, next ) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/users', function(request, response){
    pool.connect(function(err,db,done){
        if(err){
            console.error(err);
            response.status(500).send({ 'error' : err});
        } else{
            db.query('SELECT * FROM "Influencer"."User"', function(err, table){
                done();
                if(err){
                    return response.status(400).send({error:err})
                } else
                {
                    return response.status(200).send(table.rows)
                }
            })
        }
    })
});



app.post('/api/new-user', function( request, response) {
    var username = request.body.username;
    var password = request.body.password;

    var id = request.body.id;;

    let user_values = [username, password, id];

    pool.connect((err, db, done) => {

    done();
    if(err){
        console.error('error open connection', err);
        return response.status(400).send({error: err});
    }
    else {
        db.query('INSERT INTO "Influencer"."User"( username, password, id ) VALUES ($1,$2,$3)',
            [...user_values], (err, table) => {
            if(err) {
                console.error('error running query', err);
                return response.status(400).send({error: err});
            }
            else {
                console.log('Data Inserted: ' + id );
                response.status(201).send({ message: 'Data Inserted successful' + id})
            }
        })
    }
    });

    console.log(request.body);
});


app.delete('/api/remove/:id', function( request, response){
    var id = request.params.id;

    pool.connect(function(err,db,done){
        if(err){
            return response.status(400).send(err)
        } else{
            db.query('DELETE FROM "Influencer"."User" WHERE ID = $1', [Number(id)], function(err, result){
                done();
                if(err){
                    return response.status(400).send(err)
                } else
                {
                    return response.status(200).send({message:'delete record successful'})
                }
            })
        }
    })
    console.log(id);
});


app.listen( PORT, () => console.log('Listening on port' + PORT) );

module.exports = app;
