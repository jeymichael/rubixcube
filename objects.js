import * as THREE from 'three';

var theCubeHighlight, geometry, plane;
var cubeDebug = false;
var gLCArrowRight, gLCArrowLeft, gLCArrowUp, gLCArrowDown;
var gRCArrowRight, gRCArrowLeft, gRCArrowUp, gRCArrowDown;
var W = 0.25, WHALF = W / 2.0;
var w = W / 3.0, whalf = w / 2.0;
var torusL, torusR;

var redMaterial = new THREE.MeshPhongMaterial({ 
    color: 0xff0000, 
    emissive: 0x000000,
    side: THREE.DoubleSide 
});
var whiteMaterial = new THREE.MeshPhongMaterial({ 
    color: 0xffffff, 
    emissive: 0x000000,
    side: THREE.DoubleSide 
});
var yellowMaterial = new THREE.MeshPhongMaterial({ 
    color: 0xffff00, 
    emissive: 0x000000,
    side: THREE.DoubleSide 
});
var orangeMaterial = new THREE.MeshPhongMaterial({ 
    color: 0xffa500, 
    emissive: 0x000000,
    side: THREE.DoubleSide 
});
var blueMaterial = new THREE.MeshPhongMaterial({ 
    color: 0x0000ff, 
    emissive: 0x000000,
    side: THREE.DoubleSide 
});
var greenMaterial = new THREE.MeshPhongMaterial({ 
    color: 0x00ff00, 
    emissive: 0x000000,
    side: THREE.DoubleSide 
});

var
  sideF = new Array(9),
  sideB = new Array(9),
  sideR = new Array(9),
  sideL = new Array(9),
  sideD = new Array(9),
  sideU = new Array(9);

function createBaseCube()
{
  geometry = new THREE.BoxGeometry( 0.082, 0.082, 0.082 );
  // const blackMaterial = new THREE.MeshBasicMaterial( {color: 0x000000, transparent:false, opacity:1.0, side: /*false*/THREE.DoubleSide} );
  const blackMaterial = new THREE.MeshPhongMaterial( {color: 0x000000, flatShading: true} );
  const baseCube = new THREE.Mesh(geometry, blackMaterial);
  return baseCube;
}

function createRedSquare() {
  geometry = new THREE.PlaneGeometry( 0.08, 0.08 );
  plane = new THREE.Mesh( geometry, redMaterial );
  plane.rotation.set(  0, 0, 0 );
  plane.position.set( 0, 0, WHALF );
  return plane;
}
function createYellowSquare() {
  geometry = new THREE.PlaneGeometry( 0.08, 0.08 );
  plane = new THREE.Mesh( geometry, yellowMaterial );
  plane.rotation.set(  0, Math.PI/2.0, 0 );
  plane.position.set( WHALF, 0, 0 );
  return plane;
}
function createWhiteSquare() {
  geometry = new THREE.PlaneGeometry( 0.08, 0.08 );
  plane = new THREE.Mesh( geometry, whiteMaterial );
  plane.rotation.set(  0, -Math.PI/2.0, 0 );
  plane.position.set( -WHALF, 0, 0 );
  return plane;
}
function createOrangeSquare() {
  geometry = new THREE.PlaneGeometry( 0.08, 0.08 );
  plane = new THREE.Mesh( geometry, orangeMaterial );
  plane.rotation.set(  0, Math.PI, 0 );
  plane.position.set( 0, 0, -WHALF );
  return plane;
}
function createGreenSquare() {
  geometry = new THREE.PlaneGeometry( 0.08, 0.08 );
  plane = new THREE.Mesh( geometry, greenMaterial );
  plane.rotation.set(  Math.PI/2.0, 0, 0 );
  plane.position.set( 0, -WHALF, 0 );
  return plane;
}
function createBlueSquare() {
  geometry = new THREE.PlaneGeometry( 0.08, 0.08 );
  plane = new THREE.Mesh( geometry, blueMaterial );
  plane.rotation.set( -Math.PI/2.0, 0, 0 );
  plane.position.set( 0, WHALF, 0 );
  return plane;
}

