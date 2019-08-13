const mongoose = require("mongoose");
var express = require('express');
var bodyParser = require('body-parser');
const logger = require('morgan');
var cors = require('cors');

const Project = require('./project-model');

//setup database connection
const connectionString = 'mongodb://demo2admin:demo2password@cluster0-shard-00-00-1fbjw.mongodb.net:27017,cluster0-shard-00-01-1fbjw.mongodb.net:27017,cluster0-shard-00-02-1fbjw.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';
mongoose.connect(connectionString,{ useNewUrlParser: true });
var  db = mongoose.connection;
db.once('open', () => console.log('Database connected'));
db.on('error', () => console.log('Database error'));


//setup express server
var app = express();
app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(logger('dev'));

//setup routes
var router = express.Router();
router.get('/testing', function (req, res) {
  res.send('Testing is working')
})

app.use('/api', router);

router.post('/projects', (req, res) => {

	var {name, description } = req.body;
	// console.log(req.body);
	var project = new Project();
	project.id = Date.now();
	project.name = name;
	project.description = description;
	
	project.save(err => {
	  	if (err) return res.json({ success: false, error: err });
	  	return res.json({ success: true, project: project });
	});
});


// launch our backend into a port
const apiPort = 3001;
app.listen(apiPort, () => console.log('Listen on port '+apiPort));