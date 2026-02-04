
var leaf_seq;
var leaf_gen_period;
var frame_no;

var colors;

var font_title;
var font_text;
var img;

function preload(){
  font_title = loadFont('assets/alagard.ttf');
  font_text = loadFont('assets/dogicapixel.ttf');
  img = loadImage('assets/itsus.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  colors = [];
  colors.push(color(102, 115, 2));
  colors.push(color(34, 38, 1));
  colors.push(color(161, 166, 27));
  colors.push(color(130, 64, 37));
  colors.push(color(78, 38, 22));

  



  frame_no = 0;
  leaf_seq = [];
  leaf_gen_period = 5;
  for(let i = 0; i <= 100; i++){
    leaf_seq.push(generate_leaf_even());
  }

}

function draw() {
  frame_no++;
  background(0);
  ellipse(mouseX, mouseY, 10, 10);

  for(let i = 0; i < leaf_seq.length; i++){
    let leaf = leaf_seq[i];
    leaf.draw();
    leaf.move();
    leaf.update_acc_x();
    leaf.update_vel_x();
  }

  
  if(frame_no == leaf_gen_period){
    frame_no = 0;
    leaf_seq.push(generate_leaf_top());
  }

  text_box()
  


}

function text_box(){
  let max_image_height = 0.35 * windowHeight;
  let image_width = windowWidth*0.7;
  let image_height = image_width/1.5;
  if(image_height > max_image_height){
    image_height = max_image_height;
    image_width = image_height*1.5;
  }

  let rect_width = min(windowHeight*0.7,image_width*1.2)

  let small_pad = 0.07*windowHeight;
  let smaller_pad = 0.03*windowHeight;
  let medium_pad = 0.12 * windowHeight;


  fill(10);
  rectMode(CENTER)
  let rect_height = windowHeight * 0.9;
  rect(windowWidth/2,windowHeight/2,rect_width,rect_height)

  let rect_top = windowHeight/2-(rect_height/2)
  


  fill(255);
  textAlign(CENTER);
  textSize(40);

  textFont(font_title);
  let title_y = rect_top+small_pad;
  text("Been in Bloom",windowWidth/2,title_y);

  textSize(20);
  let subtitle_y = title_y+smaller_pad;
  text("- and friends",windowWidth/2,subtitle_y);

  imageMode(CENTER)
  
  let image_y = subtitle_y + 1.5*small_pad + image_height/3;


  image(img,windowWidth/2,image_y,image_width,image_height)
  
  let infos1_y = image_y+image_height/2+small_pad;
  let infos2_y = infos1_y+smaller_pad;
  let infos3_y = infos2_y+smaller_pad;

  textFont(font_text);
  textSize(14);
  text("What: Release Fest & Concert",windowWidth/2,infos1_y);
  text("Where: @Drop-inn - Telefonfabrikken - Gladsaxe",windowWidth/2,infos2_y);
  text("When: 21st of March",windowWidth/2,infos3_y);



  let special_guests_y_1 = infos3_y+medium_pad;
  let special_guests_y_2 = special_guests_y_1+smaller_pad;
  let special_guests_y_3 = special_guests_y_2+smaller_pad;

  textFont(font_title);
  textSize(25)
  text("Special Guests:",windowWidth/2,special_guests_y_1);
  textSize(15)
  text("Lydia (Singer/Songwriter)",windowWidth/2,special_guests_y_2);
  text("Clara/Nimue (Singer/Songwriter)",windowWidth/2,special_guests_y_3);

  

}

function generate_leaf_top(){
  return new Leaf(rand_int(windowWidth*2),-10,random_color());
}

function generate_leaf_even(){
  return new Leaf(rand_int(windowWidth*2),rand_int(windowHeight),random_color());
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function rand_int(max){
  return Math.floor(Math.random() * max);
}

function random_color(){
  return colors[rand_int(colors.length)];
}







class Leaf {
  constructor(x, y, color) {
    this.color = color;

    this.pos_x = x;
    this.pos_y = y;

    this.vel_x = 0;
    this.vel_y = 1;

    this.acc_x = 0;

    this.move_ability = Math.random()*0.5 + 0.5

  }

  move(){
    this.pos_y += this.vel_y * this.move_ability;
    this.pos_x += this.vel_x * this.move_ability;
  }

  update_vel_x(){
    this.vel_x += this.acc_x;
    this.vel_x = this.vel_x * 0.95;


  
  }

  update_acc_x(){
    let y_scaler = -Math.pow(Math.sin(this.pos_y * (Math.PI/windowHeight)),3) * 8;
  
    let x_factor = -((this.pos_x + 100) / windowWidth)
    x_factor = 1;
    this.acc_x = x_factor * y_scaler * 0.01;
  }

  draw(){
    fill(this.color);
    ellipse(this.pos_x,this.pos_y,5,5);
  }
}


