'use strict'

const camera_Position 		= new THREE.Vector3(0,0,200);

const camera_UP				= new THREE.Vector3(0,1,0);

const cameraLookDirection	= new THREE.Vector3();

const viewSizeHALF = 15;

/***************************************************************************/
/*                                                                         */
/*                                Functions                                */
/*                                                                         */
/***************************************************************************/

function createCamera(){
    camera = new THREE.OrthographicCamera();
	camera.near=1;
	camera.far=10000;
                                    
    camera.position.copy( camera_Position 		);

    camera.up.copy		( camera_UP 			);

    camera.lookAt		( cameraLookDirection 	);

    scene.add			( camera 				);
 
    resize();
    
}

function resize(){

    renderer.setSize( window.innerWidth, window.innerHeight );
    var aspectRatio = window.innerWidth / window.innerHeight;

    if( window.innerHeight > 0 && window.innerWidth > 0 ){

        if ( aspectRatio < 1 ){
            camera.left     = -viewSizeHALF;
            camera.right    =  viewSizeHALF;
            camera.top      =  viewSizeHALF * (1 / aspectRatio);
            camera.bottom   = -viewSizeHALF * (1 / aspectRatio);
        }
		
        else if ( aspectRatio > 1 ){
            camera.left     = -viewSizeHALF * aspectRatio;
            camera.right    =  viewSizeHALF * aspectRatio;
            camera.top      =  viewSizeHALF;
            camera.bottom   = -viewSizeHALF;
        }
    }
    camera.updateProjectionMatrix();
}
