/***************************************************************************/
/*                                                                         */
/*                             Constant Values                             */
/*                                                                         */
/***************************************************************************/

const viewSize = 450;               /* _viewSize_ - holds the value of the viewsize window of the
                                    camera, so when defining the othographic camera parametres
                                    we just need to adjut these value. */

const viewSizeHALF = viewSize / 2;    /* _viewSizeHalf_ - holds half the value of _viewSize_, so 
                                      when defining the camera we can assign this value directly 
                                      to the left, right, top, bottom parametres. */

const camera1_Position = new THREE.Vector3(0,0,50);    
const camera2_Position = new THREE.Vector3(0,-400,400);
const camera3_Position = new THREE.Vector3(0,-100,100);
const camera4_Position = new THREE.Vector3(0,-150,0);  
const cameraPositionArray = [camera1_Position ,camera2_Position, camera3_Position, camera4_Position];

const camera1_UP = new THREE.Vector3(0,1,0);
const camera2_UP = new THREE.Vector3(0,1,1);
const camera3_UP = new THREE.Vector3(0,0,1);
const camera4_UP = new THREE.Vector3(0,0,1);
const cameraUPArray = [camera1_UP, camera2_UP,camera3_UP, camera4_UP];

const cameraLookDirection = new THREE.Vector3();


const cameras = {

    ONE : null,
    TWO : null,
    THREE : null,
	FOUR  : null
};

/***************************************************************************/
/*                                                                         */
/*                             Variable Values                             */
/*                                                                         */
/***************************************************************************/

var camera;                         /* _camera_ - holds the default camera for the scene */

/***************************************************************************/
/*                                                                         */
/*                                Functions                                */
/*                                                                         */
/***************************************************************************/


/*********************************************************/
/* createCamera - Creates a Orthographic Camera and      */
/*                depending on the input parametre it    */
/*                adjusts the camera parameters to the   */
/*                view of the scene.                     */
/*_______________________________________________________*/
/* ||INPUT||  -> num - changes depending on the camera   */
/*                     view we want to create.           */    
/* ||OUTPUT|| -> cam - created camera with the correct   */
/*                     parameters assigned.              */
/*********************************************************/


function createCamera(num){
    'use strict';
	if (num!=2){	
		if (num==3 || num==0){
			//OrtographicCamera(left,right,top,bottom,near,far)
			var cam = new THREE.OrthographicCamera(-viewSize,viewSize,viewSize,-viewSize,-1000,10000);
		}
		
		if (num==1){
			//Perpective camera(Fovy, aspect,near,far)
			var cam = new THREE.PerspectiveCamera(45,1,1,1000);
		}
		
		cam.position.copy(cameraPositionArray[num]);

		cam.up.copy( cameraUPArray[num]);

		cam.lookAt(cameraLookDirection );
		
		scene.add( cam );
	}
	
	else{ //Pov Camera
		//Perpective camera(Fovy, aspect,near,far)
		var cam = new THREE.PerspectiveCamera(45,1,1,1200);
		cam.rotateX(1);
		objects.ballsArray[0].add(cam);	
		cam.position.copy(camera3_Position);
	}
    return cam;
}



/*********************************************************/
/* createCameras - Creates ALL the cameras in the scene  */
/*                 and calls switchCamera to define the  */
/*                 default camera.                       */
/*_______________________________________________________*/
/* ||INPUT||  -> (none)                                  */
/* ||OUTPUT|| -> (none)                                  */
/*********************************************************/

function createCameras(){

    cameras.ONE = createCamera( 0 );
    cameras.TWO = createCamera( 1 );
    cameras.THREE = createCamera( 2 );
	cameras.FOUR = createCamera( 3 );

    camera=cameras.ONE;
    resize();
}


/*********************************************************/
/* resize - depending on the viewsize windows, this      */
/*          function calculates the camera parameters    */
/*          proportionately so we don't lose the aspect  */
/*          ratio of the scene.                          */
/*_______________________________________________________*/
/* ||INPUT||  -> (none)                                  */
/* ||OUTPUT|| -> (none)                                  */
/*********************************************************/

function resize(){
	//var viewSize = 500;

	renderer.setSize( window.innerWidth, window.innerHeight );

	var aspectRatio = window.innerWidth / window.innerHeight;

	if( window.innerHeight > 0 && window.innerWidth > 0 ){
		
		if ( aspectRatio < 1 )
		{
			camera.left     = -viewSizeHALF;
            camera.right    =  viewSizeHALF;
            camera.top      =  viewSizeHALF * (1 / aspectRatio);
            camera.bottom   = -viewSizeHALF * (1 / aspectRatio);
		}
		else if ( aspectRatio > 1 )
		{
			camera.left     = -viewSizeHALF * aspectRatio;
            camera.right    =  viewSizeHALF * aspectRatio;
            camera.top      =  viewSizeHALF;
            camera.bottom   = -viewSizeHALF;
		}
		//else ( aspectRatio == 1 )
	}
	camera.aspect = aspectRatio;   //keep the Perpective ratio
    camera.updateProjectionMatrix();
}
