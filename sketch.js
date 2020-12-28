var towerImg, tower;
var doorImg, doorsGroup, door;
var climber, climberImg, climberGroup;
var ghost, ghostImg;
var invisbleBlockGroup, invisbleBlock;
var gameState = "play";

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600, 600);
  
  spookySound.loop();
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200, 200, 50, 50);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.4;
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisbleBlockGroup = new Group();
}
function draw(){
background(0);

if(gameState === "play"){
 
if(tower.y>400){
 tower.y = 300;
}
  
if(keyDown("left_arrow")){
  ghost.x = ghost.x-3;
}
  
if(keyDown("right_arrow")){
  ghost.x = ghost.x+3;
}
  
if(keyDown("space")){
  ghost.velocityY = -5;
  
}
ghost.velocityY = ghost.velocityY+0.5; 
  
if(climbersGroup.isTouching(ghost)){
  ghost.velocityY = 0;
}

if(invisbleBlockGroup.isTouching(ghost)|| ghost.y>500){
  ghost.destroy();
  gameState = "end";
} 
  
spawnDoors();
drawSprites();
}
  
  if(gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 250, 250);
  }
}
function spawnDoors(){
  if(frameCount%200 === 0){
    door = createSprite(200, -50);
    door.addImage(doorImg);
    door.x = Math.round(random(100, 400));
    door.velocityY = 1;
    door.lifetime = 500;
    doorsGroup.add(door);
    
    climber = createSprite(200, 10);
    climber.addImage(climberImg);
    climber.x = door.x;
    climber.velocityY = 1;
    climber.lifetime = 500;
    climbersGroup.add(climber);
    
    ghost.depth = door.depth;
    ghost.depth = ghost.depth+1;
    
    invisbleBlock = createSprite(200, 15);
    invisbleBlock.width = climber.width;
    invisbleBlock.height = 2;
    invisbleBlock.x = door.x;
    invisbleBlock.velocityY = 1;
    
  }
}
