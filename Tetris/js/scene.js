'use strict'

const boardDim		= {	width :15, 
						height:20};
						

var scene,renderer;

var clock, camera;

var piece, game, gameMatrix;

var pause=false, reset=false;

function initVars(){
	Yspeed=5;
	Xspeed=10;
	dX=0;
	linesCompleted=0;
	level=1;
	moveLeft=false;
	moveRight=false;
	moveDown=false;
	rotate=false;
	clock.start();
}

function createScene(){
	scene 			        = new THREE.Scene();

	scene.background  		= new THREE.Color( 0x5F5F5F );

	clock					= new THREE.Clock();
	
	createCamera();
		
	createGame();

}

function resetScene(){
	initVars();
	resetMatrix();
	resetPiece();
}

function render(){
	renderer.render( scene, camera );
}

function update(){
	if(!pause){
		updatePiece();
	}
	else{
		clock.getDelta();
		if(reset){
			resetScene();
		}
	}
	reset=false;
}

function animate(){	    
    update();
    
    render();
    
    requestAnimationFrame(animate);    
}

function init(){
	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	createScene();

	window.addEventListener("resize", onResize);
	window.addEventListener("keydown", onKeyDown,true);
	window.addEventListener("keyup", onKeyUp,true);

}
