/***************************************************************************/
/*                                                                         */
/*                             Constant Values                             */
/*                                                                         */
/***************************************************************************/

/* Objects Dimensions */

const lampHeadDim 		= {radius:35, height:60};

const lampLightDim 		= {radius:20};

const lampHeight 		= 100;

/* Positions accordingly to the Object Graph */

const lampInitialPosition_1 =  { x: (floorDim.width  / 2 - lampHeadDim.radius *2),
                                 y: (floorDim.height / 2 - lampHeadDim.radius *2),
                                 z: lampHeight};

		const lampHeadPosition  = {	x:0,
									y:0,
									z: lampHeadDim.height / 2 };

		const lampLightPosition = { x:0,
									y:0,
									z: lampHeadDim.height };

const lampInitialPosition_2 =  { x:-(floorDim.width  / 2 - lampHeadDim.radius *2),
                                 y: (floorDim.height / 2 - lampHeadDim.radius *2),
                                 z: lampHeight};

const lampInitialPosition_3 =  { x: (floorDim.width  / 2 - lampHeadDim.radius *2),
                                 y:-(floorDim.height / 2 - lampHeadDim.radius *2),
                                 z: lampHeight   };

const lampInitialPosition_4 =  { x:-(floorDim.width  / 2 - lampHeadDim.radius *2),
                                 y:-(floorDim.height / 2 - lampHeadDim.radius *2),
                                 z: lampHeight   };

/* Geometry */

	/* ConeGeometry( radius, height, radialSegments, heightSegments ) */

const lampHeadGeometry 		= new THREE.ConeGeometry	( lampHeadDim.radius, lampHeadDim.height, 16, 16 );

	/* SphereGeometry( radius, widthSegments, heightSegments ) */

const lampLightGeometry 	= new THREE.SphereGeometry	( lampLightDim.radius, 16, 16 );


/* Materials */

//LampHead
const lampHeadBasicMaterial        = new THREE.MeshBasicMaterial	( { color: 'red'} );
const lampHeadLambertMaterial      = new THREE.MeshLambertMaterial	( { color: 'red'} );
const lampHeadPhongMaterial        = new THREE.MeshPhongMaterial	( { color: 'red'} );

//LampLight
const lampLightBasicMaterial 	   = new THREE.MeshBasicMaterial	( { color: 'white'} );
const lampLightLambertMaterial     = new THREE.MeshLambertMaterial	( { color: 'white'} );
const lampLightPhongMaterial       = new THREE.MeshPhongMaterial	( { color: 'white'} );

/* Push Materials into materialArrays[] */

for (var i=0;i<4;i++){ //4 lamps
	materialArrayBasic.push  ( lampHeadBasicMaterial, 	lampLightBasicMaterial   );
	materialArrayLambert.push( lampHeadLambertMaterial, lampLightLambertMaterial );
	materialArrayPhong.push  ( lampHeadPhongMaterial, 	lampLightPhongMaterial   );
}

const light_intensity = [ 0.5, 1, 1, 1, 1 ];

/***************************************************************************/
/*                                                                         */
/*                             Variable Values                             */
/*                                                                         */
/***************************************************************************/

var LightArray     = [];

var canUpdateLight = false;

var switchLightNumber;


/***************************************************************************/
/*                                                                         */
/*                                Functions                                */
/*                                                                         */
/***************************************************************************/

function createAllLamps() {

    var lamps            = new THREE.Object3D();

    createLamp( lamps,  lampInitialPosition_1, light_intensity[1] );
    createLamp( lamps,  lampInitialPosition_2, light_intensity[2] );
    createLamp( lamps,  lampInitialPosition_3, light_intensity[3] );
    createLamp( lamps,  lampInitialPosition_4, light_intensity[4] );

    scene.add( lamps );

    return lamps;

}

function createLamp( obj, lamp_pos, intensity ){
    'use strict'

    var lamp			= new THREE.Object3D();

    addLampHead 		( lamp );
    addLampLight		( lamp, intensity);

    lamp.position.copy	( lamp_pos );

    lamp.lookAt			( planePosition );
	
    obj.add				( lamp );
}

function addLampHead( obj ){
    'use strict';

    const lampHead 			= new THREE.Mesh( lampHeadGeometry );

    meshArray.push			(lampHead);

    lampHead.rotateX		(-pi/2);
    
    lampHead.position.copy	( lampHeadPosition );
    
    obj.add					( lampHead );
}

function addLampLight( obj, intensity ){
    'use strict';
    
    const lampLight 		= new THREE.Mesh( lampLightGeometry );  
	meshArray.push			( lampLight			);	
    lampLight.position.copy	( lampLightPosition );

    // SpotLight( color, intensity, distance, angle, penumbra, decay )
    var light 					= new THREE.SpotLight( 0xffffff, intensity, 2000,  pi/6 , 0.05, 1);
	//light.target				= plane;
	//adds target
	lampLight.add				(light.target);
	light.target.position.set	(0, 0, lampHeadDim.height+lampLightDim.radius);

	LightArray.push				( light );    
    lampLight.add				( light );    
    obj.add						( lampLight );
}


function UpdateLights() {

    if (canUpdateLight) {
        if(LightArray[switchLightNumber].intensity==0){ //light off->light on
            LightArray[switchLightNumber].intensity = light_intensity[switchLightNumber];
		}
        else{ //light on->light off
            LightArray[switchLightNumber].intensity = 0;
        }
    }
	canUpdateLight = false;
}