/**
 *通用拖拽类
 *
 * @export
 * @class DragElement
 */
export default class DragElement {
  /**
   *Creates an instance of DragElement.
   * @param {*} element pixi元素
   * @param {*} callback 拖拽完回调
   * @memberof DragElement
   */
  constructor(element,callback){
      this.element = element;  //绑定元素
      this.canMove = false;  //可否移动
      this.Drag(callback)
  }

  Drag(callback){
      let _that = this;
      _that.element.interactive = true;
      // _that.element.parent.interactive = true;
      // _that.element.parent.on('pointerdown',dragElementStart)
       _that.element.on('pointerdown',dragElementStart)
      _that.element.cursor = 'pointer';
      _that.element.on('pointerup',dragElementEnd)
      

      function dragElementStart(e){
          let startPos = e.data.getLocalPosition(stage);
          console.log(_that.element.canMove)
          if(_that.element.canMove === false){
            _that.canMove = false;
            return;
          }
          console.log("可以移动")
          _that.element.x = startPos.x;
          _that.element.y = startPos.y;
          _that.element.offsetPosX = _that.element.x - startPos.x;
          _that.element.offsetPosY = _that.element.y - startPos.y;
          _that.canMove = true;
          _that.element.on('pointermove',dragElementMove)
      }
      
      function dragElementMove(e){
          let movePos = e.data.getLocalPosition(stage);
          if(_that.canMove&&_that.element){
              if(movePos.x>10&&movePos.x<1910&&movePos.y>10&&movePos.y<1070){
                  _that.element.x = movePos.x + _that.element.offsetPosX;
                  _that.element.y = movePos.y + _that.element.offsetPosY;
                  console.log(_that.element.x,_that.element.y)
              }else{
                dragElementEnd()
              }
          }
      }
      
      function dragElementEnd(e){
          _that.element.off('pointermove',dragElementMove)
          _that.canMove = false;
          _that.element.offsetPosX = null;
          _that.element.offsetPosY = null;
          if(typeof callback === "function"){
            callback(_that.element.x,_that.element.y);
          }
      }
  }
}
