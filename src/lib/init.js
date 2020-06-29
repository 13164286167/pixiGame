import * as PIXI from  'pixi.js'
import {createImageByRes, createImage, alignCenter, getTexture, createAudioByRes, createMask, hideMask, createAnimation} from './util/util';
import { TweenMax } from 'gsap';

export default class Init {
    constructor(){
        this.source = null;
        this.common = res.question.data.common;
        this.stage = app.stage;
        this.pageNumber = 0;
        this.choiceArr = [];
    }
    exec(){
        this.dataInit();
        this.newGame();
        this.testAnimation()
        this.sceneInit();

        // this.startInit();

        // this.startIn();
    }
    testAnimation(){
        let lily = createAnimation("animation_lily_party");
        // lily.state.setAnimation(0,"idle",true);
        window.lily = lily;
        let lili = createAnimation("animation_lily");
        // lili.state.setAnimation(0,"idle",true);
        window.lili = lili;
        lili.position.set(700,650)
        this.stage.addChild(lili)
        // lily.skeleton.setAttachment('maozi','maozi');
        // lily.skeleton.setSkinByName('blue');
        lily.position.set(1250, 650)
        this.stage.addChild(lily)
        this.test = true;
    }
    startInit(){
        let kaishi = createAnimation("animation_kaishi");
        kaishi.state.setAnimation(0,"idle",true);
        this.stage.addChild(kaishi);

        kaishi.interactive = true;
        kaishi.on("pointertap",()=>{
            this.clickAudioPlay();
            kaishi.interactive = false;
            kaishi.state.setAnimation(0,"touch",false).listener = {
                complete:()=>{
                    this.startIn();
                }
            }
        })
        this.fromStart = true;
    }
    mixAnimation(animation){
        let animations = animation.spineData.animations;
            animations.forEach(own=>{
                animations.forEach(other=>{
            animation.state.data.setMix(own.name,other.name,0.3);
                })
            })
    }
    endInit(){
        let jieshu = createAnimation("animation_give_me_five");;
        createAudioByRes("audio_jizhang").play().on("end",()=>{
            jieshu.state.setAnimation(0,"idle",true)
        })
        this.mixAnimation(jieshu)

        jieshu.state.setAnimation(0,"talk",true);
        jieshu.position.set(960,540);
        jieshu.interactive = true;
        jieshu.on("pointertap",()=>{
            createAudioByRes("audio_pa").play();
            jieshu.state.setAnimation(0,"touch",false).listener = {
                complete:()=>{
                    console.log("结束")
                }
            }
        })
        let graphics = new PIXI.Graphics();
            graphics.beginFill(0x000000,0.6);
            graphics.drawRect(0,0, 1920, 1080);
            graphics.endFill();

        this.stage.addChild(graphics,jieshu)
    }
    startIn(){
        if(this.test)return;
        this.optionAnimte();
        if(this.fromStart)createAudioByRes("audio_startIn").play();
        this.choiceArr.length = 0;
    }
    dataInit(){
        console.log(res.question.data)
        this.source = res.question.data.sources[this.pageNumber];
        this.choiceArr = [];
        this.maxCount = this.source.option.length / 2;
        this.currentRight = 0;
    }

    sceneInit(){
        // this.newGame();
        if(this.test)return;
        this.optionInit();
        this.stemInit();
        // let a = new PIXI.Sprite(res["image_texture"].textures["blob.png"]);
        // this.page.addChild(a)
    }
    stemInit(){
        let style = {fontSize:64,fill:0xff1010,stroke:"black",strokeThickness:3,wordWrap:true,wordWrapWidth:500};
        let text = new PIXI.Text(this.source.stem.text,style);
        text.anchor.set(0.5)
        console.log(text)
        text.position.set(960,100)
        this.page.addChild(text)
    }
    newGame(){
        let page =  this.page = new PIXI.Container();
        let bg = createImageByRes(this.source.bg.image);
        page.addChild(bg)
        this.stage.addChild(page);
    }
    optionInit(){
        let optionCon = this.optionCon = new PIXI.Container();
        let optionArr = this.source.option;
        window.optionCon = optionCon;
        optionArr.forEach((option,index) => {
            let bg = createImage("image_option_default");
            bg.status = "idle";
            bg.defaultTexture = bg.texture;
            bg.clickTexture = getTexture("image_option_click")
            let x = 420 + index % 4 * 270;
            let y = 360 + parseInt(index / 4) * 300;
            bg.position.set(x,y)
            alignCenter(bg)
            let image = alignCenter(createImageByRes(option.image));
            bg.name = image.name;
            image.position.set(0,0);
            bg.addChild(image);
            bg.interactive = true;
            bg.on("pointertap",this.optionTap.bind(this))
            optionCon.addChild(bg);
            if(bg.name.indexOf("nine") > -1){
                this.choiceArr.push(bg)
            }
        });
        this.page.addChild(optionCon)
    }
    optionTap(e){
        let option = e.currentTarget;
        if(option.status !== "idle")return;
        this.option = option;
        this.clickAudioPlay()
        option.status = "click";
        option.children[0].scale.set(1.1)
        this.choiceArr.push(option);
        option.texture = option.clickTexture;
        console.log(111111)
        this.judge()
    }
    judge(){
        if(this.choiceArr.length >= 2){
            console.log(this.choiceArr[0].name,this.choiceArr[1].name)
            let isRight = this.choiceArr[0].name.split("_")[0] === this.choiceArr[1].name.split("_")[0]
            if(isRight){
              this.rightDo();
              this.choiceArr.length = 0;
            }else{
              this.wrongDo();
            }
        }
    }
    optionAnimte(){
        this.currentRight++;
        this.choiceArr.forEach(option=>{
            TweenMax.to(option.scale,.15,{
                delay:.6,
                x:0,
                yoyo:true,
                repeat:2,
            })
            TweenMax.to(option.children[0].scale,.2,{
                x:1.4,
                y:1.4,
                yoyo:true,
                repeat:3
            })
        })
    }
    rightDo(){
        createMask();

        this.optionAnimte();
        let instance = createAudioByRes(`audio_${this.option.name.split("_")[0]}`).play();
        instance.on("end",this.optoinAudioEnd.bind(this))
    }
    optoinAudioEnd(){
        hideMask();
        console.log(this.currentRight,this.maxCount)
        if(this.currentRight === this.maxCount){
            console.log("完成")
            createAudioByRes("audio_excellent").play().on("end",()=>{
                this.endInit();
            });
        }
    }
    wrongDo(){
        this.choiceArr.forEach(option=>{
            TweenMax.to(option,.1,{
                x:option.x+10,
                yoyo:true,
                repeat:3
            })
        })
        let option = this.choiceArr.shift();
        option.texture = option.defaultTexture;
        option.children[0].scale.set(1);
        option.status = "idle"
    }
    clickAudioPlay(){
        let clickSound = createAudioByRes(this.common.clickAudio);
        clickSound.stop();
        clickSound.play();
    }
}