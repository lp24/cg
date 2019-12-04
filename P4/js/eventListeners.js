function onResize(){
	'use strict';

	resize();
}

function onKeyDown(e){
	'use strict';

	switch(e.keyCode){
		
        case 80: //P
		case 112: //p
            //Turn On/Off PointLight
            lightnumber = 1;
            updatelight = true;
			break;
        
        case 68: //D
		case 100: //d
            //Turn On/Off DirectionalLight
            lightnumber = 0;
            updatelight = true;
			break;   
        
        case 76: //L
        case 108: //l
            //Toggle Material Switch
            switchlightcalculus = true;
            break;
            
        case 87: //W
		case 119: //w
            //Toggle Material Wireframe Value Switch
            switchwireframe = true;
			break;
            
        case 66: //B
		case 98: //b
            //Change Ball Acceleration
            ball.userData.acc = -ball.userData.acc;
			break;   
        
        case 83: //S
        case 115: //s
            //Toggle Pause Switch
            switchpause = true;
            break;
        
        case 82: //R
        case 114: //r
            //Toogle Reset Switch
            reset = true;
            break;
	}
}

