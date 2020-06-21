import * as PIXI from 'pixi.js'

/**
 *  创建图片
 * @param {*} texture 
 */
function createSprite(texture) {
    return new PIXI.Sprite(texture);
}

/**
 * 获取图片的texture
 * @param {*} resourceStr 
 */
function getTexture(resourceStr) {
    return res[resourceStr].texture;
}

/**
 *创建音频实例
*
* @param {*} audio content.json音频对象
* @returns PIXI音频实例
*/
function createAudioByRes(audio){
    let sound = typeof audio === "string" ? res[audio].sound : res[audio.name].sound;
    return sound;
}

/**
 *创建图片
*
* @param {*} url  图片res名称
* @param {*} data  图片参数
* @returns 图片实例
*/
function createImage(url,data) {
    let img = createSprite(getTexture(url));
    
    if (data) {
        for(let k in data) {
             data[k] ? img[k] = data[k] : "";
        }
    }
    img.lockWidth = img.width;
    img.lockHeight = img.height;
    return img;
}
  
/**
*创建图片byres
*
* @param {*} image  content.json的image对象
* @param {*} parent  ?父元素 
* @returns 图片实例
*/
function createImageByRes(image,parent){
    let {width,height,x,y,componentName} = image;
    width = parseFloat(width);
    height = parseFloat(height);
    x = parseFloat(x);
    y = parseFloat(y);
    let child = createImage(image.name,{x,y,width,height,name:componentName});
    if(parent){
      parent.addChild(child)
    }
    return child;
}
  
/**
 *创建动画
*
* @param {String} key
* @param {Array} setObj
* @param {Object} data
* @returns  PIXI spine 实例
*/
function createAnimation(key,setObj,data) {
    let animation = new PIXI.spine.Spine(res[key].spineData);
    if (data) {
        for(let k in data) {
            animation[k] = data[k];
        }
    }
    if (setObj) {
        animation.state.setAnimation(setObj[0],setObj[1],setObj[2])
    }
  
    return animation;
}
/**
 *
 * @param {object} animation  content.json 动画对象
 * @param {array} setObj  播放动画数组
 * @returns PIXI spine 实例
 */
function createAnimationByRes(animation,setObj){
    let x = parseFloat(animation.x);
    let y = parseFloat(animation.y);
    let scale = parseFloat(animation.scale)
    let key = animation.name;
    let child = createAnimation(key,setObj,{x,y})
    if(animation.componentName){
      child.name = animation.componentName
    }
    if(scale){
      child.scale.set(scale)
    }
    return child;
}
  /**
 *居中元素
 *
 * @param {*} obj PIXI元素
 * @returns
 */
function alignCenter(obj){
    obj.x = obj.x + obj.width / 2 ;
    obj.y = obj.y + obj.height / 2 ;
    obj.anchor.set(0.5)
    obj.lockX = obj.x;
    obj.lockY = obj.y;
    return obj;
}

function createMask() {
    if(!stage.getChildByName("mask")){
      let mask = new PIXI.Graphics();
      mask.name = "mask";
      mask.beginFill(0x000000, 0)
      mask.drawRect(0, 0, 1920, 1080);
      mask.endFill();
      stage.addChild(mask)
      mask.interactive = true;
    }
    stage.getChildByName("mask").interactive = true;
    stage.setChildIndex(stage.getChildByName("mask"), stage.children.length - 1);
    return stage.getChildByName("mask");
  }
  
  function hideMask(){
    let mask = stage.getChildByName("mask");
    if(mask){
      // stage.setChildIndex(mask,1)
      mask.interactive = false;
    }
  }
  /**
 *创建文字
  *
  * @param {*} string  content.json的image对象
  * @param {*} data  
  * @returns 文字实例
  */
function createText(string,data) { 
  let text;
  if (data&&data.style) {
      text = new PIXI.Text(string, new PIXI.TextStyle(data.style));
  } else {
      text = new PIXI.Text(string);
  }
  return text;
}

export {
    getTexture,
    createImage,
    createImageByRes,
    createAnimation,
    createAnimationByRes,
    createAudioByRes,
    alignCenter,
    createMask,
    hideMask,
    createText
}