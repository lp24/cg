/***************************************************************************/
/*                                                                         */
/*                             Constant Values                             */
/*                                                                         */
/***************************************************************************/

const camera_Position 		= new THREE.Vector3(0,-1600,1600);

const camera_UP				= new THREE.Vector3(0,0,1);

const cameraLookDirection	= new THREE.Vector3();

const PAUSE_camera_Position = new THREE.Vector3(0,0,1);

const PAUSE_camera_UP       = new THREE.Vector3(0,1,0);

const default_FOVy          = 55;

const max_FOVy_multiplier   = (default_FOVy / 180) + 0.01;

const viewSizeHALF          = 500;


/***************************************************************************/
/*                                                                         */
/*                             Variable Values                             */
/*                                                                         */
/***************************************************************************/

/*
 *  Notice that every variable is declared, but no value is assigned, this is because
 *  upon creating the scene, we assign each value to them, so when we need to reset
 *  everything, we basically just need to create a new scene, because it will
 *  automatically reset all the variables to their starting values.
 */

var camera,
    PAUSE_camera,
    controls;


/***************************************************************************/
/*                                                                         */
/*                                Functions                                */
/*                                                                         */
/***************************************************************************/

function createCamera(){
    'use strict';

    /* Create Main Camera using the first Viewport */

    /* PerspectiveCamera( FOVy, aspect, near, far ) */
    camera = new THREE.PerspectiveCamera( default_FOVy, window.innerWidth / window.innerHeight, 1, 10000 );
                                    
    camera.position.copy( camera_Position 		);

    camera.up.copy		( camera_UP 			);

    camera.lookAt		( cameraLookDirection 	);

    scene.add			( camera 				);
    
    controls = new THREE.OrbitControls( camera );

    //Lock OrbitControls to upper side of the board
    controls.maxPolarAngle = 2*pi / 5 ;

}


function createPauseCamera(){
    'use strict';

    /* Create PAUSE using the Second Viewport */
    PAUSE_camera      = new THREE.OrthographicCamera();
    PAUSE_camera.near = 1;
    PAUSE_camera.far  = 100000;

    PAUSE_camera.position.copy  ( PAUSE_camera_Position );

    PAUSE_camera.up.copy		( PAUSE_camera_UP 		);

    PAUSE_camera.lookAt         ( PAUSE_scene.position  );

    PAUSE_scene.add(PAUSE_camera);

}


function resize(){

    var aspectRatio = window.innerWidth / window.innerHeight;

    /* Just like we did on the Orthographic Camera, here we also need to be careful
     * when resizing the canvas window, therefore when we have an aspect ratio above 1,
     * we essentially don't need to change the FOVy of the camera so we just let the
     * FOVy be the default value, this is because the aspect ratio will adjust the camera
     * view correctly, but when it's bellow 1, we also need to adjust the FOVy of the camera,
     * so we slowly increase the FOVy multiplying it bu the aspect's ratio inverse,
     * but only to a point, because after certain values it grows exponentially, so we cap the
     * value so the FOVy never exceeds 180 degrees, otherwise the camera will flip vertically.
     * NOTE: This value is obtained by dividing our FOVy by 180. */

    if (aspectRatio>1){
        camera.fov 	= default_FOVy;

        PAUSE_camera.left     = -viewSizeHALF * aspectRatio;
        PAUSE_camera.right    =  viewSizeHALF * aspectRatio;
        PAUSE_camera.top      =  viewSizeHALF;
        PAUSE_camera.bottom   = -viewSizeHALF;
	}
	else if (aspectRatio< 1 && aspectRatio > max_FOVy_multiplier){
		camera.fov 	= default_FOVy*((1/aspectRatio));

        PAUSE_camera.left     = -viewSizeHALF;
        PAUSE_camera.right    =  viewSizeHALF;
        PAUSE_camera.top      =  viewSizeHALF * (1 / aspectRatio);
        PAUSE_camera.bottom   = -viewSizeHALF * (1 / aspectRatio);
	}
	else {
        camera.fov 	= default_FOVy*((1/max_FOVy_multiplier));

        PAUSE_camera.left     = -viewSizeHALF;
        PAUSE_camera.right    =  viewSizeHALF;
        PAUSE_camera.top      =  viewSizeHALF * (1 / aspectRatio);
        PAUSE_camera.bottom   = -viewSizeHALF * (1 / aspectRatio);
    }

    camera.aspect = aspectRatio;

    PAUSE_camera.updateProjectionMatrix();
    camera.      updateProjectionMatrix();

    renderer.    setSize( window.innerWidth, window.innerHeight );
}
