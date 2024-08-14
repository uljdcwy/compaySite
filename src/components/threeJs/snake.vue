<template>
    <button @click="startPlay" style="display: block;margin: 20px auto;">开始</button>
    <div style="text-align: center;">{{ fraction }}</div>
    <div id="snake" ref="snake">
    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import * as THREE from 'three';

const snake = ref();

let moveYVal = -1;
let moveXVal = 0;

const keyupdir = (e) => {
    console.log(e)
    if (e.key == "ArrowUp"){
        moveYVal = 1;
        moveXVal = 0;
    } else if (e.key == "ArrowRight") {
        moveYVal = 0;
        moveXVal = 1;
    } else if (e.key == "ArrowDown") {
        moveYVal = -1;
        moveXVal = 0;
    } else if (e.key == "ArrowLeft") {
        moveYVal = 0;
        moveXVal = -1;
    }
    e.preventDefault();
    return false;
}

let startPlay;
// 创建一个新的 Three.js 场景，用于存放所有的 3D 对象。
let scene, camera, renderer;

const boxList = [];

const fraction =  ref(0);

onMounted(() => {
    scene = new THREE.Scene();
    const DOMEl = snake.value;
    // 获取 DOMEl 的宽度和高度，以设置渲染器的大小。
    const width = DOMEl.clientWidth;
    const heght = DOMEl.clientHeight;
    // 创建一个透视相机。透视相机会根据指定的视场角（75 度）、长宽比（视口宽度/高度）、近剪裁平面和远剪裁平面来投影场景。
    camera = new THREE.PerspectiveCamera( 75, width / heght, 0.1, 1000 );
    // 创建一个 WebGL 渲染器，用于在网页上渲染场景。通过 setSize 方法设置渲染器的尺寸，并将渲染器的 DOM 元素附加到 DOMEl 中。
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, heght );
    renderer.shadowMap.enabled = true;
    DOMEl.appendChild( renderer.domElement );
    // 定义一个立方体的几何体，边长为 1。
    const geometry = new THREE.BoxGeometry( 1, 1, 0.2 );
    // 定义一个基本的材质，颜色为绿色 (0x00ff00)。
    const material = new THREE.MeshBasicMaterial( { color: 0xffffff  } );
    // 将几何体和材质组合成一个网格（立方体），并将其添加到场景中。
    const cube = new THREE.Mesh( geometry, material );
    cube.castShadow = true;
    scene.add( cube );
    // 将相机的位置设置在 z 轴上 50 单位的位置，以便可以看到场景中的立方体
    camera.position.z = 50;


    console.log(cube.position.y,"cube.position.y");
    const top = 36;
    const left = -26;
    const right = 26;
    const bottom = -37;


    cube.position.y = top;
    cube.position.x = left;
    let recordTime = null;
    
    let minMoveTime = 800;

    startPlay = function () {

        if(boxList.length == 0) {
            console.log(boxList,"boxList")
            boxList.push(randomBox());
        }

        if(!recordTime || (Date.now() - minMoveTime) > recordTime) {

            recordTime = Date.now();
            cube.position.y += moveYVal
            cube.position.x += moveXVal
            const xVal = cube.position.x;
            const yVal = cube.position.y;
            boxList.forEach((elem, idx) => {
                console.log(elem,"elem")
                if(elem.position.yVal == yVal && elem.position.xVal == xVal){
                    scene.remove(elem.cube)
                    // 回收几何体
                    elem.cube.geometry.dispose();
                    // 回收材质
                    elem.cube.material.dispose()
                    boxList.splice(idx, 1);
                    boxList.push(randomBox());
                    minMoveTime = minMoveTime - 0.1;
                    fraction.value += 1;
                }
            })
            if((moveYVal > 0 && yVal > top && moveYVal != 0) || (moveYVal < 0 && yVal < bottom && moveYVal != 0) || (moveXVal > 0 && xVal > right && moveXVal != 0) || (moveXVal < 0 && xVal < left && moveXVal != 0)){
                hitWall();
                cube.position.y = top;
                cube.position.x = left;
                moveYVal = -1;
                moveXVal = 0;
                return ;
            }

            renderer.render( scene, camera );
            
        }

        requestAnimationFrame( startPlay );
    }

    startPlay();

    window.addEventListener("keyup", keyupdir) 

});


const randomBox = () => {
    const geometry = new THREE.BoxGeometry( 1, 1, 0.2 );
    // 定义一个基本的材质，颜色为绿色 (0x00ff00)。
    const material = new THREE.MeshBasicMaterial( { color: getRandomColor()  } );
    // 将几何体和材质组合成一个网格（立方体），并将其添加到场景中。
    const cube = new THREE.Mesh( geometry, material );
    const position = getRandomPosition();
    console.log(position,"position")
    cube.position.y = position.yVal;
    cube.position.x = position.xVal;
    cube.castShadow = true;
    scene.add( cube );
    return {cube,position};
}

onUnmounted(() => {
    scene = null;
    camera = null;
    renderer = null;
    window.removeEventListener("keyup", keyupdir);
})

const hitWall = () => {
    fraction.value = 0;
    console.log("撞墙了")
}

const getRandomPosition = () => {
    const xVal = parseInt(Math.random() * 52) -26;
    const yVal = parseInt(Math.random() * 73) -37;
    return {xVal,yVal}
}

const getRandomColor = function () {
  const letters = '56789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  console.log(color,"color")
  return color;
}

</script>
<style lang="scss" scoped="scoped">

    #snake{
        width: 460px;
        height: 640px;
        border: 1px solid #ccc;
        margin: 10px auto 30px;
    }

</style>
