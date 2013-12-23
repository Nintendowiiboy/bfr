var mloop, fps, can, con, canWidth, canHeight, bg, rnd1, rnd2, comp, compAlive, compY, compX, compWidth, compHeight;
var compNum, player, playerHeight, playerWidth, playerX, playerY, death, splashNum, jumpLoop, fallLoop, hs, rnd;
var clickable, screen, pressable, gameOver, points, highscore, compSpeed, compGen, go, msg2, speedLoop, compLoop, cloudLoop;
var text1, text2, jumpNoise, gameOverNoise, startButtonTopLeft, startButtonTopRight, startButtonBottomLeft, startButtonBottomRight;
var fb, fbButtonLeft, fbButtonRight, fbButtonBottom, fbButtonTop, bump, rnd3, cloud, cloudX, cloudY, cloudWidth, cloudHeight, cloudAlive, sound;
var soundBar, soundImageX, soundImageY, menuLeft, menuRight, menuTop, menuBottom, soundTop, soundBottom, soundLeft, soundRight, localSound;
window.onload = start;

function start(){

 msg = document.getElementById("msg");
 msg2 = document.getElementById("msg2");
 player = new Image();
 player.src = "images/rmc1.png";
 fps = 50;
 can = document.getElementById("can");
 con = can.getContext("2d");
 hs = false;
 canWidth = 600;
 canHeight = 500;
 points = 0;
 go = false;
 comp = new Image();
 compAlive = true;
 compSpeed = 10;
 playerWidth = 72;
 playerHeight = 108;
 playerX = 10;
 playerY = 375;
 bg = new Image();
 bg.src = "images/ngi.jpg";
 con.drawImage(bg,0,0,canWidth,canHeight);
 splashNum = 1;
 con.fillStyle = "White";
 con.font = "bold 24px Ariel";
 jumpNoise = new Audio();
 gameOverNoise = new Audio();
 gameOverNoise.src = "audio/gameOver.wav";
 startButtonLeft = 124;
 startButtonRight = 455;
 startButtonTop = 140;
 startButtonBottom = 243;
 fbButtonLeft = 150;
 fbButtonRight = 430;
 fbButtonTop = 268;
 fbButtonBottom = 360;
 mloop = setInterval("splash()",3000);
 fb = new Image();
 fb.src = "images/bg2.jpg";
 bump = false;
 cloud = new Image();
 cloudWidth = 200;
 cloudHeight = 200;
 soundBar = new Image();
 soundBar.src = "images/soundOn.png";
 soundImageX = 0;
 soundImageY = 0;
 soundLeft = 300;
 soundRight = 600;
 soundTop = 0;
 soundBottom = 50;
 menuLeft = 0;
 menuRight = 299;
 menuTop = 0;
 menuBottom = 50;
 checkSound();
 scaleImages();
 
 //event listeners
 can.addEventListener('click', mouseClick);
 document.addEventListener('keydown', keyPress);
 can.addEventListener('mousemove',mouseMoved,false);
 //can.addEventListener('resize',scaleImages,false);
 //End event listeners
 
}

function splash(){

 if (splashNum == 1){
  bg.src = "images/gn.jpg";
  con.clearRect(0,0,600,500);
  con.drawImage(bg,0,0,canWidth,canHeight);
  splashNum = 2;
 }
 else if (splashNum == 2){
  mainMenu();
 }
 else{
  msg.innerHTML = "No splashNum";
 }

}

function mainMenu(){

 bg.src = "images/menu_beta.jpg";
 con.clearRect(0,0,canWidth,canHeight);
 con.drawImage(bg,0,0,canWidth,canHeight);
 screen = "menu";
 clickable = true;
 
}

function mainLoop(){

 draw();
 testForImpact();
 //speedIncrease();
 
}

function draw(){

 //msg2.innerHTML = "Speed: " + compSpeed;
 con.clearRect(0,0,600,500);
 con.drawImage(bg,0,0,canWidth,canHeight);
 con.drawImage(player,playerX,playerY);
 con.drawImage(soundBar, soundImageX, soundImageY);
 
 if (compAlive == true){
  con.drawImage(comp,compX,compY,compWidth,compHeight);
 }
 
 if (cloudAlive == true){
  con.drawImage(cloud, cloudX, cloudY, cloudWidth, cloudHeight);
 }
 
 if (text1 != null){
  con.fillText(text1,200,494);
 }
 
 if (text2 != null && text2 == "Click screen to start..."){
  con.fillText(text2,200,200);
 }else if (text2 != null){
  con.fillText(text2,100,200);
 }

}

