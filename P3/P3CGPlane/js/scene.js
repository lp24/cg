const pi=Math.PI;

/***************************************************************************/
/*                                                                         */
/*                             Variable Values                             */
/*                                                                         */
/***************************************************************************/

var scene, renderer;

var clock 					= new THREE.Clock();

var materialArrayBasic 		= [] ;

var materialArrayPhong 		= [] ;

var materialArrayLambert 	= [] ; 

var meshArray				= [] ;

var currentMaterial			= "lambert"; //Starts opposite

var materialSwitch 			= true ;

var lightStatus 			= true;

//EXTRA
var switchwireframe			= false;

var meshToSwitch			= [0,1,2,9,10,11,12,13,14,15]; //Because diferent meshes have same material

var moveplane				= false;

/***************************************************************************/
/*                                                                         */
/*                                Functions                                */
/*                                                                         */
/***************************************************************************/

function switchMaterial() {
	const meshLen=meshArray.length;
	if(materialSwitch){
        if(!lightStatus){ //Turns off light calculus -> Basic Material
            currentMaterial = "basic";
            for (var i =  0; i < meshLen; i++) {
                meshArray[i].material=materialArrayBasic[i];
            }
        }
        else{ //Changes Gourard<->Phong (if Basic->Gourard)
            if(currentMaterial=="lambert"){
                currentMaterial = "phong";
                for (i =  0; i < meshLen; i++) {
                    meshArray[i].material=materialArrayPhong[i];
                }
            }
            else{
                currentMaterial = "lambert";
                 for (i =  0; i < meshLen; i++) {
                    meshArray[i].material=materialArrayLambert[i];
                }
            }
        }
	materialSwitch = false;
	}
	
	//Extra->if Basic Material, switches wireframe
	if (switchwireframe){
		if(currentMaterial=="basic"){
			for (i =  0; i < meshToSwitch.length; i++) {
                meshArray[meshToSwitch[i]].material.wireframe= !meshArray[meshToSwitch[i]].material.wireframe;
            }
		}
		switchwireframe=false;
	}			
}

function createDirectionalLight (){

    //DirectionalLight(Color,Intensity)
	var directionalLight = new THREE.DirectionalLight( 0xffffff, light_intensity[0] );

	directionalLight.position.set(0,0,1);

	LightArray.push(directionalLight);

	scene.add( directionalLight );

}

function createScene(){
	'use strict';

	scene 			 = new THREE.Scene();

	scene.background = new THREE.Color( 0x1e1e1e );
	
	createCamera();
	
	createDirectionalLight();

	createFloor();
	
	createAllLamps();

	createPlane();
}

function render(){
	'use strict';
		
	renderer.render( scene, camera );
}

function Update(){

	UpdatePlane();

	UpdateLights();
	
	switchMaterial();
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
