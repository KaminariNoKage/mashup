var Mods = require('../models/vitube_models.js')
	, User = Mods[0]
	, Project = Mods[1]
	, Images = Mods[2];
/*
 * GET home page.
 */

exports.index = function(req, res){
	active = req.session.user;
	if (active == null){
		res.redirect('/login');
	}
	else{
		User.find({fb_id: active.fb_id}).exec(function(err, users) {
			curuser = users[0]
			, actname = curuser.name
			, actid = curuser.id;
			//Get The projects of the User
			Project.find({authorid: actid}).exec(function(err, my_proj){
				//Get the public projects
				Project.find().sort('-date').exec(function(err, pubproj){
					res.render('index', {title: 'ViTube', name: actname, my_proj: my_proj, pubproj: pubproj});
				});
			});
		});
	};
};