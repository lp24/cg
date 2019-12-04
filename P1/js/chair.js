/***************************************************************************/
/*                                                                         */
/*                             Constant Values                             */
/*                                                                         */
/***************************************************************************/

/* Object Dimensions for Positions */

const chairWheelDim         = {radius:10, tube:2};

const chairSeatDim          = {width:50, height:50,depth:1};

const chairBackDim          = {width:50, height:1,depth:50};

const chairWheelSupportDim  = {radius:2,height:20};

const chairSeatSupportDim   = {radius:4, height:15};

const chairBackSupportDim   = {radius:2, height:40};

const chairWheelRadius      = chairWheelDim.radius + chairWheelDim.tube;
const chairWheelDiameter    = chairWheelRadius * 2;

/* Geometry */

    /* TorusGeometry( radius, tube, radialSegments, tubularSegments ) */

const chairWheelGeometry        = new THREE.TorusGeometry( chairWheelDim.radius , chairWheelDim.tube, 16, 12 );

    /* CubeGeometry ( width, height, depth ) */

const chairSeatGeometry         = new THREE.CubeGeometry( chairSeatDim.width, chairSeatDim.height,  chairSeatDim.depth );

const chairBackGeometry         = new THREE.CubeGeometry( chairBackDim.width, chairBackDim.height, chairBackDim.depth );

    /* CylinderGeometry( radiusTop, radiusBottom, height, radialSegments, heightSegments ) */

const chairWheelSupportGeometry = new THREE.CylinderGeometry( chairWheelSupportDim.radius, chairWheelSupportDim.radius, 
																					chairWheelSupportDim.height, 16, 16 );

const chairSeatSupportGeometry  = new THREE.CylinderGeometry( chairSeatSupportDim.radius, chairSeatSupportDim.radius, 
																					chairSeatSupportDim.height, 16, 16 );

const chairBackSupportGeometry  = new THREE.CylinderGeometry( chairBackSupportDim.radius, chairBackSupportDim.radius, 
																					chairBackSupportDim.height, 16, 16 );


/* Materials */

const chairWheelMaterial        = new THREE.MeshBasicMaterial( { color: 'red',      wireframe : true } );

const chairSeatMaterial         = new THREE.MeshBasicMaterial( { color: 'white',    wireframe : true } );

const chairBackMaterial         = new THREE.MeshBasicMaterial( { color: 'red',      wireframe : true } );

const chairWheelSupportMaterial = new THREE.MeshBasicMaterial( { color: 'yellow',   wireframe : true } );

const chairSeatSupportMaterial  = new THREE.MeshBasicMaterial( { color: 'green',    wireframe : true } );

const chairBackSupportMaterial  = new THREE.MeshBasicMaterial( { color: 'green',    wireframe : true } );


/* Push Materials into materialArray[] */

materialArray.push( chairWheelMaterial );

materialArray.push( chairSeatMaterial );

materialArray.push( chairBackMaterial );

materialArray.push( chairWheelSupportMaterial );

materialArray.push( chairSeatSupportMaterial );

materialArray.push( chairBackSupportMaterial );



/* Positions accordingly to the Object Graph */

const chairInitialPosition = { x: secretaryInitialPosition.x,
                               y: secretaryInitialPosition.y - tableTopDim.height / 2,
                               z: 0 } ;

    const chairTopPosition     = { x: 0,
                                   y: 0,
                                   z: chairWheelDiameter + chairSeatSupportDim.height };

        const chairSeatPosition            = { x: 0,
                                               y: 0,
                                               z: chairSeatDim.depth / 2 };

        const chairBackPosition            = { x: 0,
                                               y: - ( chairSeatDim.height / 2 ) + ( chairBackDim.height / 2 ),
                                               z: chairBackSupportDim.height };

        const chairBackSupportPosition     = { x: 0,
                                               y: - ( chairSeatDim.height / 2 ) - chairBackSupportDim.radius,
                                               z: chairBackSupportDim.height / 2 };


    const chairBottomPosition  = { x: 0,
                                   y: 0,
                                   z: 0 };

        const chairWheelsPosition          = { x: 0,
                                               y: 0,
                                               z: chairWheelRadius };

            const chairWheel_1_Position         = { x: chairSeatSupportDim.radius + chairWheelSupportDim.height,
                                                    y: 0,
                                                    z: 0 };

            const chairWheel_2_Position         = { x: -chairSeatSupportDim.radius - chairWheelSupportDim.height,
                                                    y: 0,
                                                    z: 0 };

            const chairWheel_3_Position         = { x: 0,
                                                    y: chairSeatSupportDim.radius + chairWheelSupportDim.height,
                                                    z: 0 };
                                        
            const chairWheel_4_Position         = { x: 0,
                                                    y: -chairSeatSupportDim.radius - chairWheelSupportDim.height,
                                                    z: 0 };                                    

        const chairSeatSupportPosition     = { x: 0,
                                               y: 0,
                                               z: chairWheelDiameter + ( chairSeatSupportDim.height / 2 ) };

        const chairWheelSupport_1_Position = { x: 0,
                                               y: chairSeatSupportDim.radius + ( chairWheelSupportDim.height / 2 ),
                                               z: chairWheelDiameter + chairWheelSupportDim.radius};

        const chairWheelSupport_2_Position = { x: 0,
                                               y: -chairSeatSupportDim.radius - ( chairWheelSupportDim.height / 2 ),
                                               z: chairWheelDiameter + chairWheelSupportDim.radius };

        const chairWheelSupport_3_Position = { x: chairSeatSupportDim.radius + ( chairWheelSupportDim.height / 2 ),
                                               y: 0,
                                               z: chairWheelDiameter + chairWheelSupportDim.radius};

        const chairWheelSupport_4_Position = { x: -chairSeatSupportDim.radius - ( chairWheelSupportDim.height / 2 ),
                                               y: 0,
                                               z: chairWheelDiameter + chairWheelSupportDim.radius};