function createRAxis(group) {
  var pieceAxis = new THREE.Group();
  pieceAxis.name = "centerPiece";
  var square = createRedSquare();
  pieceAxis.add(square);
  var bc = createBaseCube();
  bc.position.set( 0, 0, w );
  pieceAxis.add(bc);
  group.add(pieceAxis);
  sideF[4] = pieceAxis;
}
function createYAxis(group) {
  var pieceAxis = new THREE.Group();
  pieceAxis.name = "centerPiece";
  var square = createYellowSquare();
  pieceAxis.add(square);
  var bc = createBaseCube();
  bc.position.set( w, 0, 0 );
  pieceAxis.add(bc);
  group.add(pieceAxis);
  sideR[4] = pieceAxis;
}
function createWAxis(group) {
  var pieceAxis = new THREE.Group();
  pieceAxis.name = "centerPiece";
  var square = createWhiteSquare();
  pieceAxis.add(square);
  var bc = createBaseCube();
  bc.position.set( -w, 0, 0 );
  pieceAxis.add(bc);
  group.add(pieceAxis);
  sideL[4] = pieceAxis;
}
function createGAxis(group) {
  var pieceAxis = new THREE.Group();
  pieceAxis.name = "centerPiece";
  var square = createGreenSquare();
  pieceAxis.add(square);
  var bc = createBaseCube();
  bc.position.set( 0, -w, 0 );
  pieceAxis.add(bc);
  group.add(pieceAxis);
  sideD[4] = pieceAxis;
}
function createOAxis(group) {
  var pieceAxis = new THREE.Group();
  pieceAxis.name = "centerPiece";
  var square = createOrangeSquare();
  pieceAxis.add(square);
  var bc = createBaseCube();
  bc.position.set( 0, 0, -w );
  pieceAxis.add(bc);
  group.add(pieceAxis);
  sideB[4] = pieceAxis;
}
function createBAxis(group) {
  var pieceAxis = new THREE.Group();
  pieceAxis.name = "centerPiece";
  var square = createBlueSquare();
  pieceAxis.add(square);
  var bc = createBaseCube();
  bc.position.set( 0, w, 0 );
  pieceAxis.add(bc);
  group.add(pieceAxis);
  sideU[4] = pieceAxis;
}

