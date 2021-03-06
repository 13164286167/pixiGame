export default class AnimationFrame {
    constructor(fps = 60, animate) {
      this.requestID = 0;
      this.fps = fps;
      this.animate = animate;
    }

    start() {
      let then = performance.now();
      console.log(this.fps)
      const tolerance = 0.1;
      let animateLoop = (now) => {
        let interval = 1000 / this.fps;
        this.requestID = requestAnimationFrame(animateLoop);
        let delta = now - then;

        if (delta >= interval - tolerance) {
          then = now - (delta % interval);
          this.animate(delta);
        }
      };
      this.requestID = requestAnimationFrame(animateLoop);
    }

    stop() {
      cancelAnimationFrame(this.requestID);
    }
  }