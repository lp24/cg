'use strict'

var moveLeft, moveRight, moveDown, rotate;

const iPosition={	x:boardDim.width/2,
					y:boardDim.height+1,
					z:1};
					
function createPiece(){
	piece=new THREE.Object3D();
	piece.position.copy(iPosition);

	var pieceNr=getRandom(1,6);
	switch(pieceNr){
		case 1:
			createPiece1();
			break;
		case 2:
			createPiece2();
			break;
		case 3:
			createPiece3();
			break;
		case 4:
			createPiece4();
			break;
		case 5:
			createPiece5();
			break;
		case 6:
			createPiece6();
	}
	
	game.add( piece );
}

function resetPiece(){
	piece.visible=false;
	createPiece();
}

function updatePiece(){
	var deltaT=clock.getDelta();
	var deltaY=deltaT*Yspeed;
	var deltaX=deltaT*Xspeed;
	
	if(moveLeft){
		dX-=deltaX;
	}
	if(moveRight){
		dX+=deltaX;
	}
	
	if(rotate){
		if(tryRotate()){
			deltaY=deltaY/2;
		}
		rotate=false;
	}
	
	piece.position.y-=deltaY;

	if(dX>=1){
		if(!rightColision()){
			piece.position.x+=1;
			dX-=1;
		}
		else{
			dX=0.9;
		}
	}
	else if(dX<=-1){
		if(!leftColision()){
			piece.position.x-=1;
			dX+=1;
		}
		else{
			dX=-0.9;
		}
	}	
	
	if(moveDown){
		if(!downColision()){
			piece.position.y-=1;
		}
	}
	
	if(downColision()){
		updateGame();
		createPiece();
		moveDown=false;
	}
}

function downColision(){
	for(var i=0;i<piece.children.length;i++){
		var pos=getPosition(i);
		var y=Math.floor(pos.y);
		if(y<=boardDim.height){
			var tile=Math.round((y-1)*boardDim.width+pos.x-0.5);
			if(y<=0){
				paintMatrix();
				piece.visible=false;
				return true;
			}
			if(!gameMatrix.children[tile].material.color.equals(black)){
				if(checkGameOver()){
					gameOver();
					return false;
				}
				else{
					paintMatrix();
					piece.visible=false;
					return true;
				}

			}
		}
	}
	return false;
}

function leftColision(){
	for(var i=0;i<piece.children.length;i++){
		var pos = getPosition(i);
		if(pos.x<=0.5){
			return true;
		}
		
		var y=Math.floor(pos.y);
		if(y<boardDim.height){
			var tile=Math.round(y*boardDim.width+pos.x-0.5-1);
			if(!gameMatrix.children[tile].material.color.equals(black)){
				return true;
			}
		}
	}
	return false;
}
function rightColision(){
	for(var i=0;i<piece.children.length;i++){
		var pos=getPosition(i);
		if( pos.x>=boardDim.width-0.5){
			return true;
		}
		
		var y=Math.floor(pos.y);
		if(y<boardDim.height){
			var tile=Math.round(y*boardDim.width+pos.x-0.5+1);
			if(!gameMatrix.children[tile].material.color.equals(black)){
				return true;
			}
		}
	}
	return false;
}
	
function paintMatrix(){
	for(var i=0;i<piece.children.length;i++){
		var pos=getPosition(i);
		var y=Math.floor(pos.y);
		var tile=Math.round(y*boardDim.width+pos.x-0.5);
		gameMatrix.children[tile].material.color=piece.children[i].material.color;
	}
}

function tryRotate(){
	piece.rotateZ(-Math.PI/2);
	for(var i=0;i<piece.children.length;i++){
		var pos=getPosition(i);
		var y=Math.floor(pos.y);
		var tile=Math.round(y*boardDim.width+pos.x-0.5);
		if(y<boardDim.height){
			if(pos.y<0.5|| 
				pos.x<0.5 || 
				pos.x>boardDim.width-0.5 || 
				!gameMatrix.children[tile].material.color.equals(black)){
					piece.rotateZ(Math.PI/2);
					return false;
			}
		}
	}
	return true;
}

function getPosition(i){
	piece.updateMatrixWorld();
	var vector=new THREE.Vector3();
	vector.setFromMatrixPosition( piece.children[i].matrixWorld);
	vector.add({x:game.position.x*-1, y:game.position.y*-1, z:game.position.z*-1});
	return vector;
}


	
function createPiece1(){ //I
	var c="red";
	
	var block1=new THREE.Mesh(  new THREE.BoxGeometry(1, 1, 1),
							new THREE.MeshBasicMaterial({color:c})
						);
	var block2=new THREE.Mesh(  new THREE.BoxGeometry(1, 1, 1),
							new THREE.MeshBasicMaterial({color:c})
						);
	var block3=new THREE.Mesh(  new THREE.BoxGeometry(1, 1, 1),
							new THREE.MeshBasicMaterial({color:c})
						);
	var block4=new THREE.Mesh(  new THREE.BoxGeometry(1, 1, 1),
							new THREE.MeshBasicMaterial({color:c})
						);
	block2.position.y=1;
	block3.position.y=2;
	block4.position.y=-1;
	piece.add(block1);
	piece.add(block2);
	piece.add(block3);
	piece.add(block4);
}

