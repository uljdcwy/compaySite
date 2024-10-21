<template>
    <div id="snake" ref="snake">
    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import * as THREE from 'three';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import fontJson from "@public/font/wrrh.json";

const snake = ref();


onMounted(() => {
    const DOMEl = snake.value;
    // 获取 DOMEl 的宽度和高度，以设置渲染器的大小。
    const width = DOMEl.clientWidth;
    const height = DOMEl.clientHeight;

    const loader = new FontLoader();

    const fonts = loader.parse(fontJson);
    console.log(fonts,"loader");

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    DOMEl.appendChild( renderer.domElement );
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 45, width / height, 1, 2000 );
    camera.position.set( 0, 0, 100 );
    camera.lookAt( 0, 0, 0 );

    
    // 创建光源
    const light = new THREE.DirectionalLight(0x0000ff, 10);
    light.position.set(10, 10, 10);
    light.castShadow = true;
    scene.add(light);



	const geometry = new TextGeometry( "test font", {
		font: fonts,
		size: 80,
		depth: 5,
		curveSegments: 12,
		bevelEnabled: 0,
		bevelThickness: 10,
		bevelSize: 8,
		bevelSegments: 5
	} );

    

    const textMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    // 创建网格
    const textMesh = new THREE.Mesh(geometry, textMaterial);

    textMesh.position.z = -1000;
    textMesh.position.x = -100;


    
    const startPlay = function () {

        textMesh.rotation.x += 0.01;
        textMesh.rotation.y += 0.01;
        renderer.render( scene, camera );

        requestAnimationFrame( startPlay );
    }

    startPlay();

    scene.add(textMesh);
    renderer.render( scene, camera );
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
