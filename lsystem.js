/*
 * L-Systems class
 */
function LSystem (context) {

    this.line_length = 5;
    this.angle = 90;
    this.rules = [new Rule("F F+F-F-F+F")];
    this.initial_string = "F";
    this.current_string = "F";
    this.current_iteration = 0;
    this.context = context;
    this.starting_angle = 90;
    this.string_pos = 0;
    this.direction = this.starting_angle;
    
    this.x = 90;
    this.y = 90;

	this.stack = new Array();
    
    /*
     * Parse the rules from the HTML 
     */
    this.parse_rules = function() {
    
        this.rules = []
        for(i=1; i<=current_rule; i++) {
            name = "rule"+i;
            r = new Rule(document.getElementById(name).value);
            this.rules.push(r);
        }
        
    }
    
    /*
     * Read the parameters from the HTML page.
     */
    this.get_params = function() {
        this.line_length = document.getElementById("length").value;
        this.angle = parseInt(document.getElementById("angle").value);
        this.starting_angle = parseInt(document.getElementById("starting_angle").value);
        this.initial_string = document.getElementById("initial_string").value;
        this.current_string = document.getElementById("initial_string").value;
        this.x = parseInt(document.getElementById("x").value);
        this.y = parseInt(document.getElementById("y").value);
        this.current_iteration = 0;
        this.string_pos = 0;
        this.direction = this.starting_angle;
        this.parse_rules();
    }
    
    /*
     * Produce the next string from the current string.
     */
    this.iterate = function() {
    
        new_string = "";
        
        for(i=0; i<this.current_string.length; i++) {
            for(j=0; j<this.rules.length; j++) {
            
                if(this.current_string.charAt(i) == this.rules[j].target) {
                    new_string += this.rules[j].pattern;
                }
                if(this.current_string.charAt(i) == "-" || this.current_string.charAt(i) == "+" || 
                    this.current_string.charAt(i) == "[" || this.current_string.charAt(i)  == "]" ) {
                    new_string += this.current_string.charAt(i);
                    break;
                }
            }

        }
        this.current_string = new_string;
        this.current_iteration += 1;
        
        document.getElementById("current_string").value = new_string;
    }
    
    
    /*
     * Draw a specific iteration.
     */
    this.draw_iteration = function(it) {
        this.current_string = this.initial_string;
        this.current_iteration = 0;
        this.string_pos = 0;
        
        while(this.current_iteration < it) {
            this.iterate();
        }
        this.draw(15);
    }
    
    
    /*
     * Draw the current iteration.
     */
    this.draw = function(steps) {

        for (i=0; i<steps; i++) {
        	
        	if(this.string_pos >= this.current_string.length) {
        		return;
        	}

            this.context.moveTo(this.x, this.y);
            c = this.current_string.charAt(this.string_pos++); 
            
            switch(c) {
            	
            	case '+':
            		this.direction += this.angle;
            		break;
            	case '-':
            		this.direction -= this.angle;
            		break;
            	case '[':
            		this.stack.push(new Position(this.x, this.y, this.direction));
            		break;
            	case ']':
            		p = this.stack.pop();
            		this.x = p.x;
            		this.y = p.y;
            		this.direction = p.angle;
            		this.context.moveTo(this.x, this.y);
            	case 'F':
            	case 'A':
            	case 'B':
            		this.x += Math.sin(degToRad(this.direction)) * this.line_length;
	                this.y += Math.cos(degToRad(this.direction)) * this.line_length;
	                
	                
	                this.context.lineTo(this.x, this.y);
	                this.context.stroke();
	                break;
            	default:
            		break;
            	
            }
        }
    }
}

function Position(x, y, angle) {
	this.x = x;
	this.y = y;
	this.angle = angle;
}
