var PLAY=1;
var END = 0;
var gameState=1;
var monkey , monkey_running, monkey_stop;
var gameOverImage,gameOver;
var banana ,bananaImage,appleImage,apple,orange, orangeImage,obstacle, obstacleImage
var bananaGroup, obstacleGroup,appleGroup,orangeGroup;
var survivalTime=0;
var score=0;
var ground,groundImage;
var invisibleGround;
var bg0,backgroundImg;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
    backgroundImg=loadImage("jungle.jpg");
  gameOverImage=loadImage("gameOver1.png");
  bananaImage = loadImage("banana.png");
  appleImage=loadImage("apple.png");
  orangeImage=loadImage("Orange-PNG-Clipart.png")
  obstacleImage = loadImage("obstacle.png");
  groundImage=loadImage("18b4ac88-ad8b-4d53-8307-c6cf59e6e7cf.png");
  monkey_stop=loadAnimation("050906ad-6e73-4d97-8b58-b0f882962fd8.png")

}



function setup() {
  createCanvas(600,400);
    
  //for background
  bg0=createSprite(250,150,600,600);
  bg0.addImage("bg0",backgroundImg);
  bg0.scale=1.21;
  bg0.velocityX=-(4+(score/4));
  
  //for group
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  appleGroup=createGroup();
  orangeGroup=createGroup();
  //for monkey
  monkey=createSprite(75,320,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.addAnimation("stop",monkey_stop)
  monkey.scale=0.1;
  
  
  //for ground
  ground = createSprite(300,350,1200,10);
  ground.velocityX=-(4+(score/5));
  ground.x=ground.width/2;
  ground.addImage(groundImage)
  console.log(ground.x);
  invisibleGround = createSprite(300,360,1200,10);
  invisibleGround.visible = false;
  ground.visible=false;
 
  //for gameOver
  gameOver=createSprite(300,180,20,20);
  gameOver.addImage("gameOverImg",gameOverImage);
  gameOver.scale=0.2;
  gameOver.visible=false;
  
  //for reducing collision radius
  monkey.setCollider("rectangle",0,0,400,560);
  //monkey.debug=true;
  //console.log(monkey.height);
  //console.log(monkey.y);
}


function draw() {
background(255);
 
  
  if(gameState===PLAY){
  
  //for resetting
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    
//for background
    if (bg0.x < 0){
      bg0.x = bg0.width/2;
    }
    
    //for survival time
    survivalTime=Math.ceil(frameCount/frameRate());
    
    
   //for making monkey jump
    if(keyDown("space")&& monkey.y>=318){
      monkey.velocityY=-21;
    }
    //add gravity
    monkey.velocityY = monkey.velocityY + 1;
    
    //for spawning
    spawnBanana();
    spawnObstacles();
    spawnApple();
    spawnOrange();
    
    
    
    //for hungry monkey's food(banana)
    if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
      score=score+1;
    }
    
    //for hungry monkey's food(apple)
    if(appleGroup.isTouching(monkey)){
      appleGroup.destroyEach();
      score=score+2;
    }
    
    //for hungry monkey's food(orange)
    if(orangeGroup.isTouching(monkey)){
      orangeGroup.destroyEach();
      score=score+3;
    }
    
    //for scaling
    if (score % 10 === 0){
    switch(score) {
      case 10: monkey.scale=0.12;
              break;
      case 20: monkey.scale=0.13;
              break;
      case 30:monkey.scale=0.14;
              break;
      case 40: monkey.scale=0.15;
              break;
      case 50: monkey.scale=0.152;
              break;
      case 60: monkey.scale=0.153;
              break;
      case 70: monkey.scale=0.154;
            break;
      case 80: monkey.scale=0.155;
              break;
      case 90:monkey.scale=0.156;
              break;
      case 100: monkey.scale=0.17;
              break;
      case 110: monkey.scale=0.185;
              break;
      case 120: monkey.scale=0.19;
              break;
      case 130: monkey.scale=0.195;
              break;
      case 140: monkey.scale=0.2;
              break;
      case 150: monkey.scale=0.21;
              break;
      case 160: monkey.scale=0.215;
              break;
      case 170: monkey.scale=0.22;
              break;
      case 180: monkey.scale=0.222;
              break;
      case 190: monkey.scale=0.223;
              break;
      case 200: monkey.scale=0.227;
              break;
      case 210: monkey.scale=0.23;
              break;
      default: break;
}
    }
    
    //for touching obstacles 
     if(obstacleGroup.isTouching(monkey)){
       gameState=END;
       monkey.velocityY=0;
        
    }
    
    //for scaling the monkey up
}else if(gameState===END){
  ground.velocityX=0;
  bg0.velocityX=0;
  obstacleGroup.setVelocityXEach(0);
  bananaGroup.setVelocityXEach(0);
  obstacleGroup.setLifetimeEach(-1);
  bananaGroup.setLifetimeEach(-1);
  monkey.changeAnimation("stop",monkey_stop);
  gameOver.visible=true;
  appleGroup.setVelocityXEach(0);
  appleGroup.setLifetimeEach(-1);
  orangeGroup.setVelocityXEach(0);
  orangeGroup.setLifetimeEach(-1);
  }
  
  //for colliding monkey
  monkey.collide(invisibleGround);
 
  drawSprites();
  //for survival time
  stroke(254, 141, 119);
  textSize(20);
  fill(0);
  text("Survival Time:"+survivalTime,10,50);
  
  //for hungerLevel
  stroke(0);
  textSize(15);
  fill(254, 141, 119);
  text("SCORE:"+score,480,20);


}
  


//function for spawning banana
function spawnBanana(){
  if(frameCount%97===0){ 
    banana=createSprite(600,300,20,20);
    banana.addImage(bananaImage);
    banana.y=Math.round(random(150,320));
    banana.velocityX=-5;
    banana.lifetime=125;
    bananaGroup.add(banana);
    banana.scale=0.1;
  }
  
}

function spawnApple(){
 if(frameCount%157===0){
  apple=createSprite(600,300,20,20);
  apple.addImage(appleImage);
  apple.y=Math.round(random(170,300));
  apple.velocityX=-6;
  apple.lifetime=110;
  appleGroup.add(apple);
  apple.scale=0.1;
 }
}

function spawnOrange(){
 if(frameCount%237===0){
  orange=createSprite(600,300,20,20);
  orange.addImage(orangeImage);
  orange.y=Math.round(random(190,270));
  orange.velocityX=-7;
  orange.lifetime=95;
  orangeGroup.add(orange);
  orange.scale=0.05;
 }
}
//function for spawning obstacle
function spawnObstacles(){
  if(frameCount%300===0){
    obstacle=createSprite(600,330,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-(5+(score/5));
    obstacle.lifetime=125;
    obstacleGroup.add(obstacle);
    obstacle.scale=0.175;
  }
  
}

