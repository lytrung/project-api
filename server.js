var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cors = require('cors');

var Project = require('./project-model');

//setup database connection
var connectionString = 'mongodb://demo2admin:demo2password@cluster0-shard-00-00-1fbjw.mongodb.net:27017,cluster0-shard-00-01-1fbjw.mongodb.net:27017,cluster0-shard-00-02-1fbjw.mongodb.net:27017/portfolio?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';
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
  res.send('<h1>Testing is working</h1>')
})

app.use('/api', router);

router.get('/projects', function (req, res) {

	Project.find((err, projects) => {
	    if (err) return res.json({ success: false, error: err });
	    return res.json({ success: true, projects: projects });
	});
})

router.get('/projects/:id', function (req, res) {

	Project.findOne({id:req.params.id},(err, project) => {
	    if (err) return res.json({ success: false, error: err });
	    return res.json({ success: true, project: project });
	});
})

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

router.delete('/projects/:id', (req, res) => {

	Project.deleteOne({ id: req.params.id }, (err) => {
	  if (err) return res.json({ success: false, error: err });
	  return res.json({ success: true });
	});
});

router.put('/projects/:id', (req, res) => {

	Project.findOne({id:req.params.id}, (err, project) => {

		var {name, description } = req.body;
		project.name = name;
		project.description = description;
		
		project.save().then((project) => {
			if (err) return res.json({ success: false, error: err });
			return res.json({ success: true, project: project  });
		});
		
	});
});


// launch our backend into a port
const apiPort = 3001;
app.listen(apiPort, () => console.log('Listening on port '+apiPort));