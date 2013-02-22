var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	// Somehow worked
});

var userSchema = mongoose.Schema({
	name: String,
	fb_id: String
});

var projectSchema = mongoose.Schema({
	authorid: String,
	authorname: String,
	pname: String,
	date: String,
	description: String,
	display_url: String
});

var imageSchema = mongoose.Schema({
	index_pos: String,
	url: String,
	proj_id: String
});

var User = mongoose.model('User', userSchema);
var Project = mongoose.model('Project', projectSchema);
var Images = mongoose.model('Images', imageSchema);
module.exports = [User, Project, Images];