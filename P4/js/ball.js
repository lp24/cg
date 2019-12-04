/***************************************************************************/
/*                                                                         */
/*                             Constant Values                             */
/*                                                                         */
/***************************************************************************/

const ballDim       = { radius:125, segments: 32 };

/* SphereGeometry( radius, widthSegments, heightSegments ) */
const ballGeometry	= new THREE.SphereGeometry( ballDim.radius, ballDim.segments, ballDim.segments );

const ballPosition  =   {   x: 0,
                            y: 0,
                            z: ballDim.radius };
                        
        const ballMeshPosition  =   {   x: cubeDim.side + ballDim.radius,
                                        y: 0,
                                        z: 0 };

const textureBall = new THREE.TextureLoader().load( 'textures/ball/poolballs14.png' );

const maxspeed = 250;

/***************************************************************************/
/*                                                                         */
/*                                Functions                                */
/*                                                                         */
/***************************************************************************/

function createBallMaterials(){

    var ballBasicMaterial   =       new THREE.MeshBasicMaterial	( { map: textureBall } );
    var ballPhongMaterial   =       new THREE.MeshPhongMaterial	( { map: textureBall, shininess:200  } );

    materialArrayBasic.push	    ( ballBasicMaterial );
    materialArrayComplex.push	( ballPhongMaterial );
}


function createBall(){
    createBallMaterials();

    ball            = new THREE.Object3D();
    var ballMesh    = new THREE.Mesh( ballGeometry );
    
    ballMesh.position.copy( ballMeshPosition );
    ballMesh.add( new THREE.AxesHelper( 500 ) );
    meshArray.push( ballMesh );
    ball.add( ballMesh );
    
    ball.position.copy( ballPosition );
    ball.userData = { speed: 0, acc:-100 };
    ball.add( new THREE.AxesHelper( 500 ) );
    scene.add( ball );
}

    
function UpdateBall(){
    var deltatime=clock.getDelta();
    ball.userData.speed = ball.userData.speed + ball.userData.acc * deltatime;

    if( ball.userData.speed <= 0 ){
        ball.userData.speed = 0;
    }
    else{
        if( ball.userData.speed > maxspeed ){
            ball.userData.speed = maxspeed;
        }

        deltax = ball.userData.speed * deltatime;
        rotation = deltax / ballDim.radius;

        ball.rotateZ( rotation );
        ball.children[0].rotateX( -rotation );
    }
}
	
    
    
    
