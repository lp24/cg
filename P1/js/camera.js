/***************************************************************************/
/*                                                                         */
/*                             Constant Values                             */
/*                                                                         */
/***************************************************************************/

const viewSize = 300;               /* _viewSize_ - holds the value of the viewsize window of the
                                    camera, so when defining the othographic camera parametres
                                    we just need to adjut these value. */


const viewSizeHALF = viewSize / 2;    /* _viewSizeHalf_ - holds half the value of _viewSize_, so 
                                      when defining the camera we can assign this value directly 
                                      to the left, right, top, bottom parametres. */


const camera1_Position = new THREE.Vector3(0,0,1);
const camera2_Position = new THREE.Vector3(0,-1,0);
const camera3_Position = new THREE.Vector3(1,0,0);
const cameraPositionArray = [ camera1_Position ,camera2_Position, camera3_Position ];

const camera1_UP = new THREE.Vector3(0,1,0);
const camera2_UP = new THREE.Vector3(0,0,1);
const camera3_UP = new THREE.Vector3(0,0,1);
const cameraUPArray = [ camera1_UP, camera2_UP,camera3_UP ];

const cameraLookDirection = new THREE.Vector3();


const cameras = {

    orthographic_1 : null,
    orthographic_2 : null,
    orthographic_3 : null,

    ONE : 1,
    TWO : 2,
    THREE : 3,

    choice: 1
};

/***************************************************************************/
/*                                                                         */
/*                             Variable Values                             */
/*                                                                         */
/***************************************************************************/

var camera;                         /* _camera_ - holds the default camera for the scene */

var cameraSwitch = true;           /* _cameraSwitch_ - TRUE when we need to switch the camera,
                                    FALSE otherwise */



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


    var cam = new THREE.OrthographicCamera(); /* Variable that hold the new camera to create */
                                    

    cam.near = -viewSize;               /* near and far parametres are bigger than the viewsize.  */
    cam.far = viewSize;     
	

    cam.position.copy( cameraPositionArray[ num ] );

    cam.up.copy( cameraUPArray[ num ] );

    cam.lookAt( cameraLookDirection );

    scene.add( cam );

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

    cameras.orthographic_1 = createCamera( 0 );
    cameras.orthographic_2 = createCamera( 1 );
    cameras.orthographic_3 = createCamera( 2 );

    //cameras.choice = cameras.ONE;
    UpdateCamera();
}

/*********************************************************/
/* UpdateCamera - Updates default camera.                */
/*                If cameraSwitch TRUE, then it changes  */
/*                the camera.                            */
/*                If cameraSwitch False, then the camera */
/*                remains the same.                      */
/*_______________________________________________________*/
/* ||INPUT||  -> (none)                                  */
/* ||OUTPUT|| -> (none)                                  */
/*********************************************************/

function UpdateCamera(){

    if(cameraSwitch )
    {
        switch( cameras.choice ){

			case cameras.ONE:
			camera = cameras.orthographic_1;
			break;
        
			case cameras.TWO:
			camera = cameras.orthographic_2;
			break;

			case cameras.THREE:
			camera = cameras.orthographic_3;
			break;
		}
		resize();
		cameraSwitch = false;   
	}        
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
            //camera.updateProjectionMatrix();

        }
        else if ( aspectRatio > 1 )
        {
            camera.left     = -viewSizeHALF * aspectRatio;
            camera.right    =  viewSizeHALF * aspectRatio;
            camera.top      =  viewSizeHALF;
            camera.bottom   = -viewSizeHALF;
            //camera.updateProjectionMatrix();

        }
        else if ( aspectRatio == 1 )
        {
            //camera.updateProjectionMatrix();
        }
    }
    camera.updateProjectionMatrix();
}