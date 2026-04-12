<script setup>
import { ref, onMounted } from 'vue'
import { useGLTF } from '@tresjs/cientos'
import { useLoop } from '@tresjs/core'

const model = ref(null)

onMounted(async () => {
  // 1️⃣ GLTF را بعد از mount لود می‌کنیم
  const { scene } = await useGLTF('/models/disc.glb')
  model.value = scene

  // 2️⃣ useLoop را بعد از mount فراخوانی می‌کنیم
  const { onBeforeRender } = useLoop()

  onBeforeRender(() => {
    if (model.value) {
      model.value.rotation.y += 0.01
    }
  })
})
</script>

<template>
  <primitive
    v-if="model"
    :object="model"
    :scale="[0.1, 0.1, 0.1]"
    :position="[0, 0, 0]"
  />
</template>
