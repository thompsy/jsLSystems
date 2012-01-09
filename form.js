//Contains all code for handling the form stuff

$(function() {

    // Prevent the control dialog from closing
    $(function() {
        $("#dialog").dialog({
            width: 270,
            closeOnEscape: false,
            position: [0,0],
	    draggable: false,
	    resizable: false,
            open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); }
        });
    });

    /*
     * Setup the sliders
     */
    $('#length').slider({
	min: 1,
	max: 10,
	value: 3,
	change: function() {
	    $('#length_value').html($(this).slider("value"));
	}
    });

    $('#iterations').slider({
	min: 1,
	max: 15,
	value: 4,
	change: function() {
	    $('#iterations_value').html($(this).slider("value"));
	}
    });

    $('#starting_angle').slider({
	min: 0,
	max: 360,
	value: 90,
	change: function() {
	    $('#starting_angle_value').html($(this).slider("value"));
	}
    });

    $('#angle').slider({
	min: 1,
	max: 360,
	value: 90,
	change: function() {
	    $('#angle_value').html($(this).slider("value"));
	}
    });

    //TODO: start these in the middle again
    $('#xpos').slider({
	min: 1,
	max: $(window).width(),
	//value: $(window).width()/2,
	value: 400,
	change: function() {
	    $('#xpos_value').html($(this).slider("value"));
	}
    });

    $('#ypos').slider({
	min: 1,
	max: $(window).height(),
	//value: $(window).height()/2,
	value: 200,
	change: function() {
	    $('#ypos_value').html($(this).slider("value"));
	}
    });


    $('#length_value').html($('#length').slider("value"));
    $('#iterations_value').html($('#iterations').slider("value"));
    $('#starting_angle_value').html($('#starting_angle').slider("value"));
    $('#angle_value').html($('#angle').slider("value"));
    $('#xpos_value').html($('#xpos').slider("value") + "px");
    $('#ypos_value').html($('#ypos').slider("value") + "px");

})



function edit_rule(id) {
    if($('#rule'+id+"_edit").html() == "done") {
	$('#rule'+id+"_edit").html("edit");
	$('#rule'+id+"_pattern").attr('disabled', "true");
    }
    else {
	$('#rule'+id+"_pattern").val("test");
	$('#rule'+id+"_pattern").removeAttr('disabled');
	$('#rule'+id+"_edit").html("done");
    }
}