/***************************************************************************/
/*                                                                         */
/*                             Variable Values                             */
/*                                                                         */
/***************************************************************************/

var chair       = new THREE.Object3D();
var chairTop 	= new THREE.Object3D();
var chairBottom = new THREE.Object3D();
var chairWheels = new THREE.Object3D();

/***************************************************************************/
/*                                                                         */
/*                                Functions                                */
/*                                                                         */
/***************************************************************************/

function createChair(){
    'use strict';  
	
	chair.add( new THREE.AxisHelper( 100 ) );
	
    addChairTop( chair );
    addChairBottom( chair );

    scene.add( chair );

    return chair;
}


function addChairTop(obj){
    'use strict';

    addSeat( chairTop );
    addBack( chairTop );
    addBackSupport( chairTop );
	
    chairTop.position.set( chairTopPosition.x, chairTopPosition.y, chairTopPosition.z );

    obj.add( chairTop );
}

function addSeat(obj){
    'use strict';

    const chairSeat = new THREE.Mesh( chairSeatGeometry, chairSeatMaterial );

    chairSeat.position.set( chairSeatPosition.x, chairSeatPosition.y, chairSeatPosition.z );
	
    obj.add( chairSeat );
}

function addBack(obj){
    'use strict';
	
    const chairBack = new THREE.Mesh( chairBackGeometry, chairBackMaterial );
	
    chairBack.position.set( chairBackPosition.x, chairBackPosition.y, chairBackPosition.z );
	
    obj.add( chairBack );
}

function addBackSupport(obj){
    'use strict';
	
    const chairBackSupport  = new THREE.Mesh( chairBackSupportGeometry,     chairBackSupportMaterial );

	chairBackSupport.rotateX( pi / 2 );

    chairBackSupport.position.set( chairBackSupportPosition.x, chairBackSupportPosition.y, chairBackSupportPosition.z );
	
    obj.add( chairBackSupport );
}
    
function addChairBottom(obj){
    'use strict';
	
	chairBottom.add(new THREE.AxisHelper(50));

    addAllWheels(chairBottom);
	addSeatSupport(chairBottom);
    
    addWheelSupport( chairBottom, chairWheelSupport_1_Position );
    addWheelSupport( chairBottom, chairWheelSupport_2_Position );
    addWheelSupport( chairBottom, chairWheelSupport_3_Position );
    addWheelSupport( chairBottom, chairWheelSupport_4_Position );

    chairBottom.position.set( chairBottomPosition.x, chairBottomPosition.y, chairBottomPosition.z );
	
    obj.add(chairBottom);
}

function addSeatSupport( obj ){
    'use strict';

    const chairSeatSupport = new THREE.Mesh( chairSeatSupportGeometry, chairSeatSupportMaterial );
	
	chairSeatSupport.rotateX( pi / 2 );

    chairSeatSupport.position.set( chairSeatSupportPosition.x, chairSeatSupportPosition.y, chairSeatSupportPosition.z );
	
    obj.add( chairSeatSupport );
}

function addWheelSupport( obj, position ){
    'use strict';
	
    const chairWheelSupport	= new THREE.Mesh( chairWheelSupportGeometry, chairSeatMaterial );

	//Of the 4 wheel supports, rotate 2
	if( position.x != 0){
		chairWheelSupport.rotateZ( pi / 2 );
	}
	
    chairWheelSupport.position.set( position.x, position.y, position.z );
	
    obj.add( chairWheelSupport );
}

function addAllWheels( obj ){
    'use strict';
	
    addWheel( chairWheels, chairWheel_1_Position );
    addWheel( chairWheels, chairWheel_2_Position );
    addWheel( chairWheels, chairWheel_3_Position );
    addWheel( chairWheels, chairWheel_4_Position );
	
    chairWheels.position.set( chairWheelsPosition.x, chairWheelsPosition.y, chairWheelsPosition.z );
	
    obj.add( chairWheels );
}