function createRYEdge(group) {
  var pieceEdge = new THREE.Group();
  pieceEdge.name = "edgePiece";
  var r = createRedSquare();
  r.position.set( w, 0, WHALF );
  pieceEdge.add(r);
  var y = createYellowSquare();
  y.position.set(  WHALF, 0, w );
  pieceEdge.add(y);
  var bc = createBaseCube();
  bc.position.set( w, 0, w );
  pieceEdge.add(bc);
  group.add(pieceEdge);
  sideF[5] = sideR[3] = pieceEdge;
}
function createRWEdge(group) {
  var pieceEdge = new THREE.Group();
  pieceEdge.name = "edgePiece";
  var r = createRedSquare();
  r.position.set( -w, 0, WHALF );
  pieceEdge.add(r);
  var ww = createWhiteSquare();
  ww.position.set( -WHALF, 0, w );
  pieceEdge.add(ww);
  var bc = createBaseCube();
  bc.position.set( -w, 0, w );
  pieceEdge.add(bc);
  group.add(pieceEdge);
  sideF[3] = sideL[5] = pieceEdge;
}
function createRBEdge(group) {
  var pieceEdge = new THREE.Group();
  pieceEdge.name = "edgePiece";
  var r = createRedSquare();
  r.position.set(  0, w, WHALF );
  pieceEdge.add(r);
  var bb = createBlueSquare();
  bb.position.set( 0, WHALF, w );
  pieceEdge.add(bb);
  var bc = createBaseCube();
  bc.position.set( 0, w, w );
  pieceEdge.add(bc);
  group.add(pieceEdge);
  sideF[1] = sideU[7] = pieceEdge;
}
function createRGEdge(group) {
  var pieceEdge = new THREE.Group();
  pieceEdge.name = "edgePiece";
  var r = createRedSquare();
  r.position.set(  0, -w, WHALF );
  pieceEdge.add(r);
  var gg = createGreenSquare();
  gg.position.set( 0, -WHALF, w );
  pieceEdge.add(gg);
  var bc = createBaseCube();
  bc.position.set( 0, -w, w );
  pieceEdge.add(bc);
  group.add(pieceEdge);
  sideF[7] = sideD[1] = pieceEdge;
}
function createGYEdge(group) {
  var pieceEdge = new THREE.Group();
  pieceEdge.name = "edgePiece";
  var gg = createGreenSquare();
  gg.position.set( w, -WHALF, 0 );
  pieceEdge.add(gg);
  var y = createYellowSquare();
  y.position.set(  WHALF, -w, 0 );
  pieceEdge.add(y);
  var bc = createBaseCube();
  bc.position.set( w, -w, 0 );
  pieceEdge.add(bc);
  group.add(pieceEdge);
  sideD[5] = sideR[7] = pieceEdge;
}
function createGWEdge(group) {
  var pieceEdge = new THREE.Group();
  pieceEdge.name = "edgePiece";
  var gg = createGreenSquare();
  gg.position.set( -w, -WHALF, 0 );
  pieceEdge.add(gg);
  var ww = createWhiteSquare();
  ww.position.set( -WHALF, -w, 0 );
  pieceEdge.add(ww);
  var bc = createBaseCube();
  bc.position.set( -w, -w, 0 );
  pieceEdge.add(bc);
  group.add(pieceEdge);
  sideD[3] = sideL[7] = pieceEdge;
}
function createBYEdge(group) {
  var pieceEdge = new THREE.Group();
  pieceEdge.name = "edgePiece";
  var b = createBlueSquare();
  b.position.set( w, WHALF, 0 );
  pieceEdge.add(b);
  var y = createYellowSquare();
  y.position.set(  WHALF, w, 0 );
  pieceEdge.add(y);
  var bc = createBaseCube();
  bc.position.set( w, w, 0 );
  pieceEdge.add(bc);
  group.add(pieceEdge);
  sideU[5] = sideR[1] = pieceEdge;
}
function createBWEdge(group) {
  var pieceEdge = new THREE.Group();
  pieceEdge.name = "edgePiece";
  var b = createBlueSquare();
  b.position.set( -w, WHALF, 0 );
  pieceEdge.add(b);
  var ww = createWhiteSquare();
  ww.position.set( -WHALF, w, 0 );
  pieceEdge.add(ww);
  var bc = createBaseCube();
  bc.position.set( -w, w, 0 );
  pieceEdge.add(bc);
  group.add(pieceEdge);
  sideU[3] = sideL[1] = pieceEdge;
}
function createOYEdge(group) {
  var pieceEdge = new THREE.Group();
  pieceEdge.name = "edgePiece";
  var o = createOrangeSquare();
  o.position.set( w, 0, -WHALF );
  pieceEdge.add(o);
  var y = createYellowSquare();
  y.position.set(  WHALF, 0, -w );
  pieceEdge.add(y);
  var bc = createBaseCube();
  bc.position.set( w, 0, -w );
  pieceEdge.add(bc);
  group.add(pieceEdge);
  sideB[5] = sideR[5] = pieceEdge;
}
function createOWEdge(group) {
  var pieceEdge = new THREE.Group();
  pieceEdge.name = "edgePiece";
  var o = createOrangeSquare();
  o.position.set( -w, 0, -WHALF );
  pieceEdge.add(o);
  var ww = createWhiteSquare();
  ww.position.set( -WHALF, 0, -w );
  pieceEdge.add(ww);
  var bc = createBaseCube();
  bc.position.set( -w, 0, -w );
  pieceEdge.add(bc);
  group.add(pieceEdge);
  sideB[3] = sideL[3] = pieceEdge;
}
function createOBEdge(group) {
  var pieceEdge = new THREE.Group();
  pieceEdge.name = "edgePiece";
  var o = createOrangeSquare();
  o.position.set( 0, w, -WHALF );
  pieceEdge.add(o);
  var blue = createBlueSquare();
  blue.position.set( 0, WHALF, -w );
  pieceEdge.add(blue);
  var bc = createBaseCube();
  bc.position.set( 0, w, -w );
  pieceEdge.add(bc);
  group.add(pieceEdge);
  sideB[7] = sideU[1] = pieceEdge;
}
function createOGEdge(group) {
  var pieceEdge = new THREE.Group();
  pieceEdge.name = "edgePiece";
  var o = createOrangeSquare();
  o.position.set( 0, -w, -WHALF );
  pieceEdge.add(o);
  var gg = createGreenSquare();
  gg.position.set( 0, -WHALF, -w );
  pieceEdge.add(gg);
  var bc = createBaseCube();
  bc.position.set( 0, -w, -w );
  pieceEdge.add(bc);
  group.add(pieceEdge);
  sideB[1] = sideD[7] = pieceEdge;
}

