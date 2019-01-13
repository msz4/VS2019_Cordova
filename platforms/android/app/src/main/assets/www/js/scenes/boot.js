var game;

document.addEventListener('deviceready', function() {
var about = new Phaser.Scene('About');
var mainmenu = new Phaser.Scene('Menu');
var info = new Phaser.Scene('Info');
var prepare = new Phaser.Scene('Prepare');
var vote = new Phaser.Scene('Vote');
 
//PREPARE PREPARE PREPARE PREPARE PREPARE PREPARE
prepare.preload = function() {

};

 prepare.showFinalMessage = function(){
        this.notice.destroy();
        this.txtQuestion.destroy();
        this.home.destroy();
        this.sound.play('done');
        
        this.congrats = this.add.image(window.innerWidth/2, 40, 'congrats').setOrigin(0.5,0).setInteractive().setScale(this.scaler);
        
        this.notice = this.add.image(window.innerWidth/2, window.innerHeight/2, 'notice1').setOrigin(0.5).setInteractive().setScale(this.scaler); 
        this.txtQuestion = this.add.text(window.innerWidth/2,this.notice.y, this.getInfo["Final"], {fontFamily: 'font1',color:"#000000",fontSize: 75*this.scaler}).setOrigin(0.5).setWordWrapWidth(1340*this.scaler).setAlign('center');//setShadow(1,0.5);
        
        var mode2 = localStorage.getItem("mode2");
        if(mode2<1){
            localStorage.setItem("mode2", 1);
        }
        localStorage.setItem("mode1", 1);
    
        
        this.home_ = this.add.image(window.innerWidth/2, window.innerHeight/2+(780*this.scaler), 'home1').setOrigin(0.5).setInteractive().setScale(this.scaler);
        this.home_.on('pointerdown', function (event) {this.scene.start(mainmenu);}, this);
    };
    
prepare.reset=function(){
        this.notice.destroy();
        this.txtQuestion.destroy();
        this.next.destroy();
        this.selectedCount=0;
        this.questions-=1;
        if(this.questions==0){this.showFinalMessage();}//this.scene.start('mainmenu');}
        else{
        this.nextQuestion();}
    };
    
prepare.showInfo = function(){
        var Q = "Q"+(this.counter-1);
        this.txtQuestion.destroy();
        this.continue.destroy();
        this.txtScore.destroy();
        this.scoreBoard.destroy();
        
        for (var i=0; i<4; i++)
        {
            this.options[i].text.destroy();
            this.options[i].destroy();
        } 
        this.notice = this.add.image(window.innerWidth/2, window.innerHeight/2, 'notice1').setOrigin(0.5).setInteractive().setScale(this.scaler); 
        this.txtQuestion = this.add.text(window.innerWidth/2,this.notice.y, this.getInfo[Q]['Info'], {fontFamily: 'font1',color:'#000000',fontSize: 70*this.scaler}).setOrigin(0.5).setWordWrapWidth(1340*this.scaler).setAlign('center');//setShadow(1,0.5);
        
        this.next = this.add.image(window.innerWidth/2,window.innerHeight/2+(780*this.scaler), "continue1").setOrigin(0.5).setInteractive().setScale(this.scaler);
        this.next.on('pointerdown', function (event) {this.reset();}, this);
};
    
prepare.create = function (){
    this.scaler=0;
    if(window.innerWidth>window.innerHeight){
    this.scaler=window.innerHeight/2560;
    }
    else{
        this.scaler=window.innerWidth/1440;
    }
    
        this.cameras.main.setBackgroundColor('#F9C80E');
        this.selectedOption="";
        this.correctAnswers = 0;
        this.answers=[];
        this.selectedCount=0;
        this.questions=6;
        this.continueUse = 0;
        
        this.counter = 1;
        this.options = [{ pos: '0', text: '', button: '' }, { pos: '1', text: '', button: '' }, { pos: '2', text: '', button: '' }, { pos: '3', text: '', button: '' }];
        
        this.getInfo = this.cache.json.get('Mode1');
        console.log(this.getInfo);
        console.log(this.txtQuestion);
        
        this.home = this.add.image(0, 0, 'home1').setOrigin(0).setInteractive().setScale(this.scaler); 
        this.home.on('pointerdown', function (event) {this.scene.start(mainmenu)}, this);
        this.nextQuestion();
};

prepare.nextQuestion = function(){
        var Q = "Q"+this.counter;
    
        this.answers = this.getInfo[Q]["CA"];
        this.correctAnswers = this.answers.length;
        
        this.scoreBoard = this.add.image(window.innerWidth, 0, 'score').setOrigin(1,0).setScale(this.scaler); 
        this.txtScore = this.add.text(this.scoreBoard.x-(540/2*(this.scaler)), this.scoreBoard.y+(240/2*(this.scaler)), "0/"+this.correctAnswers, {fontFamily: 'font1', color:"#000000",fontSize: 80*this.scaler}).setOrigin(0.5).setAlign('center');
        
        console.log(this.answers);7
        console.log(this.correctAnswers);
        
        this.txtQuestion = this.add.text(window.innerWidth/2, window.innerHeight/2-(650*this.scaler), this.getInfo[Q]['Question'], {fontFamily: 'font1',fontSize: 80*this.scaler, color:'#FFffff'}).setOrigin(0.5).setWordWrapWidth(1300*this.scaler).setAlign('center');
      
        console.log('inside');
        this.options[0]= this.add.image(window.innerWidth/2, window.innerHeight/2-(260*this.scaler), 'optionBoxD').setOrigin(0.5).setInteractive().setScale(this.scaler);
        this.options[0].on('pointerdown', function (event) {this.selectedOption = 0;this.options[0].disableInteractive();this.clickHandler();}, this);
        this.options[0].text = this.add.text(window.innerWidth/2, this.options[0].y, this.getInfo[Q]['options'][0][0], {fontFamily: 'font1',fontSize: 60*this.scaler, color:'#000000'}).setOrigin(0.5).setWordWrapWidth(1300*this.scaler).setAlign('center');//.setShadow(1,0.5);
        
        //this.add.bitmapText(720, this.options[0].y+150, 'yellowFont', this.getInfo[Q]['options'][0][0], 60).setOrigin(0.5);
        
        this.options[1] = this.add.image(window.innerWidth/2, window.innerHeight/2, 'optionBoxD').setOrigin(0.5).setInteractive().setScale(this.scaler);
        this.options[1].on('pointerdown', function (event) {this.selectedOption = 1;this.options[1].disableInteractive();this.clickHandler();}, this);
        this.options[1].text = this.add.text(window.innerWidth/2, this.options[1].y, this.getInfo[Q]['options'][1][0], {fontFamily: 'font1',fontSize: 60*this.scaler, color:'#000000'}).setOrigin(0.5).setWordWrapWidth(1300*this.scaler).setAlign('center');//.setShadow(1,0.5);
        
        this.options[2] = this.add.image(window.innerWidth/2, window.innerHeight/2+(260*this.scaler), 'optionBoxD').setOrigin(0.5).setInteractive().setScale(this.scaler);
        this.options[2].on('pointerdown', function (event) {this.selectedOption = 2;this.options[2].disableInteractive();this.clickHandler();}, this);
        this.options[2].text = this.add.text(window.innerWidth/2, this.options[2].y, this.getInfo[Q]['options'][2][0], {fontFamily: 'font1',fontSize: 60*this.scaler, color:'#000000'}).setOrigin(0.5).setWordWrapWidth(1300*this.scaler).setAlign('center');//.setShadow(1,0.5);
        
        this.options[3] = this.add.image(window.innerWidth/2, window.innerHeight/2+(520*this.scaler), 'optionBoxD').setOrigin(0.5).setInteractive().setScale(this.scaler);
        this.options[3].on('pointerdown', function (event) {this.selectedOption = 3; this.options[3].disableInteractive(); this.clickHandler();}, this);
        this.options[3].text = this.add.text(window.innerWidth/2, this.options[3].y, this.getInfo[Q]['options'][3][0], {fontFamily: 'font1',fontSize: 60*this.scaler, color:'#000000'}).setOrigin(0.5).setWordWrapWidth(1300*this.scaler).setAlign('center');//.setShadow(1,0.5);
        
        this.counter+=1;
};

prepare.clickHandler = function(){
    var right = false;
        for(var i=0; i<this.correctAnswers; i++){
            if (this.selectedOption==this.answers[i]){
                this.sound.play('correct');
                this.options[this.selectedOption].setTexture('optionBoxR');
                this.options[this.selectedOption].text.setColor("#ffffff");
                this.selectedCount+=1;
                this.txtScore.setText(this.selectedCount+"/"+this.correctAnswers)
                right=true;
                break;
            }
        }
        
        if (right==false){
            this.sound.play('wrong');
            this.options[this.selectedOption].setTexture('optionBoxW');
            this.options[this.selectedOption].text.setColor("#ffffff");
        }
        else if (this.selectedCount==this.correctAnswers){  
            this.continue = this.add.image(window.innerWidth/2, window.innerHeight/2+(780*this.scaler), 'continue1').setOrigin(0.5).setInteractive().setScale(this.scaler);
            this.continue.on('pointerdown', function (event) {this.showInfo();}, this);
        }
        
        console.log("progress:");
        console.log(this.selectedCount);
        console.log(this.correctAnswers);

};



    
    
//INFO INFO INFO INFO INFO INFO
info.preload = function() {
    
};
 
info.create = function() {
    
    this.scaler=0;
    if(window.innerWidth>window.innerHeight){
    this.scaler=window.innerHeight/2560;
    }
    else{
        this.scaler=window.innerWidth/1440;
    }
    
        this.cameras.main.setBackgroundColor('#F98948');
        this.add.image(window.innerWidth/2, window.innerHeight/2, 'infoNotice').setOrigin(0.5).setScale(this.scaler);
        
        this.link1 = this.add.text(window.innerWidth/2,window.innerHeight/2-(200*this.scaler), "Follow this link to INEC's homepage", {fontFamily: 'font1',color:'#000000',fontSize: 70*this.scaler}).setOrigin(0.5).setWordWrapWidth(1340*this.scaler).setAlign('center').setInteractive();
        this.link1.on('pointerdown', function (event) {window.open("http://inecnigeria.org", "_blank");}, this);
        
        this.link2 = this.add.text(window.innerWidth/2,window.innerHeight/2, "Follow this link to INEC's voter verification page", {fontFamily: 'font1',color:'#000000',fontSize: 70*this.scaler}).setOrigin(0.5).setWordWrapWidth(1340*this.scaler).setAlign('center').setInteractive();
        this.link2.on('pointerdown', function (event) {window.open("http://voterreg.inecnigeria.org/", "_blank");}, this);
        
        this.link3 = this.add.text(window.innerWidth/2,window.innerHeight/2+(200*this.scaler), "Follow this link to INEC's voting guidelines page", {fontFamily: 'font1',color:'#000000',fontSize: 70*this.scaler}).setOrigin(0.5).setWordWrapWidth(1340*this.scaler).setAlign('center').setInteractive();
        this.link3.on('pointerdown', function (event) {window.open("http://www.inecnigeria.org/?page_id=22", "_blank");}, this);
        
        this.link4 = this.add.text(window.innerWidth/2,window.innerHeight/2+(400*this.scaler), "Follow this link to INEC's voter's card replacement guidelines", {fontFamily: 'font1',color:'#000000',fontSize: 70*this.scaler}).setOrigin(0.5).setWordWrapWidth(1340*this.scaler).setAlign('center').setInteractive();
        this.link4.on('pointerdown', function (event) {window.open("http://www.inecnigeria.org/?page_id=2048", "_blank");}, this);
    
    this.home = this.add.image(window.innerWidth/2, window.innerHeight/2+(780*this.scaler), 'home3').setOrigin(0.5).setScale(this.scaler).setInteractive();
    this.home.on('pointerdown', function(event) {
      this.scene.start(mainmenu);
    }, this);
}    

//ABOUT ABOUT ABOUT ABOUT ABOUT
about.preload = function() {
        this.load.image('btnAbout', 'assets/btnAbout.png');
    this.load.image('btnInfo', 'assets/btnInfo.png');
    this.load.image('btnPrepare1', 'assets/btnPrepare1.png');
    this.load.image('btnPrepare2', 'assets/btnPrepare2.png');
    this.load.image('footer', 'assets/footer.png');
    this.load.image('btnDay1', 'assets/btnDay1.png');
    this.load.image('btnDay2', 'assets/btnDay2.png');
    this.load.image('btnDay3', 'assets/btnDay3.png');
    
    
    this.load.image('aboutNotice', 'assets/aboutNotice.png');
    this.load.image('home4', 'assets/home4.png');
    
    this.load.image('infoNotice', 'assets/moreInfo.png');
    this.load.image('home3', 'assets/home3.png');
    
    this.load.image('home2', 'assets/home2.png');
    this.load.image('continue2', 'assets/continue2.png');
    this.load.json('Mode2', 'js/Mode2.json ');
    this.load.image('optionBoxD', 'assets/optionBoxD.png');
    this.load.image('optionBoxR', 'assets/optionBoxR.png');
    this.load.image('optionBoxW', 'assets/optionBoxW.png');
    this.load.image('score', 'assets/score.png');
    this.load.image('notice2', 'assets/notice2.png');
    this.load.image('congrats1', 'assets/congrats2.png');
    
    
    this.load.audio("correct", "assets/correct.mp3");
    this.load.audio("wrong", "assets/wrong.mp3");
    this.load.audio("done", "assets/done.mp3");
    
    this.load.spritesheet('vote1', 'assets/vote1.png', { frameWidth: 720, frameHeight: 720});
    this.load.spritesheet('vote2', 'assets/vote2.png', { frameWidth: 720, frameHeight: 720});
    this.load.spritesheet('vote3', 'assets/vote3.png', { frameWidth: 720, frameHeight: 720});
    this.load.spritesheet('vote4', 'assets/vote4.png', { frameWidth: 720, frameHeight: 720});
    
    this.load.image('home1', 'assets/home1.png');
    this.load.image('continue1', 'assets/continue1.png');
    this.load.json('Mode1', 'js/Mode1.json ');
    this.load.image('optionBoxD', 'assets/optionBoxD.png');
    this.load.image('optionBoxR', 'assets/optionBoxR.png');
    this.load.image('optionBoxW', 'assets/optionBoxW.png');
    
    this.load.image('notice1', 'assets/notice1.png');
    this.load.image('congrats', 'assets/congratss.png'); 
};
 
about.create = function() {
    
    this.scaler=0;
    if(window.innerWidth>window.innerHeight){
    this.scaler=window.innerHeight/2560;
    }
    else{
        this.scaler=window.innerWidth/1440;
    }
    
    this.cameras.main.setBackgroundColor('#E4DFDA');
    this.add.image(window.innerWidth/2, window.innerHeight/2, 'aboutNotice').setOrigin(0.5).setScale(this.scaler);
    
    this.home = this.add.image(window.innerWidth/2, window.innerHeight/2+(780*this.scaler), 'home4').setOrigin(0.5).setScale(this.scaler).setInteractive();
    this.home.on('pointerdown', function(event) {
      this.scene.start(mainmenu);
    }, this);
}




    
//VVOTE VOTE VOTE VOTE VOTE VOTE VOET
vote.preload = function() {
};

    vote.create = function (){
    this.scaler=0;
    if(window.innerWidth>window.innerHeight){
    this.scaler=window.innerHeight/2560;
    }
    else{
        this.scaler=window.innerWidth/1440;
    }
    
        this.cameras.main.setBackgroundColor('#78A1BB');
        this.selectedOption="";
        this.correctAnswers = 0;
        this.answers=[];
        this.selectedCount=0;
        this.questions=7;
        this.continueUse = 0;
        
        this.counter = 1;
        this.options = [{ pos: '0', text: '', button: '' }, { pos: '1', text: '', button: '' }, { pos: '2', text: '', button: '' }, { pos: '3', text: '', button: '' }];
        
        this.getInfo = this.cache.json.get('Mode2');
        console.log(this.getInfo);
        console.log(this.txtQuestion);
        
        this.home = this.add.image(0, 0, 'home2').setOrigin(0).setInteractive().setScale(this.scaler); 
        this.home.on('pointerdown', function (event) {this.scene.start(mainmenu)}, this);
        this.nextQuestion();
};

 vote.showFinalMessage = function(){
        this.notice.destroy();
        this.txtQuestion.destroy();
        this.home.destroy();
        this.sound.play('done');
        
        this.congrats = this.add.image(window.innerWidth/2, 40, 'congrats1').setOrigin(0.5,0).setInteractive().setScale(this.scaler);
        
        this.notice = this.add.image(window.innerWidth/2, window.innerHeight/2, 'notice2').setOrigin(0.5).setInteractive().setScale(this.scaler); 
        this.txtQuestion = this.add.text(window.innerWidth/2,this.notice.y, this.getInfo["Final"], {fontFamily: 'font1',color:"#000000",fontSize: 75*this.scaler}).setOrigin(0.5).setWordWrapWidth(1340*this.scaler).setAlign('center');//setShadow(1,0.5);
        
        localStorage.setItem("mode2", 2);
    
        
        this.home_ = this.add.image(window.innerWidth/2, window.innerHeight/2+(780*this.scaler), 'home2').setOrigin(0.5).setInteractive().setScale(this.scaler);
        this.home_.on('pointerdown', function (event) {this.scene.start(mainmenu);}, this);
    };
    
vote.reset=function(){
        this.notice.destroy();
        this.txtQuestion.destroy();
        this.next.destroy();
        this.selectedCount=0;
        this.questions-=1;
        if(this.questions==0){this.showFinalMessage();}//this.scene.start('mainmenu');}
        else{
        this.nextQuestion();}
    };
    
vote.showInfo = function(){
        var Q = "Q"+(this.counter-1);
        this.txtQuestion.destroy();
        this.continue.destroy();
        this.txtScore.destroy();
        this.scoreBoard.destroy();
        
        for (var i=0; i<4; i++)
        {
            try{
                this.options[i].text.destroy();
            }
            
            catch(err){}
            
            this.options[i].destroy();
        } 
        this.notice = this.add.image(window.innerWidth/2, window.innerHeight/2, 'notice2').setOrigin(0.5).setInteractive().setScale(this.scaler); 
        this.txtQuestion = this.add.text(window.innerWidth/2,this.notice.y, this.getInfo[Q]['Info'], {fontFamily: 'font1',color:'#000000',fontSize: 70*this.scaler}).setOrigin(0.5).setWordWrapWidth(1340*this.scaler).setAlign('center');//setShadow(1,0.5);
        
        this.next = this.add.image(window.innerWidth/2,window.innerHeight/2+(780*this.scaler), "continue2").setOrigin(0.5).setInteractive().setScale(this.scaler);
        this.next.on('pointerdown', function (event) {this.reset();}, this);
};

vote.nextQuestion = function(){
    
        var Q = "Q"+this.counter;
        
        if (Q=="Q5"){
            this.graphicQuestion(Q);
        }
        
        else{
    
        this.answers = this.getInfo[Q]["CA"];
        this.correctAnswers = this.answers.length;
        
        this.scoreBoard = this.add.image(window.innerWidth, 0, 'score').setOrigin(1,0).setScale(this.scaler); 
        this.txtScore = this.add.text(this.scoreBoard.x-(540/2*(this.scaler)), this.scoreBoard.y+(240/2*(this.scaler)), "0/"+this.correctAnswers, {fontFamily: 'font1', color:"#000000",fontSize: 80*this.scaler}).setOrigin(0.5).setAlign('center');
        
        console.log(this.answers);7
        console.log(this.correctAnswers);
        
        this.txtQuestion = this.add.text(window.innerWidth/2, window.innerHeight/2-(650*this.scaler), this.getInfo[Q]['Question'], {fontFamily: 'font1',fontSize: 80*this.scaler, color:'#FFffff'}).setOrigin(0.5).setWordWrapWidth(1300*this.scaler).setAlign('center');
      
        console.log('inside');
        this.options[0]= this.add.image(window.innerWidth/2, window.innerHeight/2-(260*this.scaler), 'optionBoxD').setOrigin(0.5).setInteractive().setScale(this.scaler);
        this.options[0].on('pointerdown', function (event) {this.selectedOption = 0;this.options[0].disableInteractive();this.clickHandler();}, this);
        this.options[0].text = this.add.text(window.innerWidth/2, this.options[0].y, this.getInfo[Q]['options'][0][0], {fontFamily: 'font1',fontSize: 60*this.scaler, color:'#000000'}).setOrigin(0.5).setWordWrapWidth(1300*this.scaler).setAlign('center');//.setShadow(1,0.5);
        
        //this.add.bitmapText(720, this.options[0].y+150, 'yellowFont', this.getInfo[Q]['options'][0][0], 60).setOrigin(0.5);
        
        this.options[1] = this.add.image(window.innerWidth/2, window.innerHeight/2, 'optionBoxD').setOrigin(0.5).setInteractive().setScale(this.scaler);
        this.options[1].on('pointerdown', function (event) {this.selectedOption = 1;this.options[1].disableInteractive();this.clickHandler();}, this);
        this.options[1].text = this.add.text(window.innerWidth/2, this.options[1].y, this.getInfo[Q]['options'][1][0], {fontFamily: 'font1',fontSize: 60*this.scaler, color:'#000000'}).setOrigin(0.5).setWordWrapWidth(1300*this.scaler).setAlign('center');//.setShadow(1,0.5);
        
        this.options[2] = this.add.image(window.innerWidth/2, window.innerHeight/2+(260*this.scaler), 'optionBoxD').setOrigin(0.5).setInteractive().setScale(this.scaler);
        this.options[2].on('pointerdown', function (event) {this.selectedOption = 2;this.options[2].disableInteractive();this.clickHandler();}, this);
        this.options[2].text = this.add.text(window.innerWidth/2, this.options[2].y, this.getInfo[Q]['options'][2][0], {fontFamily: 'font1',fontSize: 60*this.scaler, color:'#000000'}).setOrigin(0.5).setWordWrapWidth(1300*this.scaler).setAlign('center');//.setShadow(1,0.5);
        
        this.options[3] = this.add.image(window.innerWidth/2, window.innerHeight/2+(520*this.scaler), 'optionBoxD').setOrigin(0.5).setInteractive().setScale(this.scaler);
        this.options[3].on('pointerdown', function (event) {this.selectedOption = 3; this.options[3].disableInteractive(); this.clickHandler();}, this);
        this.options[3].text = this.add.text(window.innerWidth/2, this.options[3].y, this.getInfo[Q]['options'][3][0], {fontFamily: 'font1',fontSize: 60*this.scaler, color:'#000000'}).setOrigin(0.5).setWordWrapWidth(1300*this.scaler).setAlign('center');//.setShadow(1,0.5);
        }
        this.counter+=1;
};

vote.clickHandler = function(){
    var right = false;
        for(var i=0; i<this.correctAnswers; i++){
            if (this.selectedOption==this.answers[i]){
                this.sound.play('correct');
                this.options[this.selectedOption].setTexture('optionBoxR');
                this.options[this.selectedOption].text.setColor("#ffffff");
                this.selectedCount+=1;
                this.txtScore.setText(this.selectedCount+"/"+this.correctAnswers)
                right=true;
                break;
            }
        }
        
        if (right==false){
            this.sound.play('wrong');
            this.options[this.selectedOption].setTexture('optionBoxW');
            this.options[this.selectedOption].text.setColor("#ffffff");
        }
        else if (this.selectedCount==this.correctAnswers){  
            this.continue = this.add.image(window.innerWidth/2, window.innerHeight/2+(780*this.scaler), 'continue2').setOrigin(0.5).setInteractive().setScale(this.scaler);
            this.continue.on('pointerdown', function (event) {this.showInfo();}, this);
        }
        
        console.log("progress:");
        console.log(this.selectedCount);
        console.log(this.correctAnswers);

};
    
vote.clickHandler2=function ()
    {
        this.continue = this.add.image(window.innerWidth/2, window.innerHeight/2+(780*this.scaler), 'continue2').setOrigin(0.5).setInteractive().setScale(this.scaler);
        this.txtScore.setText("1/"+this.correctAnswers)
        this.continue.on('pointerdown', function (event) {this.showInfo();}, this);
    };
    
vote.graphicQuestion=function (Q)
    {
        this.answers = this.getInfo[Q]["CA"];
        this.correctAnswers = this.answers.length;
        
        this.scoreBoard = this.add.image(window.innerWidth, 0, 'score').setOrigin(1,0).setScale(this.scaler); 
        this.txtScore = this.add.text(this.scoreBoard.x-(540/2*(this.scaler)), this.scoreBoard.y+(240/2*(this.scaler)), "0/"+this.correctAnswers, {fontFamily: 'font1', color:"#000000",fontSize: 80*this.scaler}).setOrigin(0.5).setAlign('center');

        console.log(this.answers);
        console.log(this.correctAnswers);

        this.txtQuestion = this.add.text(window.innerWidth/2, window.innerHeight/2-(650*this.scaler), this.getInfo[Q]['Question'], {fontFamily: 'font1',fontSize: 80*this.scaler, color:'#FFffff'}).setOrigin(0.5).setWordWrapWidth(1300*this.scaler).setAlign('center');

        console.log('inside');
        this.options[0]= this.add.image(window.innerWidth/4, window.innerHeight/2-(200*this.scaler), 'vote1').setOrigin(0.5).setInteractive().setScale(this.scaler*.72);
        this.options[0].on('pointerdown', function (event) {this.options[0].setFrame(1);this.options[0].disableInteractive();this.sound.play('wrong');}, this);
        
        this.options[1]= this.add.image(window.innerWidth *3/4, window.innerHeight/2-(200*this.scaler), 'vote2').setOrigin(0.5).setInteractive().setScale(this.scaler*.72);
        this.options[1].on('pointerdown', function (event) {this.options[1].setFrame(1);this.options[1].disableInteractive();this.sound.play('wrong');}, this);

        this.options[2]= this.add.image(window.innerWidth/4, window.innerHeight/2+(390*this.scaler), 'vote3').setOrigin(0.5).setInteractive().setScale(this.scaler*.72);
        this.options[2].on('pointerdown', function (event) {this.options[2].setFrame(1);this.options[2].disableInteractive(); this.clickHandler2();this.sound.play('correct');}, this);
        
        this.options[3]= this.add.image(window.innerWidth *3/4,window.innerHeight/2+(390*this.scaler), 'vote4').setOrigin(0.5).setInteractive().setScale(this.scaler*.72);
        this.options[3].on('pointerdown', function (event) {this.options[3].setFrame(1);this.options[3].disableInteractive();this.sound.play('wrong');}, this);
    };
    
    

//MAINMENU MAINMENU MAINMENU MAINMENU MAINMENU
mainmenu.preload = function() {
};
 

mainmenu.create = function() {
    this.scaler=0;
    if(window.innerWidth>window.innerHeight){
    this.scaler=window.innerHeight/2560;
    }
    else{
        this.scaler=window.innerWidth/1440;
    }
    
    var mode2 = localStorage.getItem("mode2");
    var mode1 = localStorage.getItem("mode1")
    //this.cameras.main.setBackgroundColor('#ffffff');
        
    this.bt1 = this.add.image(window.innerWidth/2, window.innerHeight/2-(360*this.scaler), 'btnPrepare2').setOrigin(0.5,1).setInteractive().setScale(this.scaler);
    this.bt1.on('pointerdown', function(event) {this.scene.start(prepare)}, this);
    if(mode1<1){this.bt1.setTexture("btnPrepare1");}
        
    this.bt2 = this.add.image(window.innerWidth/2, window.innerHeight/2, 'btnDay1').setOrigin(0.5,1).setInteractive().setScale(this.scaler);        7
    this.bt2.on('pointerdown', function(event) { if(mode2>0){this.scene.start(vote);}}, this);
    if(mode2>1){this.bt2.setTexture("btnDay3");}
    else if(mode2==1){this.bt2.setTexture("btnDay2");}
        
    this.bt3 = this.add.image(window.innerWidth/2, window.innerHeight/2+(360*this.scaler), 'btnInfo').setOrigin(1,1).setInteractive().setScale(this.scaler);
    this.bt3.on('pointerdown', function(event) {this.scene.start(info);}, this);
        
    this.bt4 = this.add.image(window.innerWidth/2, window.innerHeight/2+(360*this.scaler), 'btnAbout').setOrigin(0,1).setInteractive().setScale(this.scaler);
    this.bt4.on('pointerdown', function(event) {this.scene.start(about);}, this);
        
    this.footer = this.add.image(window.innerWidth/2, window.innerHeight+(40*this.scaler), 'footer').setOrigin(0.5,1).setInteractive().setScale(this.scaler);
    this.footer.on('pointerdown', function(event) {window.open("http://iidea.org.ng", "_blank");}, this);
}


var config = {
    type: Phaser.AUTO, 
    width: window.innerWidth, //1440
    height: window.innerHeight, //2560
    backgroundColor: '#ffffff', //Blue:#78A1BB Yellow:#F9C80E Green:#7DDF64 Red:#FE4A49
    scene: [about,mainmenu,info,prepare,vote]   //load all the scenes you've created in the scene files, the first scene that loads once the game is created is preload
};
    if (localStorage.getItem("mode2") === null) {
      localStorage.setItem("mode2", 0);
    }

    if (localStorage.getItem("mode1") === null) {
      localStorage.setItem("mode1", 0);
    }

    
    game = new Phaser.Game(config);
});
