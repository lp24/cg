'use strict'
/***************************************************************************/
/*                                                                         */
/*                             Constant Values                             */
/*                                                                         */
/***************************************************************************/

const pi=Math.PI;


/***************************************************************************/
/*                                                                         */
/*                             Variable Values                             */
/*                                                                         */
/***************************************************************************/

/*
 *  Notice that every variable is declared, but no value is assigned, this is because
 *  upon creating the scene, we assign each value to them, so when we need to reset
 *  everything, we basically just need to create a new scene, because it will
 *  automatically reset all the variables to their starting values.
 */

var scene,
    renderer,
    clock,
    
    materialArrayBasic,
    materialArrayComplex,
    meshArray,
    currentMaterial,
    switchlightcalculus,
    switchwireframe,
        
    updatelight,
    lightArray,
    lightnumber,

    ballStatus,
    ball,
    
    switchpause,
    pause,
    reset; 



/***************************************************************************/
/*                                                                         */
/*                                Functions                                */
/*                                                                         */
/***************************************************************************/

function InitializeGlobalVars(){ //For Reset

    materialArrayBasic 		= [] ;

    materialArrayComplex 	= [] ;

    meshArray				= [] ;

    currentMaterial         = "basic"; //Starts opposite

    updatelight             = false;

    switchlightcalculus     = true;

    switchwireframe			= false;

    switchpause             = false;

    pause                   = false;

    reset                   = false;
}


function switch_Materials() {
	const meshLen_1=meshArray.length-1;
    
    //Switches Material Type
    if(switchlightcalculus){
        if (currentMaterial === "complex"){
            currentMaterial="basic";   //Complex -> Basic
            materialSwitch(materialArrayBasic);
        }
        else if (currentMaterial==="basic"){
            currentMaterial="complex"; //Basic -> Complex
            materialSwitch(materialArrayComplex);
        }
        switchlightcalculus=false;
    }
       	
	//Switches Material Wireframe Value
    if (switchwireframe){        
        for (var i =  0; i < meshLen_1; i++) { //-1 To not change Cube
            materialArrayComplex[i].wireframe = !materialArrayComplex[i].wireframe;
            materialArrayBasic  [i].wireframe = !materialArrayBasic  [i].wireframe;
        }
        for(var j=0;j<6;j++){ //Change Wireframe for each Cube Face
            materialArrayComplex[meshLen_1][j].wireframe = !materialArrayComplex[meshLen_1][j].wireframe;
            materialArrayBasic  [meshLen_1][j].wireframe = !materialArrayBasic  [meshLen_1][j].wireframe;
        }     
        switchwireframe=false;
    }			
}


function materialSwitch(materialArray){
    const meshLen=meshArray.length;
    for (var i =  0; i < meshLen; i++) {
        meshArray[i].material=materialArray[i];
    }
}


function createScene(){

	scene 			        = new THREE.Scene();

	scene.background        = new THREE.Color( 0x5F5F5F );

	clock                   = new THREE.Clock();

    InitializeGlobalVars();

    createCamera();

    createLights();

    createBoard();

    createBall();

    createCube();
}


function render(){

    // Needed to Render Both Scenes
    renderer.clear      ();

	renderer.render     ( scene, camera );


    //Clear Depth Buffer
    renderer.clearDepth ();

    // Render Pause Screen on top of Main Screen
    renderer.render     ( PAUSE_scene, PAUSE_camera);
}


function Update(){
    
    Pause();
    
    Reset();

    UpdateLights();

    switch_Materials();

    controls.update();
    
    
        UpdateBall();
    
}


function Pause(){
    if (switchpause){
        pause=!pause;
        if (pause){
            clock.stop();
            PAUSE_scene.children[1].visible = true;  //Write Message
            ballStatus = ball.userData.acc;
        }
        else{
            clock.start();
            PAUSE_scene.children[1].visible = false; //Hide Message
            ball.userData.acc = ballStatus;
        }
        switchpause=false;
    }
}


function Reset(){
    if (reset){
        reset=false;
        if(pause) {
            createScene();
            PAUSE_scene.children[1].visible = false;
        }
    }
}

    
function animate(){
    
    Update();
    
    render();
    
    requestAnimationFrame(animate);    
}


function init(){
    
	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClear = false;

	document.body.appendChild(renderer.domElement);

	createScene();
	createPauseScreen();
	resize();

	window.addEventListener("resize", onResize);
	window.addEventListener("keydown", onKeyDown,true);
}
