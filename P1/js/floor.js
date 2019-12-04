/***************************************************************************/
/*                                                                         */
/*                             Constant Values                             */
/*                                                                         */
/***************************************************************************/


/* Object Dimensions for Positions */

const floorDim ={width:viewSize, height: viewSize, depth: 1};


/* Geometry */

    /* BoxGeometry ( width, height, depth ) */

const floorGeometry  = new THREE.BoxGeometry(floorDim.width,floorDim.height,floorDim.depth);


/* Materials */

const floorMaterial = new THREE.MeshBasicMaterial( { color: 'cyan',  wireframe : true } );



/* Push Materials into materialArray[] */

materialArray.push( floorMaterial );


/* Positions accordingly to the Object Graph */

const floorPosition = { x: 0,
						y: 0,
						z: -floorDim.depth/2 };

						

/***************************************************************************/
/*                                                                         */
/*                                Functions                                */
/*                                                                         */
/***************************************************************************/

function createFloor() {
    'use strict';
    
       
    var floor = new THREE.Mesh( floorGeometry, floorMaterial );
	
    floor.position.set( floorPosition.x, floorPosition.y, floorPosition.z );

    scene.add( floor );

    return floor;    
}