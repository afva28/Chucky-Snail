export class LoadScene extends Phaser.Scene{
    constructor(){
        super('LoadScene');
    }

    preload(){
        this.load.image('background','./images/blue_land.png');
        this.load.spritesheet('player','./images/player.png',{
            frameWidth:128,
            frameHeight:144
        });
        this.load.spritesheet('ground','./images/ground.png',{
            frameWidth:128,
            frameHeight:128
        });
        this.load.spritesheet('objects','./images/objects.png',{
            frameWidth: 128,
            frameHeight: 128
        });
        this.load.spritesheet('snail','./images/snail.png',{
            frameWidth:128,
            frameHeight:96
        });
    }

    create(){
        this.createAnimations();

        this.scene.start('Level001');
    }

    createAnimations(){
        this.anims.create({
            key:'walking',
            frames: this.anims.generateFrameNames('player',{
                frames:[9,10]
            }),
            frameRate: 4,
            yoyo:true,
            repeat:-1
        });

        this.anims.create({
            key:'climbing',
            frames: this.anims.generateFrameNames('player',{
                frames:[0,1]
            }),
            frameRate: 4,
            yoyo:true,
            repeat:-1
        });

        this.anims.create({
            key: 'snail-walking',
            frames:this.anims.generateFrameNames('snail',{
                frames:[0,1]
            }),
            frameRate:4,
            yoyo: true,
            repeat:-1
        });
    }
}