function jump(){

 if(playerY>(canHeight * .5)){
  playerY -= 7;
  if (rnd != 4){
  player.src = "images/rmc2.png";
  }
  else{
  player.src = "images/rmc4.png";
  }
  clickable = false;
 }else{
  clearInterval(jumpLoop);
  fallLoop = setInterval("fall()",1000/fps);
 }

}

function fall(){

 if(playerY<375){
  playerY += 7;
  player.src = "images/rmc1.png";
 }else{
  clearInterval(fallLoop);
  clickable = true;
  }
  
  if (gameOver == true){
   clickable = false;
  }

}

function death(){

 screen = "death"
 checkHighScore();
 clickable = false;
 points = 0;
 compX = 600;
 cloudX = 600;
 clearInterval(compGen);
 clearInterval(cloudGen);
 clearInterval(speedLoop);
 compSpeed = 10;
 go = false;
 gameOver = true;
 if (sound == "true"){
  gameOverNoise.play();
 }

}

function randomCompGenerator(){

 compX = canWidth;
 compAlive = true;
 rnd = Math.floor((Math.random()*6)+1);
 if (rnd == 2){
  compHeight = 54;
  compWidth = 74;
  compY = 433;
  comp.src = "images/gn.png";
  player.src = "images/rmc1.png";
  bump = false;
 }else if (rnd == 1){
  compHeight = 27;
  compWidth = 37;
  compY = 460;
  comp.src = "images/gn.png";
  player.src = "images/rmc1.png";
  bump = false;
 }else if (rnd == 3){
  compHeight = 54;
  compWidth = 74;
  compY = 433;
  comp.src = "images/bricks.png";
  player.src = "images/rmc1.png";
  bump = false;
 }else if (rnd == 4){
  compHeight = 54;
  compWidth = 74;
  compY = 433;
  comp.src = "images/snake.png";
  player.src = "images/rmc3.png";
  bump = false;
 }else if (rnd == 5){
  compHeight = 54;
  compWidth = 74;
  compY = 433;
  comp.src = "images/racecar.png";
  player.src = "images/rmc1.png";
  bump = true;
 }else if (rnd == 6){
  compHeight = 54;
  compWidth = 74;
  compY = 433;
  comp.src = "images/bulletBob.png";
  player.src = "images/rmc1.png";
  bump = false;
 }
 compLoop = setInterval("compMove()",1000/fps);

}

function randomCloudGenerator(){

 cloudX = canWidth;
 rnd3 = Math.floor((Math.random()*4)+1);
 cloudAlive = true;
 if (rnd3 == 1){
  cloudHeight = 54;
  cloudWidth = 74;
  cloudY = 100;
  cloud.src = "images/cloud1.png";
 }else if (rnd3 == 2){
  cloudHeight = 27;
  cloudWidth = 37;
  cloudY = 150;
  cloud.src = "images/cloud2.png";
 }else if (rnd3 == 3){
  cloudHeight = 54;
  cloudWidth = 74;
  cloudY = 100;
  cloud.src = "images/cloud1.png";
 }else if (rnd3 == 4){
  cloudHeight = 27;
  cloudWidth = 37;
  cloudY = 150;
  cloud.src = "images/cloud2.png";
 }else{
  //error
 }
 cloudLoop = setInterval("cloudMove()",1000/fps);

}

function compMove(){

 if (((compX + compWidth) > -5) && gameOver != true){
  compX -= compSpeed;
 }else{
  pressable = true;
  clearInterval(compLoop);
 }
 
 if (bump == true && compY < 433){
  compY += 3;
 }else if (bump == true){
  compY -= 3;
 }

 
}

function cloudMove(){
 
 if (((cloudX + cloudWidth) > -5) && gameOver != true){
  cloudX -= compSpeed;
 }else{
  clearInterval(cloudLoop);
 }

}

function testForImpact(){

 if ((compX < (playerX + playerWidth)) && ((compX + compWidth) > playerX) && (compY > playerY) && (compY < (playerY + playerHeight))){
  if (comp.src == "images/gn.png"){
   powerUp();
  }
  else{
   death();
  }
 }
 else if (gameOver != true && go == true){
  points++;
  text1 = "Highscore: " + localStorage.hs + " ~ Points: " + Math.floor(points/3);
 }
 else{}
}

