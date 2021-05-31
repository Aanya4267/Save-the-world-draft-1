//create all the variables 

var scene;
var pc,pcimg;
var gameState;
var co1,co2,co3; 
var bulletimg,bullet,bulletGrp;
var points = 0;
var covidgrp,grp2,grp3;
var sound1 ; 
var inv ; 
var cor1,cor2,cor3 ; 
var gameState="serve";


function preload(){
  //loading images
  scene = loadImage("images/city.jpg");
  pcimg=loadImage("images/alien.png");
  co1=loadImage("images/corona 1.png");
  co2=loadImage("images/corona 2.png");
  co3=loadImage("images/corona 3.png");
  bulletimg=loadImage("images/red.png");
  sound1=loadSound("images/sound.mp3");
}

function setup() {
  createCanvas(displayWidth,displayHeight);
 
  //sprite for player 
  pc=createSprite(displayWidth/10,500,10,10);
  //console.log(pc);
  pc.addImage(pcimg);
  pc.scale=1.3;

  //groups for covid and bullet
  covidgrp = createGroup();
  grp3 = createGroup();
  grp2 = createGroup();
  bulletGrp=createGroup();
  //console.log(covidgrp);

  //invisible line at the bottom of the canvas 
  inv = createSprite(displayWidth/2,displayHeight,displayWidth,1);
inv.visible=false;
  }

function draw() {
  background("white");

    image(scene, 0,0,displayWidth, displayHeight); 
    camera.position.x=displayWidth/2;


    if(gameState==="serve"){
     fill("blue");
     textSize(35);
     textFont("Castellar");
     text("SAVE THE WORLD : THE WORLD IS IN YOUR HANDS" , displayWidth/5,displayHeight /2-300);
     textFont("Calibri")
     textSize(25);
     fill("black")
      text("Welcome to SAVE THE WORLD ! You are a corona warrior and now its your responsibitily to save the world from this dangerous disease.",displayWidth/44,displayHeight/2-100) ;
      text("Press the space key to shoot and start the game and up and down arrow keys to move.",displayWidth/5,displayHeight/2-70);
      text("As soon as you score 2000 points , the world will be free from COVID-19. Press the S key to restart .",displayWidth/6,displayHeight/2-40)
      textFont("Castellar");
      textSize(30)
      text("ALL THE BEST!",displayWidth/2.5,displayHeight/2+30);
    }
    pc.visible = false ;
//condition for changing the states 
if(keyDown("space")&&gameState==="serve"){
  gameState = "play"
}

//if gameState is play 

if(gameState==="play"){
  fill("white");
  textSize(30);
  text("POINTS: "+points ,displayWidth-displayWidth/7,camera.position.y+300);
  if(keyDown("space")){
    createBullet();
    sound1.play();

    

  }

  pc.visible = true ;
  if(keyWentDown(UP_ARROW)){
    pc.velocityY = -15;
  }
  if(keyWentUp(UP_ARROW)){
    pc.velocityY = 0 ;
   
  }
  if(keyWentDown(DOWN_ARROW)){
    pc.velocityY = 15;
   
  }
  if(keyWentUp(DOWN_ARROW)){
    pc.velocityY = 0;
    
  }
  if(frameCount%50===0){
    cor1= createSprite(random(displayWidth/5,displayWidth),0);
    
    cor1.velocityY=random(3,15);
    cor1.addImage(co1)
    covidgrp.add(cor1);
    cor1.scale = 0.2;
      }

      if(frameCount%50===0){
        cor2= createSprite(random(displayWidth/5,displayWidth),0);
        
        cor2.velocityY=random(3,15);
        cor2.addImage(co2)
        grp2.add(cor2);
        cor2.scale = 0.3;
          }
      if(bulletGrp.isTouching(covidgrp)){
        cor1.destroy();  
        points+=10;
      }  
      if(bulletGrp.isTouching(grp2)){
      cor2.destroy();
        points+=10;
      }  
      if(inv.isTouching(covidgrp)){
        cor1.destroy();  
        points = points - 1 ;
        
      }  
      if(inv.isTouching(grp2)){
        cor2.destroy();  
        points = points - 1 ;
        
      }  

      if(points>500){
        cor1.velocityY = random(10,20);
        cor2.velocityY = random(10,20);
        
      }
      if(points>1000){
        cor1.velocityY = random(15,30);
        cor2.velocityY = random(15,30);
      }
      if(points>1500){
        cor1.velocityY = random(20,30);
        cor2.velocityY = random(20,30)
      }

      if(points>2000){

        //condition of changing state 
        gameState = "end";
      }
  
}

if(gameState==="end"){
  pc.visible=false;
  points = 0;
  covidgrp.destroyEach();
  fill("blue");
     textSize(30);
     textFont("Castellar");
      text("Yayyyy!! You did it. Now the world is free with COVID-19.",displayWidth/7,displayHeight/2-150) ;
      text("YOUR MISSION IS ACCOMPLISHED!",displayWidth/3,displayHeight/2-110)
      textSize(25);
      fill("red");
      textFont("TimesNewRoman")
      text("'Hope can be a powerful force. Maybe there’s no actual magic in it, but when you know what you hope for most and hold it like a light within you, ",displayWidth/70,displayHeight/2-20);
      text("you can make things happen, almost like magic.'",displayWidth/3,displayHeight/2+10);
      textSize(25);
      fill("blue");
      text("Keep hope ! One day life will be back to normal. Stay Home !Stay Safe",displayWidth/4,displayHeight/2+50);

      if(keyDown("s")){
        gameState="serve";
        pc.visible=true;
      }
}


     drawSprites();
    
    }

    // creating a bullet 
   function createBullet(){
    
    bullet = createSprite(pc.x+90,pc.y+10,10,10);
    bulletGrp.add(bullet);
    bullet.addImage(bulletimg);
      bullet.rotation = 270;
      bullet.scale=0.04;
      bullet.x=pc.x+90;
      bullet.y=pc.y+10;
      bullet.velocityX = 100;
      bullet.lifetime=400;
      return bullet;
    }
