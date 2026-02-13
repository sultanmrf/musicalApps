<template>
    <section class="section-gramophone relative w-100 flex justify-center items-center">
          <div class="section-page__gramophoe  rounded-full  border-8 border-gray-400 shadow-3d-dark flex justify-center items-center relative">
            <NuxtImg :src="prop.poster" class="rounded-full ring-2 ring-gray-300 dark:ring-gray-500" quality="80"
                width="350" height="350" ref="cardImg" :class="runGramophone ? 'animate-spain' : ''" />

            <span
                class="section-page__gramophoe__line__circle_xl absolute border-4 border-[rgba(255,255,255,0.3)] w-64 h-64 rounded-full z-[2]"></span>

            <span
                class="section-page__gramophoe__line__circle_lg absolute border-4 border-[rgba(255,255,255,0.3)] w-48 h-48 rounded-full z-[2]"></span>
            <span
                class="section-page__gramophoe__line__circle_md absolute border-4 border-[rgba(255,255,255,0.3)] w-32 h-32 rounded-full z-[2]"></span>
            <span
                class="section-page__gramophoe__line__circle_sm absolute border-4 border-[rgba(255,255,255,0.3)] w-16 h-16 rounded-full z-[2] bg-transparent backdrop-blur-lg"></span>
        </div>
        <div class="section-gramophone__tonearm w-auto h-80  flex flex-col items-center ">
            <div class="section-gramophone__tonearm__circle bg-[#39373A] w-32 h-32 rounded-full border-4 border-gray-300 flex flex-col items-center z-10"
                :class="runGramophone ? 'animate-spainTonearmGramophone' : ''">
                <div class="section-gramophone__tonearm__circle__piece1 w-12 h-12 bg-gray-400 -translate-y-5"></div>
                <div class="section-gramophone__tonearm__circle__piece2 w-12 h-6 bg-gray-600 -translate-y-5"></div>
                <div class="section-gramophone__tonearm__circle__root w-6 h-32 bg-zinc-600 -translate-y-7">
                    <div
                        class="section-gramophone__tonearm__circle_root__circle2 bg-gray-400 w-10 h-10 rounded-full border-4 border-gray-300 -translate-x-2 translate-y-6">
                    </div>
                </div>
                <div
                    class="section-gramophone__tonearm__handle w-6 h-40 bg-gray-900 translate-x-0 translate-y-[5.813rem] absolute rounded-b-lg
                before:content before:absolute before:w-1 before:h-2 before:bg-white before:top-36 before:left-1.5 before:z-10 after:content
                 after:absolute after:w-1 after:h-2 after:bg-white after:top-36 after:left-3.5 after:z-10">
                </div>
            </div>
        </div>
      
    </section>
</template>

<script setup lang="ts">
const prop = defineProps(['poster', 'runGramophone']);

interface Music {
  id: number
  title: string
  artist: string
  image: string
}


let musics = ref<Music[]>([]);

</script>

<style lang="scss">
.section-gramophone {
    .section-gramophone__tonearm {
        .section-gramophone__tonearm__circle__piece2 {
            clip-path: polygon(0 0, 100% 0, 80% 60%, 21% 60%);
        }
    }
}

.animate-spain {
    animation: spain 1.5s 2.5s linear infinite;
}

.animate-spainTonearmGramophone {
    animation: spainTonearmGramophone 1.5s 1s linear;
    animation-fill-mode: both;
}


@keyframes spain {
    from {
        rotate: 0;
    }

    to {
        rotate: 360deg;
    }
}

@keyframes spainTonearmGramophone {
    from {
        rotate: 0;
    }

    to {
        rotate: 45deg;
    }
}
</style>