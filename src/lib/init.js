import * as PIXI from  'pixi.js'
import {createImageByRes, createImage, alignCenter, getTexture} from './util/util';
import DragElement from './dragElement'
export default class Init {
    constructor(app,res){
        this.source = null;
        this.app = app;
        this.res = res;
        this.stage = app.stage;
        this.pageNumber = 0;
    }
    exec(){
        console.log(this.res)
        this.dataInit();
        this.sceneInit();
    }
    
    dataInit(){
        console.log(res.question.data)
        this.source = res.question.data.sources[this.pageNumber];
        
    }
    sceneInit(){
        this.newGame()
        this.optionInit();
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
            bg.defaultTexture = bg.texture;
            bg.clickTexture = getTexture("image_option_click")
            let x = 420 + index % 4 * 270;
            let y = 360 + parseInt(index / 4) * 300;
            bg.position.set(x,y)
            alignCenter(bg)
            let image = alignCenter(createImageByRes(option.image));
            image.position.set(0,0);
            bg.addChild(image);
            optionCon.addChild(bg);
        });
        this.page.addChild(optionCon)
    }
    optionTap(e){
        
    }
    optionRight(){

    }
}