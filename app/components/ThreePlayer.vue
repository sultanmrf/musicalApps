<script setup>
import { onMounted, ref } from "vue"

import * as THREE from "../assets/lib/three/build/three.module.js"
import { GLTFLoader } from "../assets/lib/three/examples/jsm/loaders/GLTFLoader.js"

const container = ref(null)

onMounted(() => {

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
75,
container.value.clientWidth / container.value.clientHeight,
0.1,
1000
)

const renderer = new THREE.WebGLRenderer({ alpha: true })
renderer.setSize(
container.value.clientWidth,
container.value.clientHeight
)

container.value.appendChild(renderer.domElement)

const light = new THREE.DirectionalLight(0xffffff,1)
light.position.set(5,5,5)
scene.add(light)

const loader = new GLTFLoader()

loader.load("/models/disc.glb",(gltf)=>{
scene.add(gltf.scene)
gltf.scene.scale.set(2,2,2)
})

camera.position.z = 5

function animate(){
requestAnimationFrame(animate)
renderer.render(scene,camera)
}

animate()

})
</script>

<template>
<div ref="container" class="w-full h-80"></div>
</template>
