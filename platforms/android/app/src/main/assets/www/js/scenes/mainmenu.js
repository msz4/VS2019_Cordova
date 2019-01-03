var mainmenu = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function mainmenu ()
    {
        Phaser.Scene.call(this, { key: 'mainmenu' });
    },

    create: function ()
    {   
        var mode2 = localStorage.getItem("mode2");
        var mode1 = localStorage.getItem("mode1")
        //this.cameras.main.setBackgroundColor('#ffffff');
        
        this.bt1 = this.add.image(window.innerWidth/2, window.innerHeight/2-(360*game.global.scaleVar), 'btnPrepare2').setOrigin(0.5,1).setInteractive().setScale(game.global.scaleVar);
        this.bt1.on('pointerdown', () => {this.scene.start('preparing')});
        if(mode1<1){this.bt1.setTexture("btnPrepare1");}
        
        this.bt2 = this.add.image(window.innerWidth/2, window.innerHeight/2, 'btnDay1').setOrigin(0.5,1).setInteractive().setScale(game.global.scaleVar);
        this.bt2.on('pointerdown', () => { if(mode2>0){this.scene.start('dand');}});
        if(mode2>1){this.bt2.setTexture("btnDay3");}
        else if(mode2==1){this.bt2.setTexture("btnDay2");}
        
        this.bt3 = this.add.image(0, window.innerHeight/2+(360*game.global.scaleVar), 'btnInfo').setOrigin(0,1).setInteractive().setScale(game.global.scaleVar);
        this.bt3.on('pointerdown', () => {this.scene.start('info');});
        
        this.bt4 = this.add.image(window.innerWidth, window.innerHeight/2+(360*game.global.scaleVar), 'btnAbout').setOrigin(1,1).setInteractive().setScale(game.global.scaleVar);
        this.bt4.on('pointerdown', () => {this.scene.start('about');});
        
    }
});
