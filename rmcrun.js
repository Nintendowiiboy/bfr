var mloop, fps, can, con, canWidth, canHeight, bg, rnd1, rnd2, comp, compAlive, compY, compX, compWidth, compHeight;
var compNum, player, playerHeight, playerWidth, playerX, playerY, death, splashNum, jumpLoop, fallLoop;
var clickable, screen, pressable, gameOver, points, highscore, compSpeed, compGen, go, msg2, speedLoop;
var text1, text2, jumpNoise, gameOverNoise, startButtonTopLeft, startButtonTopRight, startButtonBottomLeft, startButtonBottomRight;
var fb, fbButtonLeft, fbButtonRight, fbButtonBottom, fbButtonTop;
window.onload = start;

function start(){

 msg = document.getElementById("msg");
 msg2 = document.getElementById("msg2");
 player = new Image();
 player.src = "images/rmc1.png";
 fps = 40;
 can = document.getElementById("can");
 con = can.getContext("2d");
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
 scaleImages();
 mloop = setInterval("splash()",3000);
 fb = new Image();
 fb.src = "images/bg2.jpg";
 
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

 bg.src = "images/menu.jpg";
 con.clearRect(0,0,canWidth,canHeight);
 con.drawImage(bg,0,0,canWidth,canHeight);
 screen = "menu";
 clickable = true;
 
}

function mainLoop(){

 draw();
 testForImpact();
 //testScore();
 
}

function draw(){

 //msg2.innerHTML = "Speed: " + compSpeed;
 con.clearRect(0,0,600,500);
 con.drawImage(bg,0,0,canWidth,canHeight);
 con.drawImage(player,playerX,playerY);
 
 if (compAlive == true){
  con.drawImage(comp,compX,compY,compWidth,compHeight);
 }
 
 if (text1 != null){
  con.fillText(text1,5,20);
 }
 
 if (text2 != null && text2 == "Press Space to start..."){
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
 clearInterval(compGen);
 clearInterval(speedLoop);
 compSpeed = 10;
 go = false;
 gameOver = true;
 gameOverNoise.play();

}

function randomCompGenerator(){

 compX = canWidth;
 compAlive = true;
 rnd = Math.floor((Math.random()*4)+1);
 if (rnd == 2){
  compHeight = 54;
  compWidth = 74;
  compY = 433;
  comp.src = "images/gn.png";
  player.src = "images/rmc1.png";
 }else if (rnd == 1){
  compHeight = 27;
  compWidth = 37;
  compY = 460;
  comp.src = "images/gn.png";
  player.src = "images/rmc1.png";
 }else if (rnd == 3){
  compHeight = 54;
  compWidth = 74;
  compY = 433;
  comp.src = "images/wiius.png";
  player.src = "images/rmc1.png";
 }else if (rnd == 4){
  compHeight = 54;
  compWidth = 74;
  compY = 433;
  comp.src = "images/snake.png";
  player.src = "images/rmc3.png";
 }
 compLoop = setInterval("compMove()",1000/fps);

}

function compMove(){

 if (((compX + compWidth) > -5) && gameOver != true){
  compX -= compSpeed;
 }else{
  pressable = true;
  clearInterval(compLoop);
 }
}

function testForImpact(){

 if ((compX < (playerX + playerWidth)) && ((compX + compWidth) > playerX) && (compY > playerY) && (compY < (playerY + playerHeight))){
  death();
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
 text1 = null;
 text2 = null;

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
   text2 = "Press Space to start...";
  }
 }
 else if (clickable == true && screen == "game"){
  if (rnd == 4){
   jumpNoise.src = "audio/scream.wav";
   jumpNoise.play();
  }else{
   jumpNoise.src = "audio/wii.wav";
   jumpNoise.play();
  }
  jumpLoop = setInterval("jump()",1000/fps);
 }else{msg.innerHTML = "Can't click!";}

 if (screen == "pregame" && pressable == true && gameOver != true && clickable == false){
  text2 = null;
  pressable = false;
  clickable = true;
  go = true;
  speedLoop = setInterval(testScore,20000);
  compGen = setInterval(randomCompGenerator,3000);
  screen = "game";
 }
 else if (gameOver == true && screen == "death"){
  if (((e.pageX - can.offsetLeft) > fbButtonLeft ) && ((e.pageX - can.offsetLeft) < fbButtonRight) && ((e.pageY - can.offsetTop) > fbButtonTop) && ((e.pageY - can.offsetTop) < fbButtonBottom)){
    window.open("http://www.facebook.com/sharer.php?s=100&p[title]=High+Score!&p[summary]=I+just+made+a+highscore+of+" + localStorage.hs + "!+Download+your+copy+of+RMCRun+by+clicking+the+link!&p[url]=http://www.google.com/&p[images][0]=http://img845.imageshack.us/img845/1219/y8co.png", "_blank");
  }else{
   gameOver = false;
   text2 = null;
   clickable = true;
   pressable = false;
   go = true;
   screen = "game";
   bg.src = "images/bg1.jpg";
   speedLoop = setInterval(testScore,20000);
   compGen = setInterval(randomCompGenerator,3000);
  }
 }else if (screen != "game"){
  clearInterval(compLoop);
  clearInterval(compGen);
  clearInterval(speedLoop);
 }

}

