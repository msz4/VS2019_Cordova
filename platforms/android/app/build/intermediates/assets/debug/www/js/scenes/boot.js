//set basic game configuration variables, these can be accessed througout the game
var config = {
    type: Phaser.AUTO, 
    width: window.innerWidth, //1440
    height: window.innerHeight, //2560
    backgroundColor: '#F7F7F7', //Blue:#78A1BB Yellow:#F9C80E Green:#7DDF64 Red:#FE4A49
    scene: [preload, mainmenu, preparing,dand,about,info]    //load all the scenes you've created in the scene files, the first scene that loads once the game is created is preload
};

var game = new Phaser.Game(config); //create game using your created configuration

//create other variables such as score that can be accessed in all scenes of the game here
var scaler;
if(window.innerWidth>window.innerHeight){
    scaler=window.innerHeight/2560;
}
else{
    scaler=window.innerWidth/1440;
}
if (localStorage.getItem("mode2") === null) {
  localStorage.setItem("mode2", 0);
}

if (localStorage.getItem("mode1") === null) {
  localStorage.setItem("mode1", 0);
}
game.global = {
    scaleVar : scaler};
