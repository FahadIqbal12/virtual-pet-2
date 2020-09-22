//Create variables here
var dog,dogImg,dogImg1,database,foodS,foodStock;
var lastFed,feedTime;
var foodObj;
var addFood,feedTheDog;



function preload()
{
  dogImg = loadImage("dogImg.png");
  dogImg1 = loadImage("dogImg1.png");
  
}

function setup() {
  
  createCanvas(800, 700);
  database = firebase.database();
  dog = createSprite(400,400);
  dog.addImage(dogImg);
  dog.scale = 0.5;
    
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  

  foodObj = new Food();

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feedTheDog = createButton("Feed the Dog");
  feedTheDog.position(700,95);
  feedTheDog.mousePressed(feedDog);

}


function draw() {  
  background(46,139,87);

  
foodObj.display();


 fedTime =database.ref('FedTime');
 fedTime.on("value",function(data){
   lastFed = data.val();
 })

  drawSprites();
  

}

function readStock(data){
  foodS = data.val();
   foodObj.updateFoodStock(foodS);

}

function feedDog(){
dog.addImage(dogImg1);

foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
  Food:foodObj.getFoodStock(),
  FeedTime: hour()
})
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}





