/***************************************************************************/
/*                                                                         */
/*                             Constant Values                             */
/*                                                                         */
/***************************************************************************/

const pi=Math.PI;

const objects = {
	floor : 	null,
	lamp : 		null,
	secretary : null,
	chair : 	null,
}


/***************************************************************************/
/*                                                                         */
/*                             Variable Values                             */
/*                                                                         */
/***************************************************************************/

var scene, renderer;

var materialArray = [];

var wireFrameSwitch = false;

var clock = new THREE.Clock();



/***************************************************************************/
/*                                                                         */
/*                                Functions                                */
/*                                                                         */
/***************************************************************************/

function moveTo (obj,new_position){
	'use strict';

	obj.position.x = new_position.x;
	obj.position.y = new_position.y;
	obj.position.z = new_position.z;
}


function UpdateWireframe() {
	if (wireFrameSwitch){
		materialArray.forEach(
			material => { 
				material.wireframe = !material.wireframe; 
			}
		)
		wireFrameSwitch=false;
	};
}

function createScene(){
	'use strict';

	scene = new THREE.Scene();
	scene.add( new THREE.AxisHelper( 1000 ) );
	scene.background = new THREE.Color( 0x1e1e1e );
	
	createCameras();
	
	objects.floor = createFloor();	

    moveTo( objects.chair = createChair(), chairInitialPosition );
    
    moveTo( objects.secretary = createSecretary(), secretaryInitialPosition );
}

function render(){
	'use strict';
		
	renderer.render( scene, camera );
}

function Update(){

	UpdateChair();
	
	UpdateCamera();
	
	UpdateWireframe();  

}

function animate(){
	'use strict';
	
	Update();
    
	render();

	requestAnimationFrame(animate);
}

function init(){
	'use strict';

	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	createScene();

	window.addEventListener("resize", onResize);
	window.addEventListener("keydown", onKeyDown,true);
	window.addEventListener("keyup", onKeyUp,true);
}
