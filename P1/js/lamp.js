/***************************************************************************/
/*                                                                         */
/*                             Constant Values                             */
/*                                                                         */
/***************************************************************************/

/* Object Dimensions for Positions */

const lampBaseDim 		= {radius:5, height:5}

const lampHeadDim 		= {radius:8, height:12};

const lampSupportDim 	= {radius:2, height:20};

const lampLightDim 		= {radius:5};


/* Geometry */

	/* ConeGeometry( radius, height, radialSegments, heightSegments ) */

const lampBaseGeometry 		= new THREE.ConeGeometry( lampBaseDim.radius, lampBaseDim.height, 16, 16 );

const lampHeadGeometry 		= new THREE.ConeGeometry( lampHeadDim.radius, lampHeadDim.height, 16, 16 );

    /* CylinderGeometry( radiusTop, radiusBottom, height, radialSegments, heightSegments ) */

const lampSupportGeometry 	= new THREE.CylinderGeometry( lampSupportDim.radius, lampSupportDim.radius, lampSupportDim.height, 16, 16 );

	/* SphereGeometry( radius, widthSegments, heightSegments ) */

const lampLightGeometry 	= new THREE.SphereGeometry( lampLightDim.radius, 16, 16 );


/* Materials */

const lampBaseMaterial        = new THREE.MeshBasicMaterial( { color: 'red',      wireframe : true } );

const lampHeadMaterial        = new THREE.MeshBasicMaterial( { color: 'white',    wireframe : true } );

const lampSupportMaterial     = new THREE.MeshBasicMaterial( { color: 'black',    wireframe : true } );

const lampLightMaterial 	  = new THREE.MeshBasicMaterial( { color: 'yellow',   wireframe : true } );


/* Push Materials into materialArray[] */

materialArray.push( lampBaseMaterial );

materialArray.push( lampHeadMaterial );

materialArray.push( lampSupportMaterial );

materialArray.push( lampLightMaterial );


/* Positions accordingly to the Object Graph */

const lampInitialPosition = { x: 20,
							  y: 20,
							  z: tableTopDim.depth + tableLegDim.height};

        const lampBasePosition	  	= { x: 0,
        								y: 0,
        								z: lampBaseDim.height / 2 }; 

        const lampSupportPosition 	= { x: 0,
        							  	y: 0,
        								z: lampBaseDim.height + lampSupportDim.height / 2 };

        const lampHeadLightPosition = { x: 0,
        							    y: 0,
        							    z: lampBaseDim.height + lampSupportDim.height };

            	const lampHeadPosition	= { x: 0,
            								y: -lampHeadDim.height / 2,
            								z: 0 };

            	const lampLightPosition = { x: 0,
            								y: -lampHeadDim.height,
            								z: 0 };



/***************************************************************************/
/*                                                                         */
/*                             Variable Values                             */
/*                                                                         */
/***************************************************************************/

var lamp 			= new THREE.Object3D();
var lampHeadLight 	= new THREE.Object3D();


/***************************************************************************/
/*                                                                         */
/*                                Functions                                */
/*                                                                         */
/***************************************************************************/

function createLamp(obj){
    'use strict'
	
    addLampBase( lamp );
    addLampSupport( lamp ); 
    addLampHeadLight( lamp );
		
    obj.add( lamp );

    return lamp;
}

function addLampBase( obj ){
    'use strict';
	
    const lampBase = new THREE.Mesh( lampBaseGeometry,lampBaseMaterial );

	lampBase.rotateX( pi / 2 );
	
    lampBase.position.set( lampBasePosition.x, lampBasePosition.y, lampBasePosition.z );
	
    obj.add( lampBase );
}

function addLampSupport( obj ){
    'use strict';
	
    const lampSupport = new THREE.Mesh( lampSupportGeometry, lampSupportMaterial);

	lampSupport.rotateX( pi / 2 );

    lampSupport.position.set( lampSupportPosition.x, lampSupportPosition.y, lampSupportPosition.z );
	
    obj.add( lampSupport );
}

function addLampHeadLight( obj ){
    'use strict';

	
    addLampHead( lampHeadLight );
    addLampLight( lampHeadLight );
	
	lampHeadLight.rotateX( 0 );
	
    lampHeadLight.position.set( lampHeadLightPosition.x, lampHeadLightPosition.y, lampHeadLightPosition.z );

    obj.add ( lampHeadLight );
}

function addLampHead( obj ){
    'use strict';

    const lampHead = new THREE.Mesh( lampHeadGeometry, lampHeadMaterial );
	
    lampHead.position.set( lampHeadPosition.x, lampHeadPosition.y, lampHeadPosition.z );
	
    obj.add( lampHead );
}

function addLampLight( obj ){
    'use strict';
	
    const lampLight = new THREE.Mesh( lampLightGeometry, lampLightMaterial );
	
    lampLight.position.set( lampLightPosition.x, lampLightPosition.y, lampLightPosition.z );
	
    obj.add( lampLight );
}