function resetAll(){

 compX = 600;
 compY = 460;
 cloudX = 600;
 text1 = null;
 text2 = null;
 screen = "menu";
 highscore = 0;
 score = 0;
 points = 0;
 bg.src = "images/menu_beta.jpg";
 clickable = true;
 pressable = false;
 clearInterval(mloop);
 clearInterval(compGen);
 clearInterval(cloudGen);
 clearInterval(speedLoop);
 compSpeed = 10;
 con.clearRect(0,0,canWidth,canHeight);
 con.drawImage(bg,0,0,canWidth,canHeight);
 if (compLoop != null && compLoop != ""){
  clearInterval(compLoop);
 }
 if (cloudLoop != null && cloudLoop != ""){
  clearInterval(cloudLoop);
 }
 
}

function mouseClick(e){

 e = e || window.event;

 if (clickable == true && screen == "menu"){
  if (((e.pageX - can.offsetLeft) > startButtonLeft ) && ((e.pageX - can.offsetLeft) < startButtonRight) && ((e.pageY - can.offsetTop) > startButtonTop) && ((e.pageY - can.offsetTop) < startButtonBottom)){
   clearInterval(mloop);
   bg.src = "images/bg1.jpg";
   screen = "pregame";
   clickable = false;
   pressable = true;
   mloop = setInterval("mainLoop()",1000/fps);
   text2 = "Click screen to start...";
  }
 }
 if (screen == "game" || screen == "death"){

 }
 if (clickable == true && screen == "game"){
  if (((e.pageY - can.offsetTop) > soundBottom)){
   if (rnd == 4){
    if (sound == "true"){
     jumpNoise.src = "audio/scream.wav";
     jumpNoise.play();
    }
   }else{
    if (sound == "true"){
     jumpNoise.src = "audio/wii.wav";
     jumpNoise.play();
    }
   }
   jumpLoop = setInterval("jump()",1000/fps);
  }
 }else{msg.innerHTML = "Can't click!";}

 if (screen == "pregame" && pressable == true && gameOver != true && clickable == false){
  if (((e.pageY - can.offsetTop) > soundBottom)){
   speedLoop = setInterval(speedIncrease,20000);
   compGen = setInterval(randomCompGenerator,3000);
   cloudGen = setInterval(randomCloudGenerator,2000);
   text2 = null;
   pressable = false;
   clickable = true;
   go = true;
   screen = "game";
  }
 }
 else if (gameOver == true && screen == "death"){
  if (((e.pageX - can.offsetLeft) > fbButtonLeft ) && ((e.pageX - can.offsetLeft) < fbButtonRight) && ((e.pageY - can.offsetTop) > fbButtonTop) && ((e.pageY - can.offsetTop) < fbButtonBottom) && (hs == true)){
    window.open("http://www.facebook.com/sharer.php?s=100&p[title]=High+Score!&p[summary]=I+just+made+a+highscore+of+" + localStorage.hs + "!+Play+the+beta+of+RMCRun+by+clicking+the+link!&p[url]=https://apps.facebook.com/rmcrun_beta/&p[images][0]=http://img845.imageshack.us/img845/1219/y8co.png", "_blank");
  }else if (((e.pageY - can.offsetTop) > soundBottom)){
   gameOver = false;
   text2 = null;
   clickable = true;
   pressable = false;
   speed = 10;
   go = true;
   screen = "game";
   bg.src = "images/bg1.jpg";
   speedLoop = setInterval(speedIncrease,20000);
   compGen = setInterval(randomCompGenerator,3000);
   cloudGen = setInterval(randomCloudGenerator,2000);
  }
 }else if (screen != "game" && screen != "pregame" && screen != "menu"){
  clearInterval(compLoop);
  clearInterval(cloudLoop);
  clearInterval(compGen);
  clearInterval(cloudGen);
  clearInterval(speedLoop);
 }
 
 if (screen != "menu" && screen != "splash" && screen != "splash1" && screen != "splash2" && screen != "splashScreen"){
  if (((e.pageX - can.offsetLeft) > soundLeft ) && ((e.pageX - can.offsetLeft) < soundRight) && ((e.pageY - can.offsetTop) > soundTop) && ((e.pageY - can.offsetTop) < soundBottom)){
   if (sound == "true"){
    sound = "false";
    soundBar.src = "images/soundOff.png";
	localStorage.sound = "false";
   }else{
    sound = "true";
    soundBar.src = "images/soundOn.png";
	localStorage.sound = "true";
   }
  }
  if (((e.pageX - can.offsetLeft) > menuLeft ) && ((e.pageX - can.offsetLeft) < menuRight) && ((e.pageY - can.offsetTop) > menuTop) && ((e.pageY - can.offsetTop) < menuBottom)){
   gameOver = false;
   resetAll();
  }
 }
  
}

