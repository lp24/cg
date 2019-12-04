/***************************************************************************/
/*                                                                         */
/*                             Constant Values                             */
/*                                                                         */
/***************************************************************************/

const pointlightPosition = {  x:0,
                              y:0,
                              z:1000 };

const light_intensity    = [ 1, 3 ];


/***************************************************************************/
/*                                                                         */
/*                                Functions                                */
/*                                                                         */
/***************************************************************************/

function createLights (){

    lightArray = [];

    /* DirectionalLight( Color, Intensity ) */
	var directionalLight    = new THREE.DirectionalLight( 0xffffff, light_intensity[0] );

	directionalLight.position.set( 0, -1, 1 );

	lightArray.push         ( directionalLight );

	scene.add               ( directionalLight );
    
    /* PointLight( color, intensity, distance, decay) */
    var pointlight          = new THREE.PointLight( 0xffffff, light_intensity[1], 1250, 1 );
    
    lightArray.push         ( pointlight );
    
    pointlight.position.copy( pointlightPosition );
    
    scene.add               ( pointlight );
} 


function UpdateLights(){
    if ( updatelight && currentMaterial === "complex"){
        if ( lightArray[lightnumber].intensity === 0 ){
            lightArray[lightnumber].intensity = light_intensity[lightnumber];
        }
        else{
            lightArray[lightnumber].intensity = 0;
        }
    }
    updatelight = false;
}