function createRYGCorner(group) {
  var pieceCorner = new THREE.Group();
  pieceCorner.name = "cornerPiece";
  var r = createRedSquare();
  r.position.set(  w, -w, WHALF );
  pieceCorner.add(r);
  var y = createYellowSquare();
  y.position.set(  WHALF, -w, w );
  pieceCorner.add(y);
  var gg = createGreenSquare();
  gg.position.set(  w, -WHALF, w );
  pieceCorner.add(gg);
  var bc = createBaseCube();
  bc.position.set( w, -w, w );
  pieceCorner.add(bc);
  group.add(pieceCorner);
  sideF[8] = sideR[6] = sideD[2] = pieceCorner;
}
function createRWGCorner(group) {
  var pieceCorner = new THREE.Group();
  pieceCorner.name = "cornerPiece";
  var r = createRedSquare();
  r.position.set(  -w, -w, WHALF );
  pieceCorner.add(r);
  var ww = createWhiteSquare();
  ww.position.set(  -WHALF, -w, w );
  pieceCorner.add(ww);
  var gg = createGreenSquare();
  gg.position.set(  -w, -WHALF, w );
  pieceCorner.add(gg);
  var bc = createBaseCube();
  bc.position.set( -w, -w, w );
  pieceCorner.add(bc);
  group.add(pieceCorner);
  sideF[6] = sideL[8] = sideD[0] = pieceCorner;
}
function createRYBCorner(group) {
  var pieceCorner = new THREE.Group();
  pieceCorner.name = "cornerPiece";
  var r = createRedSquare();
  r.position.set(  w, w, WHALF );
  pieceCorner.add(r);
  var y = createYellowSquare();
  y.position.set(  WHALF, w, w );
  pieceCorner.add(y);
  var b = createBlueSquare();
  b.position.set(  w, WHALF, w );
  pieceCorner.add(b);
  var bc = createBaseCube();
  bc.position.set( w, w, w );
  pieceCorner.add(bc);
  group.add(pieceCorner);
  sideF[2] = sideR[0] = sideU[8] = pieceCorner;
}
function createRWBCorner(group) {
  var pieceCorner = new THREE.Group();
  pieceCorner.name = "cornerPiece";
  var r = createRedSquare();
  r.position.set(  -w, w, WHALF );
  pieceCorner.add(r);
  var ww = createWhiteSquare();
  ww.position.set(  -WHALF, w, w );
  pieceCorner.add(ww);
  var b = createBlueSquare();
  b.position.set(  -w, WHALF, w );
  pieceCorner.add(b);
  var bc = createBaseCube();
  bc.position.set( -w, w, w );
  pieceCorner.add(bc);
  group.add(pieceCorner);
  sideF[0] = sideL[2] = sideU[6] = pieceCorner;
}
function createOYGCorner(group) {
  var pieceCorner = new THREE.Group();
  pieceCorner.name = "cornerPiece";
  var o = createOrangeSquare();
  o.position.set(  w, -w, -WHALF );
  pieceCorner.add(o);
  var y = createYellowSquare();
  y.position.set(  WHALF, -w, -w );
  pieceCorner.add(y);
  var gg = createGreenSquare();
  gg.position.set(  w, -WHALF, -w );
  pieceCorner.add(gg);
  var bc = createBaseCube();
  bc.position.set( w, -w, -w );
  pieceCorner.add(bc);
  group.add(pieceCorner);
  sideB[2] = sideR[8] = sideD[8] = pieceCorner;
}
function createOWGCorner(group) {
  var pieceCorner = new THREE.Group();
  pieceCorner.name = "cornerPiece";
  var o = createOrangeSquare();
  o.position.set(  -w, -w, -WHALF );
  pieceCorner.add(o);
  var ww = createWhiteSquare();
  ww.position.set(  -WHALF, -w, -w );
  pieceCorner.add(ww);
  var gg = createGreenSquare();
  gg.position.set(  -w, -WHALF, -w );
  pieceCorner.add(gg);
  var bc = createBaseCube();
  bc.position.set( -w, -w, -w );
  pieceCorner.add(bc);
  group.add(pieceCorner);
  sideB[0] = sideL[6] = sideD[6] = pieceCorner;
}
function createOYBCorner(group) {
  var pieceCorner = new THREE.Group();
  pieceCorner.name = "cornerPiece";
  var o = createOrangeSquare();
  o.position.set(  w, w, -WHALF );
  pieceCorner.add(o);
  var y = createYellowSquare();
  y.position.set(  WHALF, w, -w );
  pieceCorner.add(y);
  var b = createBlueSquare();
  b.position.set(  w, WHALF, -w );
  pieceCorner.add(b);
  var bc = createBaseCube();
  bc.position.set( w, w, -w );
  pieceCorner.add(bc);
  group.add(pieceCorner);
  sideB[8] = sideR[2] = sideU[2] = pieceCorner;
}
function createOWBCorner(group) {
  var pieceCorner = new THREE.Group();
  pieceCorner.name = "cornerPiece";
  var o = createOrangeSquare();
  o.position.set(  -w, w, -WHALF );
  pieceCorner.add(o);
  var ww = createWhiteSquare();
  ww.position.set(  -WHALF, w, -w );
  pieceCorner.add(ww);
  var b = createBlueSquare();
  b.position.set(  -w, WHALF, -w );
  pieceCorner.add(b);
  var bc = createBaseCube();
  bc.position.set( -w, w, -w );
  pieceCorner.add(bc);
  group.add(pieceCorner);
  sideB[6] = sideL[0] = sideU[0] = pieceCorner;
}
function createtheCubeHighlight(group) {
  var geometry = new THREE.BoxGeometry( W, W, W );
  var material = new THREE.MeshBasicMaterial( { color: 0xffffff, transparent:true, opacity:0.5} );
  var cube = new THREE.Mesh( geometry, material );
  cube.scale.set( 1.01, 1.01, 1.01 );
  group.add(cube);
  theCubeHighlight = cube;
  theCubeHighlight.visible = false;
  return cube;
}

