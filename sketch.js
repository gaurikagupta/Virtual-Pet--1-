//Create variables here
var fish, happyFish, database, foodS, foodStock, foodCount;
var fishImg, happyFishImg;

//Loading the images
function preload(){
fishImg=loadImage("fish.png");
happyFishImg=loadImage("happyFish.png");
}

function setup() {
	createCanvas(500, 500);
  database=firebase.database();

  //Creating the fish
  fish=createSprite(250,250,40,40);
  fish.addImage(fishImg);
  fish.scale=0.3;

  //Creating the fish-food
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  foodCount=20;
}

function draw() {  
background("green");

//Making the fish eat the food
if(keyWentDown(UP_ARROW)){
writeStock(foodS);
fish.addImage(happyFishImg);
}

drawSprites();

//Displaying the texts
fill("white");
textSize(20);
text("Press UP ARROW to feed Goldie!!",100,20);
text("Fish food left: "+foodS,160,400);
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  //Decreasing the number of food if only foodS>0 
  if(x<=0){
  x=0;
  textSize(50);
  fill("black");
  text("Goldie is full!!!",100,480);
  }
  else{
    x=x-1;
  }
database.ref('/').update({
  Food:x
})
}