function addWheel( obj, position ){
    'use strict';

    const chairWheelMesh = new THREE.Mesh( chairWheelGeometry, chairWheelMaterial );

    var chairWheel = new THREE.Object3D();

    chairWheel.add(chairWheelMesh);
    chairWheelMesh.add(new THREE.AxisHelper(20));

	chairWheel.rotateY( pi / 2 );

    chairWheel.position.set( position.x, position.y, position.z );
	
    obj.add( chairWheel );
}


/********************************************/
/*											*/
/* 				Chair Movement				*/
/*											*/
/********************************************/

 /*
    
    r = r0 + v0*t + 1/2 * a * t^2

    v = v0 + a * t

    r = r0 + 1/2 * (v + v0) * t

    alphaW(heel) = v(tangential) * t / wheelRadius

*/

chair.userData = { Reverse :        false,
                   Drive :          false,
                   RotateRight :    false,
                   RotateLeft :     false };

const MAX_vel 		= 200;			// maximum velocity
const acceleration 	= 100;			// basic acceleration

/* alignmentSpeed <= rotationSpeed */
const rotationSpeed = pi / 2;		//speed that the chair turns with

var alignmentSpeed 	= pi ;		//speed that the wheels turn with

var velInit 		= 0;			//Velocity from the previous frame
var chairRotation 	= 0;			//Angle between the chair and the wheels, symmetrical wheels, so angle<=pi
var wheelRotation 	= 0;			//Angle that the wheels will turn horizontally

var wheelRotationSpeed;				//Angle that the wheels rotate vertically

function UpdateChair(){
    //'use strict';

    var delta = clock.getDelta();
	
	var drive=0;	
	var reverse=0;
	
	var vel=0;
	
	//if direction of speed opposite of acceleration, acceleration doubles
    if (chair.userData.Drive){
		drive=acceleration;
		if (velInit<0){
			drive=drive*2;
		}
    }

    if (chair.userData.Reverse){
		reverse=-acceleration;
		if (velInit>0){
			reverse=reverse*2;
		}
		
    }
	
	if (!chair.userData.Drive && !chair.userData.Reverse){
		if( Math.abs(velInit) < acceleration * delta ){
			velInit = 0;
		}
		else if ( velInit > 0 ){
			reverse = -acceleration;
		}
           
		else if ( velInit < 0 ){
			drive = acceleration;
		}
	}
	
	vel = velInit + ( drive + reverse ) * delta ;

	if ( vel > MAX_vel){
		vel = MAX_vel;
	}
	else if ( vel < -MAX_vel ){
		vel = -MAX_vel;
	}
	
	var distance = 0.5 *( velInit+ vel)*delta;
	
    chair.translateY( distance );

    velInit = vel;

	/**************/
	/*  Rotation  */
	/**************/


	var rotationleft=0; 
	var rotationright=0; 

    if (chair.userData.RotateLeft)
    {
		rotationleft=rotationSpeed*delta;
        chair.rotateZ(rotationleft);
        chairBottom.rotateZ(-rotationleft);
    }
	
    if (chair.userData.RotateRight)
    {
        rotationright=-rotationSpeed*delta/*+2*pi*/;
        chair.rotateZ(rotationright);
		chairBottom.rotateZ(-rotationright);
	}
	
	var rotation=rotationleft+rotationright;
	
	chairRotation+=rotation;

    wheelRotationSpeed = ( vel / chairWheelRadius ) * delta;


	chairRotation=chairRotation%(2*pi);
    
    console.log(chairRotation);

	wheelRotation=0;
	if(vel!=0){
        if (chairRotation>pi){
            chairRotation=-(2*pi-chairRotation);
        }
        else if(chairRotation<-pi){
            chairRotation=(2*pi+chairRotation);
        }

        wheelRotation=alignmentSpeed*delta;
        if(chairRotation>0){ 
            wheelRotation=alignmentSpeed*delta;
            if(wheelRotation>=chairRotation){
              wheelRotation=chairRotation;
             chairRotation=0;
            }
            else{
             chairRotation-=wheelRotation;
            }
        }
        else if(chairRotation<0){
             wheelRotation=-alignmentSpeed*delta
             if(wheelRotation<=chairRotation){
                 wheelRotation=chairRotation;
                chairRotation=0;
              }
            else{
                chairRotation-=wheelRotation;
              }
         }
         else{
            wheelRotation=0;
        }
    }
	
		
	
		for (var i = chairWheels.children.length - 1; i >= 0; i--) {
			wheel=chairWheels.children[i];
			wheel.rotateX(-wheelRotation);
            chairWheels.children[i].children[0].rotateZ(-wheelRotationSpeed);
        
			//wheel.rotateZ(distance/chairWheelRadius);
        }

        
	}
  