var trex,trex_running,trex_collided,ground,ground_image,invisible_ground,obstacle,obstacleGroup,o1,o2,o3,o4,o5,o6,cloud,cloud_image,cloudGroup,restart,resart_image,gameOver,gameOver_image,count = 0;

//initiate Game STATEs
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {
 trex_running =  loadAnimation("Images/trex1.png","Images/trex2.png","Images/trex3.png");
 trex_collided = loadAnimation("Images/trex_collided.png"); 
  
 ground_image = loadImage("Images/ground.png");

 cloud_image = loadImage("Images/cloud.png");
 
 gameOver_image = loadImage("Images/gameOver.png");
 restart_image = loadImage("Images/restart.png");
 
 o1 = loadImage("Images/obstacle1.png");
 o2 = loadImage("Images/obstacle2.png"); 
 o3 = loadImage("Images/obstacle3.png"); 
 o4 = loadImage("Images/obstacle4.png");    
 o5 = loadImage("Images/obstacle5.png");
 o6 = loadImage("Images/obstacle6.png");

 bg = loadImage("Images/GreY.jpg");
}

function setup() {
  createCanvas(displayWidth - 20, displayHeight - 350);
  trex = createSprite (-50, 180, 20, 20);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(-100, 180, 4000, 20);
  ground.addImage(ground_image);
  ground.velocityX = -6;
  ground.x = ground.width/2;
  
  invisible_ground = createSprite(200, 195, 800, 20);
  invisible_ground.visible = false; 
  
  gameOver = createSprite(50, 60);
  gameOver.addImage(gameOver_image);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  
  restart = createSprite(50, 100);
  restart.addImage(restart_image);
  restart.scale = 0.5;
  restart.visible = false;
  
 cloudGroup = new Group();
 obstacleGroup = new Group();
}

function draw() {
  background(bg);
  
  if (gameState === PLAY) {
      //to move trex
        ground.velocityX = -6;
        //camera.x += -3; 
        camera.position.x = trex.x/2;
        camera.position.y = displayHeight/4;
            
      //scoring
      count = count + Math.round(frameCount/50);

     if (ground.x < 0) {
         ground.x = ground.width/2;
      }
      
     if (keyDown("space") && trex.y >= 160 ) {
         trex.velocityY = -13;
      }       
    
     
      //.to add gravity
      trex.velocityY = trex.velocityY + 0.7;
    
      //spawning cloud and obstacle
      spawnClouds();
      spawnObstacles();
    
      if (obstacleGroup.isTouching(trex)) {
          gameState = END;
      }    
    
  }else if (gameState === END) {
            gameOver.visible = true;
            restart.visible = true;
    
            //set velcity of each game object to 0
            ground.velocityX = 0;
            trex.velocityY = 0;
            obstacleGroup.setVelocityXEach(0);
            cloudGroup.setVelocityXEach(0);
    
           //change the trex animation
           trex.changeAnimation("collided",trex_collided);
    
           //set lifetime of the game objects so that they are never destroyed
           obstacleGroup.setLifetimeEach(-1);
           cloudGroup.setLifetimeEach(-1);
    
           if (mousePressedOver(restart)) {
               reset();
           }     
       }          
   
   
  
  text("Score: "+ count, 450, 30);
    
  trex.collide(invisible_ground);
  
  
  
  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(620,140,40,10);
    cloud.y = Math.round(random(80,140));
    cloud.addImage(cloud_image);
    cloud.scale = 0.5;
    cloud.velocityX = -6;
    
    //assign lifetime to the variable
    cloud.lifetime = 400;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudGroup.add(cloud);
  }
}

function spawnObstacles() {
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
  
  switch(rand){         
    case 1:obstacle.addImage(o3);
    break;      
      
    case 2:obstacle.addImage(o5);
    break;
    
    case 3:obstacle.addImage(o4);
    break;
    
    case 4:obstacle.addImage(o1);
    break;
    
    case 5:obstacle.addImage(o6);
    break;
    
    case 6:obstacle.addImage(o2);
    break;
    default:break;
  }
    
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 380;
    obstacleGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  count = 0;
  
}
