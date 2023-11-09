const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./src/main');
const app = express();
require('dotenv').config();

app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json())

app.use('/', (req, res, next)=>{
	res.header('Access-Control-Allow-Origin', '*')
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	next()
}, router)

mongoose.connect(process.env.DATABASE_CONNECTION, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then(async () => console.log('Successful connection!'))
.catch(err => console.log('Connection error!', err))

app.listen(process.env.PORT , ()=>{
	console.log(`Running at port: ${process.env.PORT}`)
})