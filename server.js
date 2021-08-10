const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'vaishali',
    password : '',
    database : 'smart-brain'
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

/*const database = {
	users : [
	{
		id: "1234",
		name: 'Vaishali',
		email: 'vpehere@gmail.com',
		password: 'cookies',
		entries: 5,
		joined: new Date()

	},
	{
		id: "5678",
		name: 'Ashok',
		email: 'pehere@gmail.com',
		password: 'bananas',
		entries: 0,
		joined: new Date()

	}
	],
	login : [
	{
		id: 200,
		hash: '',
		email: 'vpehere@gmail.com'
	}
	]
}*/
// -->res = this is working
app.get('/', (req, res) => {
	//res.send(database.users);
})
// /signin --> POST = success/fail
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)});

// /register --> POST = user
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

// /profile/:userid --> GET = user
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})
// /image --> PUT = user
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})


app.listen(3001, () => {
	console.log('app is runing on port 3001');
})

