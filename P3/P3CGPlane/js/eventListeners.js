function onResize(){
	'use strict';

	resize();
}

function onKeyDown(e){
	'use strict';

	switch(e.keyCode){
		
		case 71: //G
		case 103: //g
			materialSwitch = true;
			break;	

		case 76: //L
		case 108: //l
			lightStatus = !lightStatus;
			materialSwitch = true;
			break;	

		case 78: //N
		case 110: //n
			switchLightNumber = 0;
            canUpdateLight = true;
			break;	

		case 37: //Left Arrow
			rotationSpeedZ = rotationSpeed;
			break;
		case 38: //Up Arrow
			rotationSpeedY = -rotationSpeed;
			break;
		case 39: //Right Arrow
			rotationSpeedZ = -rotationSpeed;
			break;
		case 40: //Down Arrow
			rotationSpeedY = rotationSpeed;
			break;
				
		case 49: //1
            switchLightNumber = 1;
            canUpdateLight = true;
			break;

		case 50: //2
            switchLightNumber = 2;
            canUpdateLight = true;
			break;

		case 51: //3
            switchLightNumber = 3;
            canUpdateLight = true;
			break;

		case 52: //4
            switchLightNumber = 4;
            canUpdateLight = true;
			break;
		
		//Not Necessary
		case 69: //E
		case 101: //e
			switchwireframe=true;
			break;
		case 70://F
		case 102://f
			moveplane=true;
			break;
	}
}

function onKeyUp(e){
	'use strict';

	switch(e.keyCode){
		
		case 37: //Left Arrow
			rotationSpeedZ = 0;
			break;
		case 38: //Up Arrow
			rotationSpeedY = 0;
			break;
		case 39: //Right Arrow
			rotationSpeedZ = 0;
			break;
		case 40: //Down Arrow
			rotationSpeedY = 0;
			break;
		
		//Not Necessary
		case 70://F
		case 102://F
			moveplane=false;
			break;
	}	
}
