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
        this.bt1 = this.add.image(0, window.innerHeight/2, 'button1').setOrigin(0,0.5).setInteractive().setScale(game.global.scaleVar).setFrame(mode1);
        this.bt1.on('pointerdown', () => {this.scene.start('preparing')});
        this.bt2 = this.add.image(window.innerWidth, window.innerHeight/2, 'button2').setOrigin(1,0.5).setInteractive().setScale(game.global.scaleVar).setFrame(mode2);
        this.bt2.on('pointerdown', () => { if(mode2>0){this.scene.start('dand');}});
        
    }
});
