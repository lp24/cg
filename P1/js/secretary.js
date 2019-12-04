/***************************************************************************/
/*                                                                         */
/*                             Constant Values                             */
/*                                                                         */
/***************************************************************************/

const secretaryInitialPosition = { x: ( viewSize / 2 ) - ( tableTopDim.width / 2 ) - 10,
                                   y: ( viewSize / 2 ) - ( tableTopDim.height / 2 ) - 10,
                                   z:  0 }; 



/***************************************************************************/
/*                                                                         */
/*                             Variable Values                             */
/*                                                                         */
/***************************************************************************/

var secretary = new THREE.Object3D();



/***************************************************************************/
/*                                                                         */
/*                                Functions                                */
/*                                                                         */
/***************************************************************************/

function createSecretary(){
    'use strict';  
	
    createTable(secretary);
    moveTo( objects.lamp   = createLamp(secretary),  lampInitialPosition );
	
    scene.add( secretary );

    return secretary;
}