var Mods = require('../models/vitube_models.js')
	, User = Mods[0]
	, Project = Mods[1]
	, Images = Mods[2];


exports.login = function(req, res){
	req.facebook.api('/me', function(err, data) {
		var id = data.id
			, name = data.name;
		User.find({fb_id: id}).exec(function (err, docs) {
			//Checking to see if the user id already exists (once logged in)
			if (docs[0] == null){
				var newuser = new User({name: name, fb_id: id, project_list: []});
				console.log('New user made')
				newuser.save(function (err) {
				if (err)
					return console.log("Error: We couldn't save the new User");
				//Setting the user session to the current user if new
				req.session.user = newuser;
				//Redirecting to home for more fun stuff
				res.redirect('/');
				});
			}
			else {
				//docs[0].remove();
				//Setting the session to the current, already logged user
				req.session.user = docs[0];
				res.redirect('/');
			};
		});
	});
};

exports.newproj = function(req, res){
	res.render('newproj', {title: 'ViTube', name: 'New Project', maker: req.session.user.name});
};

exports.makenewproj = function(req,res){
	var authorid = req.session.user._id
		, authorname = req.session.user.name
		, pname = req.body.pname
		, time = Date.now()
		, des = req.body.description
		, disp = 'http://upload.wikimedia.org/wikipedia/commons/thumb/2/28/X_symbol_from_X-Men_logo.svg/239px-X_symbol_from_X-Men_logo.svg.png';
	var newproj = Project({authorid: authorid, authorname: authorname, pname: pname, date: time, description: des, display_url: disp});
	console.log(newproj);
	newproj.save(function(err) {
		if (err)
			return console.log("Unable to save New Project", err);
	res.redirect('/');
	});
};

exports.projpage = function(req, res){
	var actid = req.session.user._id;
	Project.find({authorid: actid}).sort().exec(function(err, my_proj){
		if (err)
			return console.log("Unable to Get All the Projects of the User")
		
		var allproj = my_proj;

		Project.find({'_id': req.params.project}).sort().exec(function(err, docs){
			if (err)
				return console.log("Unable to Get Project Page");

			var proj = docs[0];
			
			Images.find({'proj_id':req.params.project}).sort('index_pos').exec(function (err, images) {
				if (err)
					return console.log("Unable to Find Images");
				// send it back
				res.render('projpg', {title: 'ViTube', name: proj.pname, my_proj: allproj, maker: req.session.user.name, proj_id: req.params.project, description: proj.description, imglist: images});
			});
		});
	});
};

exports.projedit = function(req,res){
	console.log(req.body);
	Project.find({_id: req.body.curid}).sort().exec(function(err, docs){
		console.log(docs[0]);
		var proj = docs[0]
			, des = proj.description
			, newname = req.body.name;

		if (req.body.des != ""){
			des = req.body.des;
		};

		Project.update({_id: req.body.curid}, {pname: newname, description: des}, function(err, edits){
			if (err)
				return console.log("Error in Editing Project");
			res.redirect('/myproject/' + req.body.curid);
		});
	});
};

exports.addimg = function(req,res){
	console.log(req.body);
	var project_id = req.body.actid
		, newurl = req.body.url;
	Images.find({'proj_id': project_id}).sort('index_pos').exec(function(err, imgs){	
		var newimg = Images({index_pos: imgs.length, url: newurl, proj_id: project_id});
		newimg.save(function(err) {
			if (err)
				return console.log("Unable to save New Image", err);
			Project.update({'_id': project_id}, {display_url: newurl}, function(err, nu){
				if (err)
					return console.log("Error in Updating Project");
				res.redirect('/myproject/' + project_id);
			});
		});
	});
};

exports.deleteproj = function(req, res){
	var proj_id = req.body.proj_id;
	Project.find({'_id': proj_id}).sort().exec(function(err, docs){
		docs[0].remove();
		if (err)
			return console.log("Error in removing project");
		res.redirect('/');
	});
};

exports.visit = function(req, res){
	var actid = req.session.user._id;
	Project.find({authorid: actid}).sort().exec(function(err, my_proj){
		if (err)
			return console.log("Unable to Get All the Projects of the User")
		
		var allproj = my_proj;

		Project.find({'_id': req.params.project}).sort().exec(function(err, docs){
			if (err)
				return console.log("Unable to Get Project Page");

			var proj = docs[0];
			
			Images.find({'proj_id':req.params.project}).sort('index_pos').exec(function (err, images) {
				if (err)
					return console.log("Unable to Find Images");
				// send it back
				res.render('publicpg', {title: 'ViTube', name: proj.pname, my_proj: allproj, maker: proj.authorname, proj_id: req.params.project, description: proj.description, imglist: images});
			});
		});
	});
};