export function createTheCube() {
  var group = new THREE.Group();

  // Single-Face: Create  6 center cubes (G, B, R, Y, O, W)
  createRAxis(group);
  createYAxis(group);
  createWAxis(group);
  createGAxis(group);
  createOAxis(group);
  createBAxis(group);

  // Double-Face: Create 12 edge cubes ()
  createRYEdge(group);
  createRWEdge(group);
  createRBEdge(group);
  createRGEdge(group);
  createGYEdge(group);
  createGWEdge(group);
  createBYEdge(group);
  createBWEdge(group);
  createOYEdge(group);
  createOWEdge(group);
  createOBEdge(group);
  createOGEdge(group);

  // Triple-Face: Create  8 corner cubes ()
  createRYGCorner(group);
  createRWGCorner(group);
  createRYBCorner(group);
  createRWBCorner(group);
  createOYGCorner(group);
  createOWGCorner(group);
  createOYBCorner(group);
  createOWBCorner(group);

  //createtheCubeHighlight(group);
  group.position.set( 0, 1.35, -0.75 );
  group.scale.set( 0.5, 0.5, 0.5 );

  var g1 = new THREE.TorusGeometry( .1, 0.03, 4, 20 );
  var m1 = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
  torusL = new THREE.Mesh( g1, m1 );
  var g2 = new THREE.TorusGeometry( .1, 0.03, 4, 20 );
  var m2 = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
  torusR = new THREE.Mesh( g2, m2 );
  group.add(torusL);
  group.add(torusR);
  if (!cubeDebug) {
    torusL.visible = false;
    torusR.visible = false;
  }
  return group;
}

