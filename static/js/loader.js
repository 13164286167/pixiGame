import * as PIXI from   'pixi.js';
require('pixi-spine')
require('pixi-sound')
window.PIXI = PIXI;
// const spine = require('pixi-spine');
const loader = PIXI.loader ;
export function load() {
    if (!window.res) {
        return new Promise((resolve, reject) => {
            let progressNode = document.getElementsByClassName('runner')[0];
            loader.add('question', `static/json/content.json`).add('resources', `static/json/resource.json`);
            loader.load((loader,resource) => {
                resource.resources.data.forEach(item => {
                    // console.log(item.key,item.path)
                    loader.add(item.key,item.path)
                });
                loader.load((l, r) => {
                    window.res = r;
                    resolve(r)
                });
                loader.onError.add((e) => {
                    console.log(e, "资源加载错误");
                });
                loader.onProgress.add((e) => {
                    // console.log(e.progress,"资源加载中")
                    // console.log(e)
                    progressNode.style.width = e.progress * 6.8 / 100 + 'rem'
                });
                loader.onComplete.add((e) => {
                    document.getElementsByClassName('page-loading')[0].style.display = 'none';
                    console.log("loader加载完成");
                });
            });
        })
    }
    else {
        return new Promise((resolve, reject) => {
            console.info(2);
            resolve(window.res)
        })
    }
}