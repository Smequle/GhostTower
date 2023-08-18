var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 2;
  ghost = createSprite(200, 300, 50, 50);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.33;
}

function draw() {
  background(0);
  if (gameState == "play") {
    if (tower.y > 400) {
      tower.y = 275;
    }
    if (keyDown("left_Arrow")) {
      ghost.x = ghost.x - 2;
    }
    if (keyDown("right_Arrow")) {
      ghost.x = ghost.x + 2;
    }
    if (keyDown("space")) {
      ghost.velocityY = -5;
    }
    if (climbersGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
    }
    if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 599 || ghost.y < 1 || ghost.x < 100 || ghost.x > 500) {
      ghost.destroy();
      gameState = "end";
    }
    ghost.velocityY = ghost.velocityY + 0.8;
    spawnDoors();
  }
  drawSprites();
  if (gameState == "end") {

    stroke("red");
    fill("red");
    textSize(50);
    text("Game Over", 200, 300);
  }
}

function spawnDoors() {
  if (frameCount % 200 == 0) {
    door = createSprite(200, -50);
    door.addImage(doorImg);
    door.velocityY = 2;
    door.x = Math.floor(random(100, 500));
    door.lifetime = 800;
    doorsGroup.add(door);
    climber = createSprite(200, 10);
    climber.addImage(climberImg);
    climber.velocityY = 2;
    climber.x = door.x;
    climber.lifetime = 800;
    climbersGroup.add(climber);
    ghost.depth = door.depth;
    ghost.depth += 1;
    invisibleBlock = createSprite(200, 15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 2;
    invisibleBlock.lifetime = 800;
    invisibleBlockGroup.add(invisibleBlock);
  }
}