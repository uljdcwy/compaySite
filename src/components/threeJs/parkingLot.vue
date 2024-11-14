<template>
    <div id="parkingLot" ref="parkingLot">
    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import * as THREE from 'three';
import hdrImg from "@public/hdr/bgImage.hdr"
import imgPng from "@public/rg.png"
import person from "@public/person.jpg"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TeapotGeometry } from 'three/addons/geometries/TeapotGeometry.js';
import { Lensflare, LensflareElement } from 'three/addons/objects/Lensflare.js';
const parkingLot = ref();

onMounted(async () => {
    const DOMEl = parkingLot.value;
    // 获取 DOMEl 的宽度和高度，以设置渲染器的大小。
    const width = DOMEl.clientWidth;
    const height = DOMEl.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize( width, height );
    renderer.localClippingEnabled = true; 
    // 启用阴影
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 阴影类型
    DOMEl.appendChild( renderer.domElement );
    const scene = new THREE.Scene();
    renderer.setClearColor(0x000000);
    const camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );
    camera.position.set( 0, 80, 0 );
    camera.lookAt( 0, 0, 0 );






    





    // 创建 OrbitControls 实例
    const controls = new OrbitControls(camera, renderer.domElement);
    // 设置控制器的目标点
    controls.target.set(0, 0, 0); // 将目标点设置为立方体的中心
    function animate() {
        requestAnimationFrame(animate);
        controls.update(); // 更新 OrbitControls
        renderer.render(scene, camera);
    }
    animate();
});

</script>
<style lang="scss" scoped="scoped">

    #parkingLot {
        width: 940px;
        height: 940px;
        border: 1px solid #ccc;
        margin: 30px auto;
    }

</style>
