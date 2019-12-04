'use strict'

function onResize(){

	resize();
}

function onKeyDown(e){

	switch(e.keyCode){
		
        case 80: //P
		case 112: //p
            pause=!pause;
			break;
			
		case 82: //R
        case 114: //r
            //reset
            reset=true;
            break;
	
		case 37: //Left Arrow
			moveLeft= true;
			break;
		
		case 38: //Up Arrow
			rotate = true;
			break;

		case 39: //Right Arrow
			moveRight = true;
			break;
			
		case 40: //Down Arrow
			moveDown = true;
			break;
	}
}


function onKeyUp(e){

	switch(e.keyCode){		
		case 37: //Left Arrow
			moveLeft = false;
			break;
		case 38: //Up Arrow
			rotate=false;
			break;
		case 39: //Right Arrow
			moveRight = false;
			break;
		case 40: //Down Arrow
			moveDown = false;
			break;
	}	
}
