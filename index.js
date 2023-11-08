const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./src/main');
const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json())

app.use('/', (req, res, next)=>{
	res.header('Access-Control-Allow-Origin', '*')
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	next()
}, router)

mongoose.connect('mongodb+srv://USER_DANILO:maceio123@cluster0.zzmnspx.mongodb.net/flutter_armazem?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then(async () => console.log('Successful connection!'))
.catch(err => console.log('Connection error!', err))

// app.listen(PORT || 5000, ()=>{
// 	console.log(`Running at port: ${PORT}`)
// })
exports.app = onRequest(app);