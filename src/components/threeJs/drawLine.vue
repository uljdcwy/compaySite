<template>
    <div id="snake" ref="snake">
    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import * as THREE from 'three';

const snake = ref();

onMounted(() => {
    const DOMEl = snake.value;
    // 获取 DOMEl 的宽度和高度，以设置渲染器的大小。
    const width = DOMEl.clientWidth;
    const height = DOMEl.clientHeight;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    DOMEl.appendChild( renderer.domElement );

    const camera = new THREE.PerspectiveCamera( 45, width / height, 1, 500 );
    camera.position.set( 0, 0, 100 );
    camera.lookAt( 0, 0, 0 );

    const scene = new THREE.Scene();

    //create a blue LineBasicMaterial
    const material = new THREE.LineDashedMaterial({ 
        color: 0xffffff,
        linewidth: 10,
        scale: 1,
        dashSize: 3,
        gapSize: 1,
    });

    const curve = new THREE.CubicBezierCurve3(
        new THREE.Vector3( -10, 0, 0 ),
        new THREE.Vector3( -5, 15, 0 ),
        new THREE.Vector3( 20, 15, 0 ),
        new THREE.Vector3( 10, 0, 0 )
    );

    const points = curve.getPoints( 50 );
    const geometry = new THREE.BufferGeometry().setFromPoints( points );

    const line = new THREE.Line( geometry, material );

    line.computeLineDistances();


    scene.add( line );
    
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
