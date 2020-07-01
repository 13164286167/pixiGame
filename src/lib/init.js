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
        this.sceneInit();

        // this.startInit();

        // this.startIn();
    }
    dataInit(){
        this.source = res.question.data.sources[this.pageNumber];
    }
    newGame(){
        let page =  this.page = new PIXI.Container();
        let bg = createImageByRes(this.source.bg.image);
        page.addChild(bg)
        this.stage.addChild(page);
    }
    sceneInit(){
        this.page.interactive = true;
        this.page.on('pointerdown',this.onDown.bind(this))
        this.page.on('pointermove',this.onMove.bind(this))
        this.page.on('pointerup',this.onUp.bind(this))
        this.page.on('pointerupoutside',this.onUp.bind(this))

        let graCon = this.graCon = new PIXI.Container();;
        this.page.addChild(graCon)
    }
    onDown(e){
        let {x,y} = e.data.global;
        if(this.isDown)return;
        this.isDown = true;
        this.gra = new PIXI.Graphics();
        this.gra.lineStyle(10,0x000000,1);
        this.page.addChild(this.gra)
        this.pointArr = [];
        this.x = x;
        this.y = y;
    }
    onMove(e){
        if(!this.isDown)return;
        let {x,y} = e.data.global;
        this.gra.moveTo(this.x,this.y)
        this.gra.lineTo(x,y);
        this.x = x;
        this.y = y;
    }
    onUp(e){
        if(!this.isDown)return;
        this.gra.endFill();
    }
    onDown2(e){
        let {x,y} = e.data.global;
        if(this.isDown)return;
        this.isDown = true;
        this.gra = new PIXI.Graphics();
        this.pointArr = [];
        this.x = x;
        this.y = y;
        this.samplingRate = 1;
        this.samplingCount = 0;
    }
    onMove2(e){
        if(!this.isDown)return;
        let {x,y} = e.data.global;
        if(this.samplingCount % this.samplingRate === 0){
            this.pointArr.push({x,y})
        }
        this.samplingCount ++;
        // this.gra.lineTo(x,y)

    }

    onUp2(e){
        if(!this.isDown)return;
        this.isDown = false;
        this.gra = new PIXI.Graphics();
        this.gra.lineStyle(10,0x000000,1);
        this.gra.moveTo(this.x,this.y)
        this.page.addChild(this.gra)
        this.pointArr.forEach(point=>{
            this.gra.lineTo(point.x,point.y)
        })
        console.log(this.pointArr)
        console.log(this.pointArr.length)
        this.gra.endFill();
        this.pointArr = [];
        let ba = app.renderer.plugins.extract.base64(this.page);
        console.log(ba)
        let image = app.renderer.plugins.extract.image(this.gra);
        console.log(image)
        document.body.appendChild(image);
    }
    clickAudioPlay(){
        let clickSound = createAudioByRes(this.common.clickAudio);
        clickSound.stop();
        clickSound.play();
    }
}