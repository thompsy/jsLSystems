var lsys;

/*
 * Convert a value in degrees into radians.
 */
function degToRad(deg) {
    return deg * Math.PI/180;
}

/*
 * A simple class to encapsulate a rule which is composed of target
 * character and a pattern with which to replace the target.
 */
function Rule(rule_id) {
    this.target = $('#rule'+rule_id+'_target').val();
    this.pattern = $('#rule'+rule_id+'_pattern').val();
}


/*
 * Event Handlers.
 */
function onStartButtonPress() {
    clear_canvas();
    lsys.get_params();
    lsys.draw_iteration(getSliderValue());
}

function onResize(ui) {
    x = ui.width;
    y = ui.height;

    canvas = document.getElementById("canvas");
    canvas.width  = x - 100;
    canvas.height = y - 100;

    onLSystemChange();
}

function onWindowResize() {
    y = $(window).height();
    x = $(window).width();

    canvas.height = y;
    canvas.width = x;
}


function getSliderValue() {
    return $("#iterations").slider("option", "value");
}


/*
 * Fill in the relevant form values for a given L-System.
 */
//TODO: set better slider steps
function onLSystemChange() {

    choice = parseInt(document.getElementById("lsystem").value);
    canvas = document.getElementById("canvas");

    // Koch curve
    if(choice == 1) {
	$('#length').slider("value", "5");
	$('#angle').slider("value", "90");
	$('#starting_angle').slider("value", "90");

        document.getElementById("initial_string").value = "F";
        document.getElementById("current_string").value = "F";
        document.getElementById("max_iterations").value = "5";

        remove_rules();
        add_rule("F", "F+F-F-F+F");
    }

    // Sierpinski triangle
    if(choice == 2) {
	$('#length').slider("value", "3");
	$('#angle').slider("value", "60");
	$('#starting_angle').slider("value", "90");

        document.getElementById("initial_string").value = "A";
        document.getElementById("current_string").value = "A";
        document.getElementById("max_iterations").value = "6";

        $("#slider").slider("option", "max", 12);
        $("#slider").slider("option", "step", 2);

        remove_rules();
        add_rule("A", "B-A-B");
        add_rule("B", "A+B+A");
    }

    // Dragon curve
    if(choice == 3) {
	$('#length').slider("value", "3");
	$('#angle').slider("value", "90");
	$('#starting_angle').slider("value", "90");

        document.getElementById("initial_string").value = "FX";
        document.getElementById("current_string").value = "FX";
        document.getElementById("max_iterations").value = "15";

        remove_rules();
        add_rule("X", "X+YF");
        add_rule("Y", "FX-Y");
    }
    // Fractal Plant
    if(choice == 4) {
	$('#length').slider("value", "1");
	$('#angle').slider("value", "25");
	$('#starting_angle').slider("value", "170");

        document.getElementById("initial_string").value = "X";
        document.getElementById("current_string").value = "X";
        document.getElementById("max_iterations").value = "11";

        remove_rules();
        add_rule("F", "FF");
        add_rule("X", "F-[[X]+X]+F[+FX]-X");
        //add_rule("X", "F-[F-F]");
    }

    lsys.get_params();
    reset();
}



function new_lsystem() {
    if (canvas.getContext("2d")) {
        context = canvas.getContext("2d");
        lsys = new LSystem(context);
    }
}


function init() {
    reset();
    onWindowResize();
    new_lsystem();
    onLSystemChange();
    setInterval(update, 33);
}

function update() {
    lsys.draw(15);
}



function clear_canvas() {
    canvas = document.getElementById("canvas");
    canvas.width  = canvas.width;

}


/*
 * Reset the canvas
 */
function reset() {
    clear_canvas();
    /*
      s = $('#slider').slider();
      s.slider('value',0);
    */
}




/*
 * Code for modifying the rules.
 */

var current_rule = 2;
function remove_rules() {
    current_rule = 0;
    node = document.getElementById("rules");
    if (node.hasChildNodes()) {
        while (node.childNodes.length >= 1 ) {
            node.removeChild(node.firstChild );
        }
    }
}

function add_rule(target, pattern) {
    current_rule += 1;
    name = "rule"+ current_rule;
    label = "Rule " + current_rule;

    $('<div class="rule" id="'+current_rule+'">').appendTo('#rules');
        
    new_target = document.createElement("input");
    new_target.setAttribute("type", "text");
    new_target.setAttribute("value", target);
    new_target.setAttribute("id", name+"_target");
    new_target.setAttribute("size", "1");
    $('#'+current_rule).append(new_target);

    $('#'+current_rule).append('<div class="sep">=></div>');

    new_pattern = document.createElement("input");
    new_pattern.setAttribute("type", "text");
    new_pattern.setAttribute("value", pattern);
    new_pattern.setAttribute("id", name+"_pattern");
    new_pattern.setAttribute("size", "10");
    $('#'+current_rule).append(new_pattern);

    $('#'+current_rule).append('<a href="#" title="remove" class="edit" id="rule'+current_rule+'_remove">remove</a>');
    $('#'+current_rule).append('<a href="#" title="edit" class="edit" onClick="edit_rule('+current_rule+');" id="rule'+current_rule+'_edit">edit</a>');
}

