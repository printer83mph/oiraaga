var gameState = 0;

function doMenu() {
  background(255);
  textSize(height/7);
  fill(0);
  text('oiraaga',width/2,height/3);
  if(mouseX > width/2-200 && mouseY > height/5*3-80 && mouseX < width/2+200 && mouseY < height/5*3+80) {
    fill(180);
    if(mouseIsPressed) {
      gameState = 1;
      initGame();
    }
  } else {fill(255)}
  rect(width/2-200,height/5*3-80,400,160);
  fill(0);
  text('start',width/2,height/20*13);
}

function Pellet() {
  this.position = new p5.Vector(random(width),random(height));
  this.size = random(10,30);
  this.color = [random(255),random(255),random(255)];
  this.isTouchingPlayer = function() {
    if(dist(this.position.x,this.position.y,player.position.x,player.position.y) < this.size/2 + player.size/2)
    {return true;} else {return false;}
  }
  this.draw = function() {
    fill(this.color[0],this.color[1],this.color[2]);
    ellipse(this.position.x,this.position.y,this.size,this.size);
  }
}

function initGame() {
  player = {
    position: new p5.Vector(mouseX,mouseY),
    size: 100,
		viewSize: 100,
    draw: function() {
      fill(0,0,180);
      ellipse(this.position.x,this.position.y,this.viewSize,this.viewSize);
			var mouseDist = new p5.Vector(mouseX-this.position.x,mouseY-this.position.y);
			if(dist(this.position.x,this.position.y,mouseX,mouseY) > 2) {
      this.position.add(mouseDist.normalize().mult(2)); }
			this.viewSize += (this.size-this.viewSize)/5;
    }
  }
  pellets = [];
}

function doGame() {
  background(255,150);
  player.draw();
  for(var p in pellets) {
    pellets[p].draw();
    if(pellets[p].isTouchingPlayer()) {
      player.size += pellets[p].size/((player.size^2)/100);
			console.log(pellets[p].size/((player.size^2)/100));
      pellets.splice(p,1);
      p--;
    }
  }
  if(random(30)<1 && pellets.length < 10) {
    pellets.push(new Pellet());
  }
}

function setup() {
  canvas = createCanvas(window.innerWidth,window.innerHeight);
  textAlign(CENTER);
	strokeWeight(5);
  smooth();
}

function draw() {
  if(gameState === 0) {
    doMenu();
  }
  if(gameState === 1) {
    doGame();
  }
}