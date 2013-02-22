$(document).ready(function(){

	$("#submit").click(function(){
		var name = $("#projname").val()
			, description = $("#descript").val()
			, priv = $("#priv").val();
		$.post("/make_project", {pname: name, description: description, priv: priv});
	});

	//EDIT THE PROJECT

	var emopen = false;
	$("#editmode").hide();

	$("#editproj").click(function(){
		if (emopen == false){
			$('#editmode').show();
			emopen = true;
		}
		else{
			$('#editmode').hide();
			emopen = false;
		};
	});

	$('#edit_update').click(function(){
		var curid = $("#chng_name").attr("class")
			, newname = $("#chng_name").val()
			, des = $("#description").val();
		$.post("/edit_project", {curid: curid, name: newname, des: des});
	});

	$('#delete').click(function(){
		if(confirm("Do you want to delete this project?")){
			var projectid = $("#delete").attr("class");
			$.post("/delete_project", {proj_id: projectid});
		}
	});

	//MAKING NEW STUFF

	$("#addimg").click(function(){
		var proj_id = $("#addimg").attr("class")
			, new_url = $("#img_url").val();
		if (new_url == ''){
			alert("Please enter valid url");
		}
		else{
			$.post("/add_image", {actid: proj_id, url: new_url});
		};
	});

	$("#make_new").click(function(){
		window.location = "/new_project";
	});

});