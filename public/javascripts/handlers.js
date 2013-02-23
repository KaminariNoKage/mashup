$(document).ready(function(){

	$("#submit").click(function(){
		var name = $("#projname").val()
			, description = $("#descript").val()
			, priv = $("#priv").val();
		$.post("/project/make", {pname: name, description: description, priv: priv});
		return false;
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
		$.post("/project/edit", {curid: curid, name: newname, des: des});
		return false;
	});

	$('#delete').click(function(){
		if(confirm("Do you want to delete this project?")){
			var projectid = $("#delete").attr("class");
			$.post("/project/delete/project", {proj_id: projectid});
			return false;
		}
	});

	$(".img_delete").click(function(){
		var tobedel = $(".img_delete").attr("id");
		console.log(tobedel);
		$.post("/project/delete/image", {img_id: tobedel});
		return false;
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
			return false;
		};
	});

	$("#make_new").click(function(){
		window.location = "/new_project";
	});

});