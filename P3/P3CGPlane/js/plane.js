/***************************************************************************/
/*                                                                         */
/*                             Constant Values                             */
/*                                                                         */
/***************************************************************************/

const CpitN	= 16;	 		//How many parts to divide the length of the Cockpit 
const TailN	= 16;			//How many parts to divide the length of the Tail  
const BodyN	= 32;			//How many parts to divide the length of the Body
const WingN	= 3;			//How many parts to divide the wings/gliders
const RadN	= 4;    		//How many parts to divide each circle
const HRadN	= RadN/2+1;   	//How many parts to divide each half circle  

/* Objects Dimensions */

const planeFuselageDim	= {radius: 50, height: 800}; //Tail and Cockpit included
const tailLength		= 100;
const cockpitDim 		= {radiusx: 150, radiusyz: planeFuselageDim.radius}

const WingDim			= {width:100,height:400}; //depth=0
const GliderDim			= {width:60, height:200}; //depth=0

/* Positions accordingly to the Object Graph */

const planePosition = {	x:0,
						y:0,
						z: 400};

    const planeFusPosition	={	x: -planeFuselageDim.height/2,
								y:0,
								z:0	};
									
	const planeLWingPosition={	x:0,
								y:planeFuselageDim.radius,
								z:0 };	
								
	const planeRWingPosition={	x:0,
								y:-planeFuselageDim.radius,
								z:0 };
								
	const planeLGliderPosition={x:-planeFuselageDim.height/2+tailLength,
								y:planeFuselageDim.radius, 
								z:0 };
									
		const planeLGliderMeshPosition={x:-GliderDim.width,
										y:0,
										z:0};
									
	const planeRGliderPosition={x:-planeFuselageDim.height/2+tailLength,
								y:-planeFuselageDim.radius,
								z:0};
									
		const planeRGliderMeshPosition={ 	x:-GliderDim.width,
											y:0,
											z:0 };
		
	const planeVGliderPosition={x:-planeFuselageDim.height/2+tailLength,
								y:0,
								z:planeFuselageDim.radius};
									
		const planeVGliderMeshPosition={	x:-GliderDim.width,
											y:0,
											z:0};

    const planeCockpitPosition  = { x: planeFuselageDim.height/2-cockpitDim.radiusx,
									y:0,
									z:0};									
									
/* Materials */
//Fuselage
const planeFuselageBasicMaterial      		= new THREE.MeshBasicMaterial	( { color: 'darkgreen'} );
const planeFuselageLambertMaterial    		= new THREE.MeshLambertMaterial	( { color: 'darkgreen'} );
const planeFuselagePhongMaterial     		= new THREE.MeshPhongMaterial	( { color: 'darkgreen'} );

//Cockpit
const planeCockpitBasicMaterial            	= new THREE.MeshBasicMaterial	( { color: 'lightblue' } );
const planeCockpitLambertMaterial          	= new THREE.MeshLambertMaterial ( { color: 'lightblue' } );
const planeCockpitPhongMaterial            	= new THREE.MeshPhongMaterial	( { color: 'lightblue' } );

//Wings
const planeRWingBasicMaterial               = new THREE.MeshBasicMaterial  	( { color: 'red',	side:THREE.DoubleSide } );
const planeRWingLambertMaterial             = new THREE.MeshLambertMaterial	( { color: 'red',	side:THREE.DoubleSide } );
const planeRWingPhongMaterial               = new THREE.MeshPhongMaterial  	( { color: 'red',	side:THREE.DoubleSide } );

const planeLWingBasicMaterial               = new THREE.MeshBasicMaterial  	( { color: 'red',	side:THREE.DoubleSide } );
const planeLWingLambertMaterial             = new THREE.MeshLambertMaterial	( { color: 'red',	side:THREE.DoubleSide } );
const planeLWingPhongMaterial               = new THREE.MeshPhongMaterial  	( { color: 'red',	side:THREE.DoubleSide } );

//Vertical Glider
const planeVGliderBasicMaterial             = new THREE.MeshBasicMaterial	( { color: 'blue',	side:THREE.DoubleSide } );
const planeVGliderLambertMaterial           = new THREE.MeshLambertMaterial ( { color: 'blue',	side:THREE.DoubleSide } );
const planeVGliderPhongMaterial             = new THREE.MeshPhongMaterial	( { color: 'blue',	side:THREE.DoubleSide } );

//Horizontal Gliders
const planeLGliderBasicMaterial             = new THREE.MeshBasicMaterial	( { color: 'yellow',side:THREE.DoubleSide } );
const planeLGliderLambertMaterial           = new THREE.MeshLambertMaterial ( { color: 'yellow',side:THREE.DoubleSide } );
const planeLGliderPhongMaterial             = new THREE.MeshPhongMaterial	( { color: 'yellow',side:THREE.DoubleSide } );

const planeRGliderBasicMaterial             = new THREE.MeshBasicMaterial	( { color: 'yellow',side:THREE.DoubleSide } );
const planeRGliderLambertMaterial           = new THREE.MeshLambertMaterial ( { color: 'yellow',side:THREE.DoubleSide } );
const planeRGliderPhongMaterial             = new THREE.MeshPhongMaterial	( { color: 'yellow',side:THREE.DoubleSide } );

/* Push Materials into materialArrays[]*/
//Fuselage, Lwing, RWing, LGlider, RGlider, VGlider, Cockpit

//Basic
materialArrayBasic.push		( planeFuselageBasicMaterial,planeLWingBasicMaterial,planeRWingBasicMaterial,
planeLGliderBasicMaterial,planeRGliderBasicMaterial,planeVGliderBasicMaterial,planeCockpitBasicMaterial );

//Lambert
materialArrayLambert.push	( planeFuselageLambertMaterial,planeLWingLambertMaterial,planeRWingLambertMaterial,
planeLGliderLambertMaterial, planeRGliderLambertMaterial,planeVGliderLambertMaterial,planeCockpitLambertMaterial );

//Phong
materialArrayPhong.push		( planeFuselagePhongMaterial,planeLWingPhongMaterial,planeRWingPhongMaterial,
planeLGliderPhongMaterial,planeRGliderPhongMaterial, planeVGliderPhongMaterial ,planeCockpitPhongMaterial );

const rotationSpeed		= 5;
/***************************************************************************/
/*                                                                         */
/*                             Variable Values                             */
/*                                                                         */
/***************************************************************************/
var plane 		        = new THREE.Object3D();

var rotationSpeedY      = 0;
var rotationSpeedZ      = 0;

/***************************************************************************/
/*                                                                         */
/*                                Functions                                */
/*                                                                         */
/***************************************************************************/

function createPlane() {
    'use strict';
    
	plane.add(new THREE.AxisHelper(2000));

	createFuselage();
	createWings(); 				//includes gliders
	createCockpit();

    plane.position.copy(planePosition);

    scene.add( plane );

    return plane;
}

function UpdatePlane() {
    
    var delta = clock.getDelta();

    plane.rotateZ(rotationSpeedZ*delta);
    plane.rotateY(rotationSpeedY*delta);
	
	// ?DELETE?
	const movespeed=300;
	if(moveplane){
		plane.translateX(movespeed*delta);
		lamps=scene.children[3];
		for (var i=0;i<4;i++){
			lamps.children[i].lookAt(plane.position);
		}
	}
}
