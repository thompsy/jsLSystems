var lsys;


function degToRad(deg) {
    return deg * Math.PI/180;
}


function Rule(string) {
    res = string.split(" ");
    this.target = res[0];
    this.pattern = res[1];
}




/*
 * Event Handlers.
 */
function onIterateButtonPress() {
    lsys.draw(15);
}


function onResetButtonPress() {
    reset();
}


function onStartButtonPress() {
	clear_canvas();
	lsys.get_params();
    lsys.draw_iteration(getSliderValue());
    
    
}

function onSliderChange(value) {
    document.getElementById("iterations").value = value;
}

function onResize(ui) {
	
	x = ui.width;
	y = ui.height;
	
	canvas = document.getElementById("canvas");
    canvas.width  = x - 100;
    canvas.height = y - 100;
    

	onLSystemChange();
}

function getSliderValue() {
	return $("#slider").slider("option", "value");
}


/*
 * Fill in the relevant form values for a given L-System.
 */
function onLSystemChange() {

    choice = parseInt(document.getElementById("lsystem").value);
    canvas = document.getElementById("canvas");
    
    // Koch curve
    if(choice == 1) {
        document.getElementById("length").value = "5";
        document.getElementById("angle").value = "90";
        document.getElementById("starting_angle").value = "90";
        document.getElementById("initial_string").value = "F";
        document.getElementById("current_string").value = "F";
        document.getElementById("x").value = 10;
        document.getElementById("y").value = canvas.height - 10;
        document.getElementById("max_iterations").value = "5";
        $("#slider").slider("option", "max", 10);
        
        remove_rules();
        add_rule("F F+F-F-F+F");
    }
    
    // Sierpinski triangle
    if(choice == 2) {
        document.getElementById("length").value = "3";
        document.getElementById("angle").value = "60";
        document.getElementById("starting_angle").value = "90";
        document.getElementById("initial_string").value = "A";
        document.getElementById("current_string").value = "A";
        document.getElementById("x").value = 10;
        document.getElementById("y").value = canvas.height - 10;
        document.getElementById("max_iterations").value = "6";
        $("#slider").slider("option", "max", 12);
        $("#slider").slider("option", "step", 2);
        
        remove_rules();
        add_rule("A B-A-B");
        add_rule("B A+B+A");
    }
    
    // Dragon curve
    if(choice == 3) {
        document.getElementById("length").value = "3";
        document.getElementById("angle").value = "90";
        document.getElementById("starting_angle").value = "90";
        document.getElementById("initial_string").value = "FX";
        document.getElementById("current_string").value = "FX";
        document.getElementById("x").value = canvas.width / 2;
        document.getElementById("y").value = canvas.height / 2;
        document.getElementById("max_iterations").value = "15";
        $("#slider").slider("option", "max", 20);
        
        remove_rules();
        add_rule("X X+YF");
        add_rule("Y FX-Y");
    }
    // Fractal Plant
    if(choice == 4) {
        document.getElementById("length").value = "1";
        document.getElementById("angle").value = "25";
        document.getElementById("starting_angle").value = "170";
        document.getElementById("initial_string").value = "X";
        document.getElementById("current_string").value = "X";
        document.getElementById("x").value = 100;
        document.getElementById("y").value = canvas.height - 10;
        document.getElementById("max_iterations").value = "11";
        //$("#slider").slider("option", "max", 11);
        
        remove_rules();
        add_rule("F FF");
        add_rule("X F-[[X]+X]+F[+FX]-X");
        //add_rule("X F-[F-F]");
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


function add_rule(rule_text) {
    current_rule += 1;
    name = "rule"+ current_rule;
    label = "Rule " + current_rule;

    newLabel = document.createElement("label");
    newLabel.setAttribute("for", name);
    newLabel.innerHTML = label;
    
    newInput = document.createElement("input");
    newInput.setAttribute("type", "text");
    newInput.setAttribute("value", rule_text);
    newInput.setAttribute("id", name);
    newInput.setAttribute("size", "30");
    
    br = document.createElement("br");
    
    document.getElementById("rules").appendChild(newLabel);
    document.getElementById("rules").appendChild(newInput);
    document.getElementById("rules").appendChild(br);
}

