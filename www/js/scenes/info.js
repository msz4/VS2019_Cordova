var info = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function info ()
    {
        Phaser.Scene.call(this, { key: 'info' });
    },

    create: function ()
    {   
        this.cameras.main.setBackgroundColor('#F98948');
        this.add.image(window.innerWidth/2, window.innerHeight/2, 'infoNotice').setOrigin(0.5).setScale(game.global.scaleVar);
        
        this.link1 = this.add.text(window.innerWidth/2,window.innerHeight/2-(250*game.global.scaleVar), "Follow this link to INEC's homepage", {fontFamily: 'font1',color:'#000000',fontSize: 70*game.global.scaleVar}).setOrigin(0.5).setWordWrapWidth(1340*game.global.scaleVar).setAlign('center');
        this.link1.on('pointerdown', () => {window.open("http://inecnigeria.org", "_blank");}, this);
        
        this.link2 = this.add.text(window.innerWidth/2,window.innerHeight/2, "Follow this link to INEC's voter verification page", {fontFamily: 'font1',color:'#000000',fontSize: 70*game.global.scaleVar}).setOrigin(0.5).setWordWrapWidth(1340*game.global.scaleVar).setAlign('center');
        this.link2.on('pointerdown', () => {window.open("http://inecnigeria.org", "_blank");}, this);
        
        this.link3 = this.add.text(window.innerWidth/2,window.innerHeight/2+(250*game.global.scaleVar), "Follow this link to INEC's voting guidelines page", {fontFamily: 'font1',color:'#000000',fontSize: 70*game.global.scaleVar}).setOrigin(0.5).setWordWrapWidth(1340*game.global.scaleVar).setAlign('center');
        this.link3.on('pointerdown', () => {window.open("http://inecnigeria.org", "_blank");}, this);
        
        this.home = this.add.image(window.innerWidth/2, window.innerHeight/2+(780*game.global.scaleVar), 'home3').setOrigin(0.5).setScale(game.global.scaleVar).setInteractive();
        this.home.on('pointerdown', () => {this.scene.start('mainmenu')});
    }
});
