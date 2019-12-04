'use strict'

var black=new THREE.Color("black");
var Yspeed,Xspeed,dX,linesCompleted,level;

const gamePosition={x:-boardDim.width/2,
					y:-boardDim.height/2,
					z:0};


function checkGameOver(){
	for(var i=0;i<piece.children.length;i++){
		var y=Math.floor(getPosition(i).y);
		if(y==boardDim.height){
			return true;
		}
	}
	return false;
}

function gameOver(){
	clock.stop();
	console.log("GAME OVER");
	console.log("LINES COMPLETED:", linesCompleted);
	pause=true;
}
			
function createGame(){
	initVars();
	game=new THREE.Object3D();
	game.position.copy(gamePosition);
	scene.add(game);
	createMatrix();
	createPiece();
}	

function createMatrix(){
	gameMatrix=new THREE.Object3D();
	for (var i=0;i<boardDim.height;i++){            
		for (var j=0;j<boardDim.width;j++){            
			var pixel= new THREE.Mesh(  new THREE.BoxGeometry(1, 1, 1),
										new THREE.MeshBasicMaterial({color:black})
									 );
			pixel.position.set(j+0.5,i+0.5,0);
			gameMatrix.add(pixel);
		}
	}
	game.add(gameMatrix);
}

function updateGame(){
	for (var i=boardDim.height-1;i>=0;i--){  
		if(lineComplete(i)){
			linesCompleted+=1;
			console.log("linesCompleted:", linesCompleted);

			if(linesCompleted>level*5){
				level+=1;
				Yspeed+=2;
				Xspeed+=2;
				console.log("Level:", level);
			}				
			removeLine(i);
		}
	}
}

function lineComplete(i){
	for(var j=0;j<boardDim.width;j++){
		if(gameMatrix.children[i*boardDim.width+j].material.color.equals(black)){
			return false;
		}
	}
	return true;
}

function removeLine(i){
	for (var k=i;k<boardDim.height;k++){
		for(var j=0;j<boardDim.width;j++){
			if(k==boardDim.height-1){
				gameMatrix.children[k    *boardDim.width+j].material.color=black;
			}
			else{
				gameMatrix.children[k    *boardDim.width+j].material.color=
				gameMatrix.children[(k+1)*boardDim.width+j].material.color;
			}
		}
	}
}

function resetMatrix(){
	for(var i=0;i<boardDim.height*boardDim.width;i++){
		gameMatrix.children[i].material.color=black;
	}
}