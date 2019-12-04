/***************************************************************************/
/*                                                                         */
/*                             Constant Values                             */
/*                                                                         */
/***************************************************************************/


/* Object Dimensions for Positions */

const tableTopDim = {width: 200, height: 100, depth:2};

const tableLegDim = {radius:5, height:50};


/* Geometry */

    /* BoxGeometry ( width, height, depth ) */

const tableTopGeometry  = new THREE.BoxGeometry( tableTopDim.width, tableTopDim.height, tableTopDim.depth );

    /* CylinderGeometry( radiusTop, radiusBottom, height, radialSegments, heightSegments ) */

const tableLegGeometry 	= new THREE.CylinderGeometry( tableLegDim.radius, tableLegDim.radius, tableLegDim.height, 16, 16 );


/* Materials */

const tableTopMaterial = new THREE.MeshBasicMaterial( { color: 'blue',  wireframe : true } );

const tableLegMaterial = new THREE.MeshBasicMaterial( { color: 'green', wireframe : true } );


/* Push Materials into materialArray[] */

materialArray.push( tableTopMaterial );

materialArray.push( tableLegMaterial );


/* Positions accordingly to the Object Graph */

/*const tableInitialPosition = { x: 0,
							   y: 0,
							   z: 0};*/

    const tableTopPosition 		= { x: 0,
    						   		y: 0,
    						   		z: tableLegDim.height + tableTopDim.depth / 2 };

    const tableLeg_1_Position 	= { x: tableTopDim.width / 2 - tableLegDim.radius,
    								y: tableTopDim.height / 2 - tableLegDim.radius,
    								z: tableLegDim.height / 2 };

    const tableLeg_2_Position 	= { x: tableTopDim.width / 2 - tableLegDim.radius,
    								y: -tableTopDim.height / 2 + tableLegDim.radius,
    								z: tableLegDim.height / 2 };

    const tableLeg_3_Position 	= { x: -tableTopDim.width / 2 + tableLegDim.radius,
    								y: tableTopDim.height / 2 - tableLegDim.radius,
    								z: tableLegDim.height / 2 };

    const tableLeg_4_Position 	= { x: -tableTopDim.width / 2 + tableLegDim.radius,
    								y: -tableTopDim.height / 2 + tableLegDim.radius,
    								z: tableLegDim.height / 2 };



/***************************************************************************/
/*                                                                         */
/*                             Variable Values                             */
/*                                                                         */
/***************************************************************************/

var table 		= new THREE.Object3D();


/***************************************************************************/
/*                                                                         */
/*                                Functions                                */
/*                                                                         */
/***************************************************************************/

function createTable(obj) {
    'use strict';
    
    addTableTop( table );
    addTableLeg( table, tableLeg_1_Position );
    addTableLeg( table, tableLeg_2_Position );
    addTableLeg( table, tableLeg_3_Position );
    addTableLeg( table, tableLeg_4_Position );  

    obj.add( table );
}

function addTableTop(obj) {
    'use strict';

    const tableTop = new THREE.Mesh( tableTopGeometry, tableTopMaterial );
	
    tableTop.position.set( tableTopPosition.x, tableTopPosition.y, tableTopPosition.z );
	
    obj.add( tableTop );
}

function addTableLeg( obj, position ) { //Same constructor for 4Legs, so Input needs the position
    'use strict';
	
    const tableLeg = new THREE.Mesh( tableLegGeometry, tableLegMaterial );

	tableLeg.rotateX( pi / 2 );
	
    tableLeg.position.set( position.x, position.y, position.z );
	
    obj.add( tableLeg );
}