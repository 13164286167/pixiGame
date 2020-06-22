<template>
  <div>
    <div class="canvas" ref="canvas"></div>
  </div>
</template>

<script>

import {load} from '../../static/js/loader.js';
import Init from '../lib/init';
import AnimationFrame from './animationFrame'
export default {
  name: 'index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    createApp() {
      return new PIXI.Application({
          width: 1920,
          height :1080,
          autoSize: true,
          transparent: true //背景是否设为透明
      })
    }
  },
  mounted(){
    let app = this.createApp();
    // app.ticker.stop();
    // window.ctr = new AnimationFrame(60,()=>{
    //   app.renderer.render(app.stage)
    // })
    // ctr.start()
    app.view.style.width = '19.2rem';
    app.view.style.height = '10.8rem';
    app.view.id = 'appCanvas';
    window.app = app;
    window.stage = app.stage;
    this.$refs.canvas.appendChild(app.view);
    stage.interactive = true;
    load().then(res=>{
      this.$nextTick(()=>{
        let init = new Init(app,res);
        init.exec();
      })
    })
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .canvas {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 19.20rem;
    height: 10.80rem;
    transform: translate(-50%, -50%);
  }
  @font-face{
     /* font-family: '字体名称随便起'; 
     src:url('../font/字体名称.woff') format('woff'),
         url('../font/字体名称.ttf') format('truetype'),
         url('../font/字体名称.svg') format('svg'); */
}
</style>
