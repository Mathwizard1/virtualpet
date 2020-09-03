var dog,database,foods,c=0;
var dg,hdg,s1,s2;

function preload(){
   hdg=loadImage("happydog.png");
   dg=loadImage("dog.png");
}


function setup() {
  createCanvas(500,500);
  database=firebase.database();
  dog=createSprite(250,200,100,100);
  dog.addImage(dg);
  dog.scale=0.3;
  var dt;
  dt = database.ref('food');
  dt.on("value",readStock,showError);
}

function draw() {
  background(46,139,87);

  if(foods!==undefined){
    if(c==0){
      textSize(25);
      fill("orange");
      text("Press up to feed him",150,350);
      if(keyDown(UP_ARROW)){
      writeStock(foods);
      s1=second();
      c=1;
      console.log(foods);
      }
    }
  }
  if(c==1){
    textSize(25);
    fill("orange");
    text("He is happy",150,100);
    s2=second();
    if((s2-s1)>=1.5){dog.addImage(dg);c=0;}else{c=1;}
  }

  drawSprites();
}

function readStock(data){
  foods=data.val();
}

function writeStock(x){
  if(x>0){x--;
    dog.addImage(hdg);
  }else{x=0;}

  database.ref('/').update({
    food:x
  }) 
}

function showError(){console.log("error");}
