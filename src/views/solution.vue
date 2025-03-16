<template>
    <div class="solution" ref="solution">
    </div>
</template>
<script setup>
    import { onMounted, ref } from 'vue';
    import * as THREE from 'three';
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
    import cloudPoints from "@public/cloudPoints.pcd"
    import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader';
    const solution = ref();

    onMounted(() => {

        const DOMEl = solution.value;
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
        camera.position.set( 0, 60, 0 );
        camera.lookAt( 0, 0, 0 );
        const pointsVector3 = [];
        
        // 4. 创建一个球体
        const geometry = new THREE.SphereGeometry(1, 32, 32); // 半径1，纵向和横向分段数为32
        const material = new THREE.MeshBasicMaterial({ color: 0x0077ff }); // 蓝色材质
        // 加载 PCD 文件
        const loader = new PCDLoader();
        console.log(cloudPoints,"cloudPoints")
        loader.load(
            cloudPoints, // 替换为你的 PCD 文件路径
            (points) => {
                // 将点云添加到场景
                scene.add(points);

                // 获取点的几何信息
                const geometry = points.geometry;

                // 获取所有点的三维坐标
                const positions = geometry.attributes.position.array;

                // 遍历所有点
                for (let i = 0; i < positions.length; i += 3) {
                    const x = positions[i];
                    const y = positions[i + 1];
                    const z = positions[i + 2];
                    // console.log(`Point ${i / 3}: x=${x}, y=${y}, z=${z}`);
                    pointsVector3.push(new THREE.Vector3(x,y,z))
                }
                // 旋转点云 90 度，绕 Y 轴旋转
                // points.rotation.x = -(Math.PI / 3);  // 90 度（PI / 2）围绕 Y 轴旋转
                console.log(positions,"positions",pointsVector3);
                // 更新世界矩阵
                points.updateMatrixWorld();
            },
            (xhr) => {
                console.log(`Loading PCD: ${(xhr.loaded / xhr.total) * 100}% loaded`);
            },
            (error) => {
                console.error('An error occurred while loading the PCD file:', error);
            }
        );
        // 创建一个与射线交叉的平面
        const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0); // 创建一个平面（z=0）

        // 创建旋转矩阵（例如旋转 60 度）
        const rotationMatrix = new THREE.Matrix4();
        rotationMatrix.makeRotationX(-(Math.PI / 3));  // 绕 X 轴旋转 -60 度

        // 使用 applyMatrix4 将旋转矩阵应用到平面
        // plane.applyMatrix4(rotationMatrix);
        const helper = new THREE.PlaneHelper( plane, 1, 0xffff00 );
        scene.add( helper );
        // 创建射线投射器
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        const startVector3 = new THREE.Vector3();
        const endVector3 = new THREE.Vector3();
        // 点击按下
        DOMEl.addEventListener('mousedown', (event) => {
                    
            if(!isCtrlPressed){
                return ;
            }
            // 计算鼠标在屏幕上的归一化坐标
            const rect = DOMEl.getBoundingClientRect();
            
            // 将鼠标坐标转换为标准化设备坐标（NDC）
            mouse.x = (event.clientX / width) * 2 - 1;
            mouse.y = -(event.clientY / height) * 2 + 1;
            // 更新射线投射器
            raycaster.setFromCamera(mouse, camera);
            raycaster.ray.intersectPlane(plane, startVector3);

            // const geometry = new THREE.SphereGeometry(1, 32, 32);
            // // 创建材质
            // const material = new THREE.MeshBasicMaterial({ color: 0x0077ff }); // 蓝色材质
            // // 创建球体网格
            // const sphere = new THREE.Mesh(geometry, material);
            // sphere.position.set(startVector3.x, startVector3.y, startVector3.z);
            // // 将球体添加到场景中
            // scene.add(sphere);
            // 计算射线与平面的交点
        });

        let isCtrlPressed = false;

        // 监听键盘按下事件
        document.addEventListener('keydown', (event) => {
            if (event.ctrlKey) {
                isCtrlPressed = true;
                console.log('CTRL key is pressed');
                // 阻止事件冒泡和默认行为
                event.stopPropagation();  // 阻止事件冒泡
                event.preventDefault();    // 阻止默认行为
            }
        });

        // 监听键盘松开事件
        document.addEventListener('keyup', (event) => {
            if (!event.ctrlKey) {
                isCtrlPressed = false;
                console.log('CTRL key is released');
                // 阻止事件冒泡和默认行为
                event.stopPropagation();  // 阻止事件冒泡
                event.preventDefault();    // 阻止默认行为
            }
        });

        // 松开点击
        DOMEl.addEventListener('mouseup', (event) => {
            if(!isCtrlPressed){
                return ;
            }
            // 计算鼠标在屏幕上的归一化坐标
            const rect = DOMEl.getBoundingClientRect();
            
            // 将鼠标坐标转换为标准化设备坐标（NDC）
            mouse.x = (event.clientX / width) * 2 - 1;
            mouse.y = -(event.clientY / height) * 2 + 1;
            // 更新射线投射器
            raycaster.setFromCamera(mouse, camera);
            // 计算射线与平面的交点
            raycaster.ray.intersectPlane(plane, endVector3);
            const geometry = new THREE.SphereGeometry(1, 32, 32);
            // // 创建材质
            // const material = new THREE.MeshBasicMaterial({ color: 0x0077ff }); // 蓝色材质
            // // 创建球体网格
            // const sphere = new THREE.Mesh(geometry, material);
            // sphere.position.set(endVector3.x, endVector3.y, endVector3.z);
            // // 将球体添加到场景中
            // scene.add(sphere);
            // // 计算射线与平面的交点

            console.log(endVector3,"endVector3",startVector3,"startVector3");
            // return ;
            
            // 确保矩形的边界坐标是正确的，最小值和最大值
            let minX = Math.min(startVector3.x, endVector3.x);
            let minY = Math.min(startVector3.y, endVector3.y);
            let minZ = Math.min(startVector3.z, endVector3.z);

            let maxX = Math.max(startVector3.x, endVector3.x);
            let maxY = Math.max(startVector3.y, endVector3.y);
            let maxZ = Math.max(startVector3.z, endVector3.z);
            console.log(minX,"minX",minY,"minY",minZ,"minZ")
            // 筛选出在矩形区域内的点
            let selectedPoints = pointsVector3.filter(p =>
                p.x >= minX && p.x <= maxX &&
                p.y >= minY && p.y <= maxY
            );
            console.log(selectedPoints,"selectedPoints");
            // 计算最小包围盒的边界，选中区域内的点的最小值和最大值
            if (selectedPoints.length > 0) {
                let selectedMinX = Math.min(...selectedPoints.map(p => p.x));
                let selectedMinY = Math.min(...selectedPoints.map(p => p.y));
                let selectedMinZ = Math.min(...selectedPoints.map(p => p.z));

                let selectedMaxX = Math.max(...selectedPoints.map(p => p.x));
                let selectedMaxY = Math.max(...selectedPoints.map(p => p.y));
                let selectedMaxZ = Math.max(...selectedPoints.map(p => p.z));


                // 创建两个点（在3D空间中定义）
                const minOoint = new THREE.Vector3(selectedMinX, selectedMinY, selectedMinZ);  // 第一个点的坐标
                const maxPoint = new THREE.Vector3(selectedMaxX, selectedMaxY, selectedMaxZ);  // 第二个点的坐标

                // 创建一个包围盒，包含这两个点
                const box = new THREE.Box3(minOoint, maxPoint);
                
                // 创建一个平移矩阵
                const translationMatrix = new THREE.Matrix4().makeRotationX(-(Math.PI / 3));
                // 输出初始的 Box3
                console.log("max x y ", box.max.x,box.max.y, "min x y ", box.min.x,box.min.y);


                // 应用矩阵变换
                // box.applyMatrix4(translationMatrix);
                // 创建 Box3Helper 并将其添加到场景中
                const helper = new THREE.Box3Helper(box, 0xffff00);
                scene.add(helper);

                // 输出最小包围盒的坐标
                console.log(`选定区域内的最小包围盒的最小点: (${selectedMinX}, ${selectedMinY}, ${selectedMinZ})`);
                console.log(`选定区域内的最小包围盒的最大点: (${selectedMaxX}, ${selectedMaxY}, ${selectedMaxZ})`);
            } else {
                console.log("没有找到位于矩形区域内的点");
            }

        });
        
        // 创建 OrbitControls 实例
        const controls = new OrbitControls(camera, renderer.domElement);
        // 禁用旋转
        controls.enableRotate = false;
        // 设置控制器的目标点
         controls.target.set(0, 0, 0); // 将目标点设置为立方体的中心
        function animate() {
            requestAnimationFrame(animate);
            if(!isCtrlPressed) { 
                controls.enablePan = true; // 禁止平移
                controls.enableZoom = true; // 禁止缩放
                controls.enableRotate = true; // 禁止旋转
             } else {
                controls.enablePan = false; // 禁止平移
                controls.enableZoom = false; // 禁止缩放
                controls.enableRotate = false; // 禁止旋转
             } // 更新 OrbitControls
            controls.update(); 
            renderer.render(scene, camera);
        }
        animate();
    })

</script>
<style lang="scss" scoped="scoped">
    .solution{
        width: calc(100vw - 17px);
        height: calc(100vh - 17px);
    }
</style>
  