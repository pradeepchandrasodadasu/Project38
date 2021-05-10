// creates a space in computer
var monkey,monkey_running;
var banana,banana1,bananaImage;
var obstacle,obstacle1, obstacleImage;
var forest1,ground,forestImg;
var survivalTime = 0,score = 0,highScore = 0;
var PLAY = 1;
var END = 0
var gameState = PLAY;
var gameover,gameoverImage;
var restart,restartImage;

function preload(){
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkeyImage = loadImage("sprite_1.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  forestImg = loadImage("forest.jpg");
  restartImage = loadImage("restart.jpg");
  gameoverImage = loadImage("gameover.png");
  //startImage = loadImage("start.png");
}



function setup() {
  //create canvas
  createCanvas(windowWidth,windowHeight);

  
  
  //create forest as sprite object,gives velocity & add image 
  forest1 = createSprite(100,height/10,10,10);
  //forest.velocityX = -5;
  forest1.addImage(forestImg);
  forest1.scale = 5;

  //create monkey as sprite object & add animation to monkey
  monkey = createSprite(50,height-30,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.08;
  //monkey.debug = true;
  monkey.velocityX = 5;
  monkey.setCollider("rectangle",100,0,280,570);
  
  //create ground as sprite object & makes invisible
  ground = createSprite(width/2,height-1,1000000000000*width,2);
  ground.visible = false;

  obstacle = createSprite(250,height-10,10,10);
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.19;

  obstacle1 = createSprite(700,height-10,10,10);
  obstacle1.addImage(obstacleImage);
  obstacle1.scale = 0.19;
  
  banana = createSprite(250,Math.round(random(height/2,height/2+30)),5,5);
  banana.addImage(bananaImage);
  banana.scale = 0.06;

  banana1 = createSprite(710,Math.round(random(height/2,height/2+30)),5,5);
  banana1.addImage(bananaImage);
  banana1.scale = 0.06;

  //create gameover as sprite object & add image to gameover
  gameover = createSprite(width/2,height/2-70,10,10);
  gameover.addImage(gameoverImage);
  gameover.scale = 0.05;
  
  //create restart as sprite object & add image to restart
  restart = createSprite(width/2,height/2+70,10,10);
  restart.addImage(restartImage);
  restart.scale = 0.1;
  
}

function draw() {
  //set background colour
  background("lightBlue");
  
  //makes monkey to collide ground
  monkey.collide(ground);

  
  if (gameState === PLAY){ 
      
      //increase speed as much as score increases
      //forest.velocityX = -(5 + score/20);
      
      //survivalTime = Math.ceil(frameCount/getFrameRate());
      
      //gives gravity to monkey
      monkey.velocityY = monkey.velocityY+0.8;
      //console.log(Math.round(monkey.y));
      console.log(Math.round(width))
      
      //calls gameCamera functions
      gameCamera();

      if(camera.x === width-400){
         monkey.x = 50;
      }
      
      //makes gameover and restart invisible
      gameover.visible = false;
      restart.visible = false;
      
      //makes monkey to jump when space key pressed
      if (touches.length > 0||keyDown("space") && monkey.y > height-50){
          monkey.velocityY = -19;
          touches = [];
      }
      
      //destroy banana and calculats score when monkey touches banana
      if (monkey.isTouching(banana)){
          banana.visible = false;
          score = score+2;
      }else if(monkey.isTouching(banana1)){
          banana1.visible = false;
          score = score+2;
      }

      if(monkey.x <= 50){
        banana.visible = true;
        banana1.visible = true;
        obstacle.visible = true;
        obstacle1.visible = true;
      }
      
      //calculats high score
      if (highScore < score){
          highScore = score;
      }
      
      if (score > 0 && score%40 === 0){ 
          var rand = Math.round(1,4);
          switch (rand){

            case 1 : monkey.scale = 0.1;
            break;            
            case 2 : monkey.scale = 0.12;
            break;            
            case 3 : monkey.scale = 0.14;
            break;
            case 4 : monkey.scale = 0.16;
            break;
            default : break;
          }
      }
      
      //drceases the size of monkey if it touches obstacle
      if (monkey.isTouching(obstacle)){
          monkey.scale = monkey.scale - 0.03
          score = score - 20;
          obstacle.visible = false;
      }else if(monkey.isTouching(obstacle1)){
         monkey.scale = monkey.scale - 0.03
         score = score - 20;
         obstacle1.visible = false;
      }
      
      //changes State to END when monkey scale is less than 0.07
      if (monkey.scale < 0.07){
          gameState = END;
      }
  } 
  else if (gameState === END){
      
      //makes gameover and restart visible
      gameover.visible = true;
      restart.visible = true;
      
      //forest and monkey invisible
      forest1.visible = false;
      monkey.visible = false;

      //makes banana,obstacle invisible
      banana.visible = false;
      banana1.visible = false;
      obstacle.visible = false;
      obstacle1.visible = false;
      
      //writes text
      stroke("red");
      fill("red");
      textSize(15);
      text("High Score = "+highScore,width/2-50,height/2);
     
      //call restart function when restart pressed
      if (mousePressedOver(restart)||touches.lenght>1){
          reset();
      }
      
  }
  
  //draws sprite objects
  drawSprites();
  
  //writes text
  stroke("black");
  fill("blue");
  textSize(15);
  text("score = "+ score,width/2,30);
  
  //writes text
  stroke("black");
  fill("blue");
  textSize(15);
  //text("Survival Time = "+survivalTime,10,30);
  
} 

function gameCamera(){
  camera.x = monkey.x + 100
  //camera.position.y = cars[index-1].y;
}

function reset (){
  gameState = PLAY;
  forest1.visible = true;
  monkey.visible = true;
  monkey.y = height-30;
  monkey.x = 50;
  monkey.scale = 0.08;
  banana.visible = true;
  banana1.visible = true;
  obstacle.visible = true;
  obstacle1.visible = true;
  //forest.velocityX = -4;
  //survivalTime = 0;
  score = 0;        
}

