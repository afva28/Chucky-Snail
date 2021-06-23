import { Player } from "./player.js";

let levelData=[
    {
        x: 1024-128,
        y: 2048-192,
        repeat:1,
        key:'ground',
        frame:0,
        width:128,
        height: 128,
        physics: true
    },
    {
        x: 1024,
        y: 2048-192,
        repeat:3,
        key:'ground',
        frame:1,
        width:128,
        height: 128,
        physics: true
    },
    {
        x: 1024+384,
        y: 2048-192,
        repeat:1,
        key:'ground',
        frame:2,
        width:128,
        height: 128,
        physics: true
    }
]

let snailData=[
    {
        x:192,
        y:1568,
        key:'snail',
        frame: 0,
        animations:'snail-walking',
        min:{
            x: 192,
            y:1568
        },
        max:{
            x: 640,
            y: 1568
        },
        velocity: 10
    }
]

export class Level001 extends Phaser.Scene{
    constructor(){
        super('Level001');
    }

    init(){
        this.controls=this.input.keyboard.createCursorKeys();

        this.input.on('pointerdown',(pointer)=>{
            console.log(`${pointer.x},${pointer.y}`);
        })
    }

    create(){
        this.platforms = this.physics.add.staticGroup({
            allowGravity: false,
            immovable:true
        });

        this.ladders=this.physics.add.staticGroup({
            allowGravity:false,
            immovable:true
        });

        this.snails= this.physics.add.group();

        this.add.image(0,0,'background').setOrigin(0).setScale(2);

        this.createPlatforms();
        this.createLadder();

        this.snail=this.add.sprite(1154,1760,'snail',0).setOrigin(0);
        this.snail.anims.play('snail-walking');

        this.snails.add(this.snail);

        this.player = new Player(
            this,
            this.game.config.width*0.5,
            this.game.config.height*0.5,
            'player',6
        );

        

        this.physics.add.collider(this.player,this.platforms);
        this.physics.add.collider(this.snails,this.platforms);
        this.physics.add.overlap(this.player,this.ladders,this.onLadder,null,this);
        this.physics.add.overlap(this.player,this.snails,this.onSnail,null,this);

    }

    createPlatforms(){
        levelData.forEach(
            data=>{
                let newPlatform = undefined;
                if(data.repeat==1){
                    newPlatform =this.add.sprite(data.x,data.y,data.key,data.frame);
                }else{
                    newPlatform = this.add.tileSprite(data.x,data.y,data.repeat*data.width,data.height,data.key,data.frame);
                }
                newPlatform.setOrigin(0);
                if(data.physics){
                  this.platforms.add(newPlatform)  
                }
                
            }
        )
    }

    createLadder(){
        let ladder = this.add.tileSprite(
            1024+256, 2048 -768, 128, 5* 128, 'objects',3
        ).setOrigin(0);
        let ladderTop = this.add.sprite(
            1024+256, 2048 -896,'objects',4
        ).setOrigin(0);

        this.ladders.add(ladder);
        this.ladders.add(ladderTop);
    }

    onLadder(player,ladder){
        this.player.setOnLadder(true);
    }

    onSnail(player,snail){
        console.log('dont be creepy');
    }

    update(time){
       this.player.update(time);
       this.player.setOnLadder(false);
    }
}