function createArrow() {
  var geometry = new THREE.Geometry();
  geometry.vertices.push( new THREE.Vector3( 0,   0, -w/4 ) );
  geometry.vertices.push( new THREE.Vector3( 0,   0,  w/4 ) );
  geometry.vertices.push( new THREE.Vector3( w/2, 0,  0 ) );
  var face = new THREE.Face3( 0, 1, 2, null, null, 0 );
  //add the face to the geometry's faces array
  geometry.faces.push( face );
  geometry.computeFaceNormals();
  geometry.computeVertexNormals();
  var material = new THREE.MeshBasicMaterial( { color: 0xffaa00, transparent:true, opacity:0.5} );
  var arrow = new THREE.Mesh( geometry, material );
  return arrow;
}

function createHelpArrows(hand) {
  var group = new THREE.Group();
  var arrowRight = createArrow();
  arrowRight.position.set( w/2, 0.05, -0.05 );
  group.add( arrowRight );
  var arrowLeft = createArrow();
  arrowLeft.position.set( -w/2, 0.05, -0.05 );
  arrowLeft.rotation.set( 0, Math.PI, 0 );
  group.add( arrowLeft );
  var arrowUp = createArrow();
  arrowUp.position.set( 0, 0.05, -0.05 - w/2 );
  arrowUp.rotation.set( 0, Math.PI/2.0,  0 );
  group.add( arrowUp );
  var arrowDown = createArrow();
  arrowDown.position.set( 0, 0.05, -0.05 + w/2 );
  arrowDown.rotation.set( 0, 3 * Math.PI/2.0, 0 );
  group.add( arrowDown );

  arrowRight.visible = true;
  arrowLeft.visible = true;
  arrowUp.visible = true;
  arrowDown.visible = true;
  group.scale.set( 0.5, 0.5, 0.5 );
  if (hand === "right") {
    gRCArrowRight = arrowRight; gRCArrowLeft = arrowLeft;
    gRCArrowUp = arrowUp; gRCArrowDown = arrowDown;
  } else {
    gLCArrowRight = arrowRight; gLCArrowLeft = arrowLeft;
    gLCArrowUp = arrowUp; gLCArrowDown = arrowDown;
  }
  return group;
}

function createDirectionalLight() {
  var light = new THREE.DirectionalLight( 0xFFFFFF, 1, 100 )
  light.position.set(  0, 5, 2.5 )
  light.castShadow = true
  light.shadow.mapSize.width  = 2048
  light.shadow.mapSize.height = 2048
  light.shadow.camera.near    =    1
  light.shadow.camera.far     =   12
  return light;
}

function createDomeLight() {
  return new THREE.HemisphereLight( 0x909090, 0x404040 );
}
