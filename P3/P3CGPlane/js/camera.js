/***************************************************************************/
/*                                                                         */
/*                             Constant Values                             */
/*                                                                         */
/***************************************************************************/

const camera_Position 		= new THREE.Vector3(0,-1500,1500);

const camera_UP				= new THREE.Vector3(0,0,1);

const cameraLookDirection	= new THREE.Vector3();

var camera;
/***************************************************************************/
/*                                                                         */
/*                                Functions                                */
/*                                                                         */
/***************************************************************************/

function createCamera(){
    'use strict';

    //PerspectiveCamera(fovy,aspect,near,far)
    camera = new THREE.PerspectiveCamera(45,1,1,10000);
                                    
    camera.position.copy( camera_Position 		);

    camera.up.copy		( camera_UP 			);

    camera.lookAt		( cameraLookDirection 	);

    scene.add			( camera 				);

    resize();

}

function resize(){

    renderer.setSize( window.innerWidth, window.innerHeight );

    var aspectRatio = window.innerWidth / window.innerHeight;

    camera.aspect 	= aspectRatio;

    camera.updateProjectionMatrix();
}
