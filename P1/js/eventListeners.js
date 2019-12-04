function onResize(){
	'use strict';

	/* Check on function createCamera() viewSize is the same (it must be!) */
	resize();
}

function onKeyDown(e){
	'use strict';

	switch(e.keyCode){
		
		/*******************************************************************/
		/*                                                                 */
		/*                        WireFrame  Toogle                        */
		/*                                                                 */
		/*******************************************************************/

		/* After pressing 'a' or 'A', we change the wireFrameSwitch, so    */
		/* that in the next update it toogles between wireframe and 	   */
		/* non-wireframe display.										   */

		case 65: //A
		case 97: //a
			wireFrameSwitch = true;
			break;

		case 37: //Left Arrow
			chair.userData.RotateLeft = true;
			break;
		case 38: //Up Arrow
			chair.userData.Drive = true;
			break;
		case 39: //Right Arrow
			chair.userData.RotateRight = true;
			break;
		case 40: //Down Arrow
			chair.userData.Reverse = true;
			break;

		/*******************************************************************/
		/*                                                                 */
		/*                           Camera Keys                           */
		/*                                                                 */
		/*******************************************************************/

		/* After pressing the 1, 2 or 3 key this changes the camera.choice */
		/* in cameras struct and the cameraSwitch variable to TRUE so when */
		/* we call UpdateCamera(), it changes the default camera           */
				
		case 49: //1
            cameras.choice = cameras.ONE;
            cameraSwitch = true;
			break;

		case 50: //2
            cameras.choice = cameras.TWO;
            cameraSwitch = true;
			break;

		case 51: //3
            cameras.choice = cameras.THREE;
            cameraSwitch = true;
			break;
	}
}



function onKeyUp(e){
	'use strict';

	switch(e.keyCode){
		
		case 37: //Left Arrow
			chair.userData.RotateLeft = false;
			break;
		case 38: //Up Arrow
			chair.userData.Drive =false;
			break;
		case 39: //Right Arrow
			chair.userData.RotateRight = false;
			break;
		case 40: //Down Arrow
			chair.userData.Reverse = false;
			break;

	}	
}
