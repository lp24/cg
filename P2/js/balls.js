//Ball Size
const BallsDim={radius:UpperWallsDim.depth/2}; 
//Balls number
const Balls_nr=2;

//starting speed between min and max
const baseminspeed=100; 
const basemaxspeed=200;

//augment speed variables (augments speed 'plus_speed' each 'timer' seconds)
const plus_speed=5;
const timer=30;
var time_passed=0;

//creates a random position for the balls, within the board limits
function random_ball_position(){
    return {x:randFloat(-FieldBonds.x+BallsDim.radius,FieldBonds.x-BallsDim.radius),  
            y:randFloat(-FieldBonds.y+BallsDim.radius,FieldBonds.y-BallsDim.radius),  
            z:BallsDim.radius};                                                       
}

function createAllBalls(){
    var Balls=new THREE.Object3D();
    for(var i=0;i<Balls_nr;i++){
        createBall(Balls);
    }
    scene.add(Balls);
}

function createBall(obj){
	
    Ball=new THREE.Object3D();
    
    var pos=random_ball_position();
    
	//set position right away to check early if two balls are coliding
    Ball.position.set(pos.x,pos.y,pos.z);
    
    //check if pos doesnt collide with created position    
    for (var i=objects.ballsArray.length-1;i>0;i--){
        if (ballscolision(Ball,objects.ballsArray[i-1])){
            createBall(obj);
            return;
        }
    }   
    
    var speed=randFloat(baseminspeed,basemaxspeed);
    var angle=randFloat(0,2*pi);
    
    Ball.userData = {speed : speed};
   
    Ball.rotateZ(angle);
    
	//creates Mesh to rotate on two Axis
    BallMeshGeometry    = new THREE.SphereGeometry(BallsDim.radius, 16, 16 );
    BallMeshMaterial    = new THREE.MeshBasicMaterial( { color: 'orange', wireframe : true } );
    BallMesh            = new THREE.Mesh( BallMeshGeometry, BallMeshMaterial );
	
	BallMesh.add( new THREE.AxisHelper( 50 ) );
	//pushes to array to hide axis
    AxisArray.push(BallMesh.children[0]);    
    
    Ball.add(BallMesh);   
    obj.add(Ball);
    objects.ballsArray.push(Ball);
}

function UpdateAllBalls(delta){
    time_passed+=delta;    
    //if timer excceded, update all balls speed
    if (time_passed>=timer){
        for(var i=Balls_nr-1;i>=0;i--){
            objects.ballsArray[i].userData.speed+=plus_speed;
        }
        time_passed-=timer;
    }
    
    //updates each balls position, rotation, and checks for colisions
    for(var j=Balls_nr-1;j>=0;j--){
        updateBall(objects.ballsArray[j],j,delta); //pass the j to check colision only with updated balls
    }
}


function updateBall(ball,j,delta){
	var distance=delta*ball.userData.speed;
	//update position
    ball.translateY(distance); 
	//update rotation
	ball.children[0].rotateX(-distance/BallsDim.radius); 
    
    //check colision with walls
    if(wallscolision(ball)){
        treat_wall_colison(ball,j,delta);   
    }
    //check colision with every updated ball
    for(var i=j;i<Balls_nr;i++){
        if(ballscolision(ball,objects.ballsArray[i]) && ball != objects.ballsArray[i] ){
			treat_balls_colision(ball,objects.ballsArray[i],delta,j);
        }
    }
}

//Checks a balls Colisions with all Walls
function wallscolision(ball){
    //Position+radius>Field Bonds
    if((Abs(ball.position.x)+BallsDim.radius>FieldBonds.x)||(Abs(ball.position.y)+BallsDim.radius>FieldBonds.y)){        
        return true;
    }
    else{
        return false;
    }
}

//Checks if 2 balls are coliding with each other
function ballscolision(ball1 , ball2){
     //Distance<Diameter
    if 	(sqrdistance(ball1.position,ball2.position)<squared(BallsDim.radius*2)){        
        return true;
    }
    else{
         return false;
    }

}

function treat_wall_colison(ball,j,delta){
	
  if (Abs(ball.position.x)+BallsDim.radius>FieldBonds.x){
        xout=Abs(ball.position.x)+BallsDim.radius-FieldBonds.x;    			 //How much of the ball passed the wall
        h=Abs(xout/sin(pi-ball.rotation.z));                     			   //distance on the speed angle that passed the wall
        ball.translateY(-h); 											//moves the ball back
        ball.rotateZ(-2*ball.rotation.z);                     			 //puts the ball in the angle after the colision
	}
  
   if (Abs(ball.position.y)+BallsDim.radius>FieldBonds.y){
        yout=Abs(ball.position.y)+BallsDim.radius-FieldBonds.y;    			 //How much of the ball passed the wall
        h=Abs(yout/cos(pi-ball.rotation.z));                     			   //distance on the speed angle that passed the wall
        ball.translateY(-h); 												//moves the ball back
        ball.rotateZ(-2*ball.rotation.z+pi);                     			 //puts the ball in the angle after the colision
   }
   time_since_colision=h/ball.userData.speed;    					 	//How much time passed since the ball hit the wall.
   updateBall(ball,j,time_since_colision);								//does the rest of the movement with the time left
}


const DIVIDE_FRAME=10;
function treat_balls_colision(ball1,ball2,delta,j){      
    var time_slice=delta/DIVIDE_FRAME;
    //puts the balls aproxamitely in the place of contact
    while(ballscolision(ball1,ball2)){
        ball1.translateY(-ball1.userData.speed*time_slice);
        ball2.translateY(-ball2.userData.speed*time_slice);
    }

    //troca vetores
    var angle=ball1.rotation.z;    
    ball1.rotation.z=(ball2.rotation.z);
    ball2.rotation.z=(angle);
}