function createPiece2(){ //square
	var c="blue";
	
	var block1=new THREE.Mesh(  new THREE.BoxGeometry(1, 1, 1),
							new THREE.MeshBasicMaterial({color:c})
						);
	var block2=new THREE.Mesh(  new THREE.BoxGeometry(1, 1, 1),
							new THREE.MeshBasicMaterial({color:c})
						);
	var block3=new THREE.Mesh(  new THREE.BoxGeometry(1, 1, 1),
							new THREE.MeshBasicMaterial({color:c})
						);
	var block4=new THREE.Mesh(  new THREE.BoxGeometry(1, 1, 1),
							new THREE.MeshBasicMaterial({color:c})
						);
	block1.position.x=0.5;
	block1.position.y=0.5;
	
	block2.position.x=0.5;
	block2.position.y=-0.5;
	
	block3.position.x=-0.5;
	block3.position.y=0.5
	
	block4.position.x=-0.5;
	block4.position.y=-0.5;
	
	piece.add(block1);
	piece.add(block2);
	piece.add(block3);
	piece.add(block4);
	
	piece.position.x+=0.5;
}

function createPiece3(){ //L
	var c="orange";
	
	var block1=new THREE.Mesh(  new THREE.BoxGeometry(1, 1, 1),
							new THREE.MeshBasicMaterial({color:c})
						);
	var block2=new THREE.Mesh(  new THREE.BoxGeometry(1, 1, 1),
							new THREE.MeshBasicMaterial({color:c})
						);
	var block3=new THREE.Mesh(  new THREE.BoxGeometry(1, 1, 1),
							new THREE.MeshBasicMaterial({color:c})
						);
	var block4=new THREE.Mesh(  new THREE.BoxGeometry(1, 1, 1),
							new THREE.MeshBasicMaterial({color:c})
						);
	
	block2.position.y=-1;
	
	block3.position.y=1;
	
	block4.position.x=1;
	block4.position.y=1;
	
	piece.add(block1);
	piece.add(block2);
	piece.add(block3);
	piece.add(block4);
}

function createPiece4(){
	var c="white";
	
	var block1=new THREE.Mesh(  new THREE.BoxGeometry(1, 1, 1),
							new THREE.MeshBasicMaterial({color:c})
						);
	var block2=new THREE.Mesh(  new THREE.BoxGeometry(1, 1, 1),
							new THREE.MeshBasicMaterial({color:c})
						);
	var block3=new THREE.Mesh(  new THREE.BoxGeometry(1, 1, 1),
							new THREE.MeshBasicMaterial({color:c})
						);
	var block4=new THREE.Mesh(  new THREE.BoxGeometry(1, 1, 1),
							new THREE.MeshBasicMaterial({color:c})
						);
	
	block2.position.y=-1;
	
	block3.position.y=1;
	
	block4.position.x=-1;
	block4.position.y=1;
	
	piece.add(block1);
	piece.add(block2);
	piece.add(block3);
	piece.add(block4);
}

function createPiece5(){ //N
	var c="yellow";
	
	var block1=new THREE.Mesh(  new THREE.BoxGeometry(1, 1, 1),
							new THREE.MeshBasicMaterial({color:c})
						);
	var block2=new THREE.Mesh(  new THREE.BoxGeometry(1, 1, 1),
							new THREE.MeshBasicMaterial({color:c})
						);
	var block3=new THREE.Mesh(  new THREE.BoxGeometry(1, 1, 1),
							new THREE.MeshBasicMaterial({color:c})
						);
	var block4=new THREE.Mesh(  new THREE.BoxGeometry(1, 1, 1),
							new THREE.MeshBasicMaterial({color:c})
						);
	
	block2.position.y=-1;
	
	block3.position.x=1;
	
	block4.position.x=1;
	block4.position.y=1;
	
	piece.add(block1);
	piece.add(block2);
	piece.add(block3);
	piece.add(block4);
}

function createPiece6(){
	var c="green";
	
	var block1=new THREE.Mesh(  new THREE.BoxGeometry(1, 1, 1),
							new THREE.MeshBasicMaterial({color:c})
						);
	var block2=new THREE.Mesh(  new THREE.BoxGeometry(1, 1, 1),
							new THREE.MeshBasicMaterial({color:c})
						);
	var block3=new THREE.Mesh(  new THREE.BoxGeometry(1, 1, 1),
							new THREE.MeshBasicMaterial({color:c})
						);
	var block4=new THREE.Mesh(  new THREE.BoxGeometry(1, 1, 1),
							new THREE.MeshBasicMaterial({color:c})
						);
	
	block2.position.y=-1;
	block2.position.x=1;
	
	block3.position.x=1;
	
	block4.position.y=1;
	
	piece.add(block1);
	piece.add(block2);
	piece.add(block3);
	piece.add(block4);
}

function getRandom(min,max){
	return Math.floor(Math.random()*(max-min+1))+min;
}
	
	