function keyPress(e){

 e = e || window.event;

 /*if ((e.keyCode == 32 || e.which == 32) && pressable == true && gameOver != true){
  text2 = null;
  pressable = false;
  clickable = true;
  go = true;
  speedLoop = setInterval(speedIncrease,20000);
  compGen = setInterval(randomCompGenerator,3000);
 }
 else if ((e.keyCode == 32 || e.which == 32) && gameOver == true){
  gameOver = false;
  text2 = null;
  clickable = true;
  pressable = false;
  go = true;
  speedLoop = setInterval(speedIncrease,20000);
  compGen = setInterval(randomCompGenerator,3000);
 }else{
  clearInterval(compLoop);
  clearInterval(compGen);
  clearInterval(speedLoop);
 }*/

}

function speedIncrease(){

 if (compSpeed < 21){
  compSpeed += 1;
 }
 
}

function mouseMoved(e){
	
 testy.innerHTML = "pageX: " + (e.pageX - can.offsetLeft) + " " + fbButtonLeft + " " + startButtonLeft + " pageY: " + (e.pageY - can.offsetTop) + " " + fbButtonTop + " " + startButtonTop;

}

function scaleImages(){

 var nw = can.scrollWidth;
 var nh = can.scrollHeight;
 
 if (nw < 600){
  startButtonLeft = (startButtonLeft / 600) * nw;
  startButtonRight = (startButtonRight / 600) * nw;
  fbButtonLeft = (fbButtonLeft / 600) * nw;
  fbButtonRight = (fbButtonRight / 600) * nw;
  menuRight = (menuRight / 600) * nw;
  soundLeft = (soundLeft / 600) * nw;
  soundRight = (soundRight / 600) * nw;
 }else if (nw > 600){
  startButtonLeft = (startButtonLeft * nw) / 600;
  startButtonRight = (startButtonRight * nw) / 600;
  fbButtonLeft = (fbButtonLeft * nw) / 600;
  fbButtonRight = (fbButtonRight * nw) / 600;
  menuRight = (menuRight * nw) / 600;
  soundLeft = (soundLeft * nw) / 600;
  soundRight = (soundRight * nw) / 600;
 }else{
  startButtonLeft = 124;
  startButtonRight = 455;
  fbButtonLeft = 150;
  fbButtonRight = 430;
  menuRight = 299;
  soundLeft = 300;
  soundRight = 600;
 }
 
 if (nh < 500){
  startButtonTop = (startButtonTop / 500) * nh;
  startButtonBottom = (startButtonBottom / 500) * nh;
  fbButtonTop = (fbButtonTop / 500) * nh;
  fbButtonBottom = (fbButtonBottom / 500) * nh;
  menuBottom = (menuBottom / 500) * nh;
  soundBottom = (soundBottom / 500) * nh;
 }else if (nh > 500){
  startButtonTop = (startButtonTop * nh) / 500;
  startButtonBottom = (startButtonBottom * nh) / 500;
  fbButtonTop = (fbButtonTop * nh) / 500;
  fbButtonBottom = (fbButtonBottom * nh) / 500;
  menuBottom = (menuBottom * nh) / 500;
  soundBottom = (soundBottom * nh) / 500;
 }else{
  startButtonTop = 140;
  startButtonBottom = 243;
  fbButtonTop = 268;
  fbButtonBottom = 360;
  menuBottom = 50;
  soundBottom = 50;
 }
}

function checkHighScore(){
 if (localStorage.hs == null || localStorage.hs == "undefined"){
  localStorage.hs = Math.floor(points/3);
  text2 = "Congrats on the new highscore of " + Math.floor(points/3) + "!";
  hs = true;
  bg.src = "images/bg2.jpg";
 }
 else if (Math.floor(points/3) > localStorage.hs){
  localStorage.hs = Math.floor(points/3);
  text2 = "Congrats on the new highscore of " + Math.floor(points/3) + "!";
  hs = true;
  bg.src = "images/bg2.jpg";
 }
 else{
  text2 = "Game Over! Click screen to restart...";
  hs = false;
 }
}

function checkSound(){

 localSound = localStorage.sound;
 if (localSound == "false"){
  soundBar.src = "images/soundOff.png";
 }else{
  sound = "true";
  soundBar.src = "images/soundOn.png";
 }
 
}

function powerUpLarge(){

}

function powerUpSmall(){

}
