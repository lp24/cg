/***************************************************************************/
/*                                                                         */
/*                             Constant Values                             */
/*                                                                         */
/***************************************************************************/

/* Object Dimensions for Positions */

const pauseScreenDim		= {	width : 500, height: 250 };

/* Positions accordingly to the Object Graph */

const pauseScreenPosition   = { x: 0,
                                y: -pauseScreenDim.height + 10,
                                z: 0 };

/* PlaneGeometry ( width, height, widthSegments, heightSegments ) */
const pauseScreenGeometry   = new THREE.PlaneGeometry( 500, 250 );

const pauseScreenTexture    = new THREE.TextureLoader().load("textures/screen/pause_screen.png");

const pauseScreenMaterial   = new THREE.MeshBasicMaterial( { map: pauseScreenTexture } );

const PAUSE_scene  = new THREE.Scene();

/***************************************************************************/
/*                                                                         */
/*                                Functions                                */
/*                                                                         */
/***************************************************************************/

function createPauseScreen() { /* Creates Invisible Pause Screen */
    createPauseCamera();

    var pauseMesh           = new THREE.Mesh( pauseScreenGeometry, pauseScreenMaterial );

    pauseMesh.position.copy ( pauseScreenPosition );

    pauseMesh.visible       = false;

    PAUSE_scene.add         (pauseMesh);
}
