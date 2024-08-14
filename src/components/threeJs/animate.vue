<template>
    <div id="snake" ref="snake">
    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import * as THREE from 'three';
import glbModel from "@public/models/Soldier.glb"
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const snake = ref();


onMounted(() => {
    const DOMEl = snake.value;
    // 获取 DOMEl 的宽度和高度，以设置渲染器的大小。
    const width = DOMEl.clientWidth;
    const height = DOMEl.clientHeight;

    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer();
    
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 500);
    camera.position.set(0, 10, 20); // 设置相机的位置
    camera.lookAt(0, 0, 0); // 将相机对准场景中心

    renderer.setSize( width, height );
    DOMEl.appendChild( renderer.domElement );

    const ambientLight = new THREE.AmbientLight(0xffffff, 1); // 环境光
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1); // 点光源
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    const loader = new GLTFLoader();


    let mixer, runAction;

    renderer.render(scene, camera);

    loader.load( glbModel, function ( gltf ) {

        const model = gltf.scene;


        const animations = gltf.animations; // 获取原始动画剪辑
        scene.add( model );
        console.log(animations,"animations");

        mixer = new THREE.AnimationMixer( model );

        
		const idleAction = mixer.clipAction( animations[ 0 ] );
		const walkAction = mixer.clipAction( animations[ 3 ] );
        runAction = mixer.clipAction( animations[ 1 ] );

        walkAction.play();

        play();

    });

    const clock = new THREE.Clock();

    const play = () => {
        requestAnimationFrame(play);
        const delta = clock.getDelta();
        mixer.update(delta);
        renderer.render(scene, camera);
    }

})
</script>
<style lang="scss" scoped="scoped">

    #snake{
        width: 460px;
        height: 640px;
        border: 1px solid #ccc;
        margin: 30px auto;
    }

</style>
