$(document).ready(function(){

	$("#submit").click(function(){
		var name = $("#projname").val()
			, description = $("#descript").val();
		$.post("/project/make", {pname: name, description: description},
			function(){
				window.location.href = '/';
			});
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
		$.post("/project/edit", {curid: curid, name: newname, des: des},
			function(){
				location.reload(true);
			});
		return false;
	});

	$('#delete').click(function(){
		if(confirm("Do you want to delete this project?")){
			var projectid = $("#delete").attr("class");
			$.post("/project/delete/project", {proj_id: projectid},
				function(){
					window.location.href = '/';
				});
			return false;
		}
	});

	$(".img_delete").click(function(){
		var tobedel = this.id;
		console.log(tobedel);
		$.post("/project/delete/image", {img_id: tobedel}, 
			function(){
				location.reload(true);
			});
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
			$.post("/add_image", {actid: proj_id, url: new_url}, function(){
				location.reload(true);
			});
			return false;
		};
	});

	$("#make_new").click(function(){
		window.location = "/new_project";
	});

});