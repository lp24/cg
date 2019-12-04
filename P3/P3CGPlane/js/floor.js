/***************************************************************************/
/*                                                                         */
/*                             Constant Values                             */
/*                                                                         */
/***************************************************************************/

/* Object Dimensions for Positions */

const floorDim		= {	width :1600, 
						height:1600, 
						depth :1};

/* Positions accordingly to the Object Graph */

const floorPosition = { x: 0,
						y: 0,
						z: -floorDim.depth/2};
						
/* Geometry */

    /* BoxGeometry ( width, height, depth ) */

const floorGeometry			= new THREE.BoxGeometry(floorDim.width,floorDim.height,floorDim.depth);

/* Floor Materials */

materialArrayBasic.push		( new THREE.MeshBasicMaterial	( { color: 'cyan'}  ));
materialArrayLambert.push	( new THREE.MeshLambertMaterial	( { color: 'cyan'}	));
materialArrayPhong.push		( new THREE.MeshPhongMaterial	( { color: 'cyan'}	));

/***************************************************************************/
/*                                                                         */
/*                                Functions                                */
/*                                                                         */
/***************************************************************************/

function createFloor() {
    'use strict';
           
    var floor = new THREE.Mesh( floorGeometry );
    meshArray.push(floor);
	
    floor.position.copy( floorPosition );

    scene.add( floor );

    return floor;    
}
