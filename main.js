song1="";
song2="";
Song1_status="";
Song2_status="";
score_rightwrist=0;
score_leftwrist=0;
rightwrist_x=0;
rightwrist_y=0;
leftwrist_x=0;
leftwrist_y=0;
function preload(){
song1=loadSound("jungkook&jimin.mp3");
song2=loadSound("blackpink.mp3");

}
function setup(){
canvas=createCanvas(600,500);
canvas.center();
video=createCapture(VIDEO);
video.hide();
posenet=ml5.poseNet(video,modelloaded);
posenet.on('pose',gotposes);

}
function modelloaded(){
    console.log("posenet is initilized");

}
function gotposes(results){
if(results.length>0) {
console.log(results);
score_rightwrist=results[0].pose.keypoints[10].score;
score_leftwrist=results[0].pose.keypoints[9].score;
rightwrist_x=results[0].pose.rightWrist.x;
rightwrist_y=results[0].pose.rightWrist.y;
leftwrist_x=results[0].pose.leftWrist.x;
leftwrist_y=results[0].pose.leftWrist.y;
}
}

function draw(){
image(video,0,0,600,500);
Song1_status=song1.isPlaying();
Song2_status=song2.isPlaying();
 fill("#000000");
 stroke("#E5A4EC");
if(score_leftwrist>0.2){
    circle(leftwrist_x,leftwrist_y,20);
    song1.stop();
    if(Song2_status==false){
        song2.play();
        document.getElementById("Song").innerHTML="playing-BLACKPINK";
    
    }
}
if(score_rightwrist>0.2){
    circle(rightwrist_x,rightwrist_y,20);
    song2.stop();
    if(Song1_status==false){
        song1.play();
        document.getElementById("Song").innerHTML="playing-Jungkook&Jimin";
    }
}
}
function start(){
song.play();
song.setVolume(1);
song.rate(1);
}