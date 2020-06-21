import * as PIXI from  'pixi.js'
import {createImageByRes, createImage, alignCenter, getTexture, createAudioByRes, createMask, hideMask} from './util/util';
import { TweenMax } from 'gsap';
export default class Init {
    constructor(app,res){
        this.source = null;
        this.app = app;
        this.res = res;
        this.common = res.question.data.common;
        this.stage = app.stage;
        this.pageNumber = 0;
        this.choiceArr = [];
    }
    exec(){
        console.log(this.res)
        this.dataInit();
        this.sceneInit();
        this.startIn();
    }
    startIn(){
        this.optionAnimte();
        // createAudioByRes("audio_startIn").play()
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
        this.newGame()
        this.optionInit();
        this.stemInit();
    }
    stemInit(){
        let text = new PIXI.Text(this.source.stem.text,);
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
            createAudioByRes("audio_excellent").play();
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