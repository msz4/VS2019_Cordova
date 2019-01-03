var about = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function about ()
    {
        Phaser.Scene.call(this, { key: 'about' });
    },

    create: function ()
    {   
        this.cameras.main.setBackgroundColor('#E4DFDA');
        this.add.image(window.innerWidth/2, window.innerHeight/2, 'aboutNotice').setOrigin(0.5).setScale(game.global.scaleVar);
        
        this.home = this.add.image(window.innerWidth/2, window.innerHeight/2+(780*game.global.scaleVar), 'home4').setOrigin(0.5).setScale(game.global.scaleVar).setInteractive();
        this.home.on('pointerdown', () => {this.scene.start('mainmenu')});
    }
});