function keyPress(e){

 e = e || window.event;

 /*if ((e.keyCode == 32 || e.which == 32) && pressable == true && gameOver != true){
  text2 = null;
  pressable = false;
  clickable = true;
  go = true;
  speedLoop = setInterval(testScore,20000);
  compGen = setInterval(randomCompGenerator,3000);
 }
 else if ((e.keyCode == 32 || e.which == 32) && gameOver == true){
  gameOver = false;
  text2 = null;
  clickable = true;
  pressable = false;
  go = true;
  speedLoop = setInterval(testScore,20000);
  compGen = setInterval(randomCompGenerator,3000);
 }else{
  clearInterval(compLoop);
  clearInterval(compGen);
  clearInterval(speedLoop);
 }*/

}

function testScore(){

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
 }else if (nw > 600){
  startButtonLeft = (startButtonLeft * nw) / 600;
  startButtonRight = (startButtonRight * nw) / 600;
  fbButtonLeft = (fbButtonLeft * nw) / 600;
  fbButtonRight = (fbButtonRight * nw) / 600;
 }else{
  startButtonLeft = 124;
  startButtonRight = 455;
  fbButtonLeft = 150;
  fbButtonRight = 430;
 }
 
 if (nh < 500){
  startButtonTop = (startButtonTop / 500) * nh;
  startButtonBottom = (startButtonBottom / 500) * nh;
  fbButtonTop = (fbButtonTop / 500) * nh;
  fbButtonBottom = (fbButtonBottom / 500) * nh;
 }else if (nh > 500){
  startButtonTop = (startButtonTop * nh) / 500;
  startButtonBottom = (startButtonBottom * nh) / 500;
  fbButtonTop = (fbButtonTop * nh) / 500;
  fbButtonBottom = (fbButtonBottom * nh) / 500;
 }else{
  startButtonTop = 140;
  startButtonBottom = 243;
  fbButtonTop = 268;
  fbButtonBottom = 360;
 }
}

function checkHighScore(){
 if (localStorage.hs == null || localStorage.hs == "undefined"){
  localStorage.hs = Math.floor(points/3);
  text2 = "Congrats on the new highscore of " + Math.floor(points/3) + "!";
  bg.src = "images/bg2.jpg";
 }
 else if (Math.floor(points/3) > localStorage.hs){
  localStorage.hs = Math.floor(points/3);
  text2 = "Congrats on the new highscore of " + Math.floor(points/3) + "!";
  bg.src = "images/bg2.jpg";
 }
 else{
  text2 = "Game Over! Press Space to restart...";
 }
}
