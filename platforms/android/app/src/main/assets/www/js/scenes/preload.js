var preload = new Phaser.Class({

    Extends: Phaser.Scene,

    //function that loads assests
preload: function  ()
    {
        this.load.image('next', 'assets/next.png');
        this.load.image('aboutNotice', 'assets/aboutNotice.png');
        this.load.image('btnAbout', 'assets/btnAbout.png');
        this.load.image('btnDay1', 'assets/btnDay1.png');
        this.load.image('btnDay2', 'assets/btnDay2.png');
        this.load.image('btnDay3', 'assets/btnDay3.png');
        
        this.load.image('btnInfo', 'assets/btnInfo.png');
        this.load.image('btnPrepare1', 'assets/btnPrepare1.png');
        this.load.image('btnPrepare2', 'assets/btnPrepare2.png');
        this.load.image('infoNotice', 'assets/moreInfo.png');
        this.load.image('score', 'assets/score.png');
        this.load.image('congrats', 'assets/congratss.png');
        this.load.image('congrats1', 'assets/congrats2.png');

        this.load.image('home1', 'assets/home1.png');
        this.load.image('home2', 'assets/home2.png');
        this.load.image('home3', 'assets/home3.png');
        this.load.image('home4', 'assets/home4.png');
        
        this.load.image('continue1', 'assets/continue1.png');
        this.load.image('continue2', 'assets/continue2.png');
        this.load.image('notice', 'assets/notice.png');
        this.load.image('notice1', 'assets/notice1.png');
        this.load.image('notice2', 'assets/notice2.png');
        this.load.image('continue', 'assets/continue.png');
        this.load.image('optionBoxD', 'assets/optionBoxD.png');
        this.load.image('optionBoxR', 'assets/optionBoxR.png');
        this.load.image('optionBoxW', 'assets/optionBoxW.png');
        this.load.image('wall', 'assets/wall.png');
        this.load.image('warning', 'assets/warning.png');
        this.load.spritesheet('optionBox', 'assets/optionBox.png', { frameWidth: 1632, frameHeight: 362});
        this.load.spritesheet('button1', 'assets/bt1.png', { frameWidth: 720, frameHeight: 720});
        this.load.spritesheet('button2', 'assets/bt2.png', { frameWidth: 720, frameHeight: 720});
        this.load.spritesheet('vote1', 'assets/vote1.png', { frameWidth: 720, frameHeight: 720});
        this.load.spritesheet('vote2', 'assets/vote2.png', { frameWidth: 720, frameHeight: 720});
        this.load.spritesheet('vote3', 'assets/vote3.png', { frameWidth: 720, frameHeight: 720});
        this.load.spritesheet('vote4', 'assets/vote4.png', { frameWidth: 720, frameHeight: 720});
        this.load.bitmapFont('yellowFont', 'assets/fonts/bitmap/yellowfont.png', 'assets/fonts/bitmap/yellowfont.fnt');
        this.load.json('Mode1', 'js/Mode1.json ');
        this.load.json('Mode2', 'js/Mode2.json ');
    },
    
    //function that creates game objects after preload
    create: function ()
    {
        //stsrt the main menu scene
        this.scene.start('about');
    }

});