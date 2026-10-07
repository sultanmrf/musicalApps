<template>
  <div
    class="relative overflow-hidden isolate"
    :class="rootClass"
    :style="{ backgroundColor: colors[2] }"
  >
    <svg
      class="absolute inset-0 size-full"
      :viewBox="`0 0 ${view} ${view}`"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      :aria-label="label || 'کاور'"
    >
      <defs>
        <linearGradient :id="gid" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" :stop-color="colors[0]" />
          <stop offset="55%" :stop-color="colors[1]" />
          <stop offset="100%" :stop-color="colors[2]" />
        </linearGradient>

        <radialGradient :id="gid + '-glow'" cx="50%" cy="35%" r="65%">
          <stop offset="0%" :stop-color="colors[0]" stop-opacity="0.85" />
          <stop offset="100%" :stop-color="colors[0]" stop-opacity="0" />
        </radialGradient>
      </defs>

      <rect :width="view" :height="view" :fill="`url(#${gid})`" />
      <rect :width="view" :height="view" :fill="`url(#${gid}-glow)`" />

      <g v-if="variant === 'rings'">
        <circle
          v-for="i in 5"
          :key="`r${i}`"
          :cx="view / 2"
          :cy="view / 2"
          :r="view * 0.14 * i"
          fill="none"
          stroke="#fff"
          :stroke-opacity="0.12 - i * 0.015"
          :stroke-width="view * 0.012"
        />
      </g>

      <g v-else-if="variant === 'waves'">
        <path
          v-for="i in 4"
          :key="`w${i}`"
          :d="wavePath(i)"
          fill="none"
          stroke="#fff"
          :stroke-opacity="0.16 - i * 0.03"
          :stroke-width="view * 0.02"
          :transform="`translate(0 ${view * (0.18 * i - 0.2)})`"
        />
      </g>

      <g v-else-if="variant === 'bars'">
        <rect
          v-for="i in 7"
          :key="`b${i}`"
          :x="view * (0.1 + i * 0.115)"
          :y="view * (0.62 - heights[i] * 0.28)"
          :width="view * 0.07"
          :height="view * (0.22 + heights[i] * 0.3)"
          rx="999"
          fill="#fff"
          :fill-opacity="0.18 + (i % 3) * 0.08"
        />
      </g>

      <g v-else-if="variant === 'blob'">
        <circle
          :cx="view * 0.34"
          :cy="view * 0.4"
          :r="view * 0.22"
          fill="#fff"
          fill-opacity="0.16"
        />
        <circle
          :cx="view * 0.68"
          :cy="view * 0.63"
          :r="view * 0.18"
          fill="#000"
          fill-opacity="0.14"
        />
        <rect
          :x="view * 0.2"
          :y="view * 0.2"
          :width="view * 0.6"
          :height="view * 0.6"
          :rx="view * 0.16"
          fill="none"
          stroke="#fff"
          stroke-opacity="0.22"
          :stroke-width="view * 0.014"
          :transform="`rotate(${-14 + (seedNumber % 22)} ${view / 2} ${view / 2})`"
        />
      </g>

      <g v-else-if="variant === 'grid'">
        <path
          v-for="i in 7"
          :key="`gx${i}`"
          :d="`M ${view * (i * 0.166)} 0 L ${view * (i * 0.166)} ${view}`"
          stroke="#fff"
          stroke-opacity="0.09"
          :stroke-width="view * 0.012"
        />
        <path
          v-for="i in 7"
          :key="`gy${i}`"
          :d="`M 0 ${view * (i * 0.166)} L ${view} ${view * (i * 0.166)}`"
          stroke="#fff"
          stroke-opacity="0.09"
          :stroke-width="view * 0.012"
        />
        <circle
          :cx="view / 2"
          :cy="view / 2"
          :r="view * 0.2"
          fill="#fff"
          fill-opacity="0.16"
        />
      </g>

      <g v-else>
        <path
          :d="`M 0 ${view * 0.62} C ${view * 0.3} ${view * 0.42}, ${view * 0.62} ${view * 0.86}, ${view} ${view * 0.56} L ${view} ${view} L 0 ${view} Z`"
          fill="#000"
          fill-opacity="0.2"
        />
        <circle
          :cx="view * 0.7"
          :cy="view * 0.3"
          :r="view * 0.16"
          fill="#fff"
          fill-opacity="0.14"
        />
      </g>

      <g :opacity="0.9">
        <path
          :d="`M0 ${view} L ${view} 0 L ${view} ${view} Z`"
          fill="#000"
          fill-opacity="0.18"
        />
      </g>

      <text
        v-if="label"
        x="50%"
        y="50%"
        text-anchor="middle"
        dominant-baseline="central"
        :font-size="view * 0.13"
        font-weight="700"
        fill="#fff"
        fill-opacity="0.92"
        :transform="`rotate(${-10 + (seedNumber % 20)} 100 100)`"
        style="font-family: inherit; letter-spacing: -0.02em"
      >
        {{ labelShort }}
      </text>
    </svg>

    <slot />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    seed?: string;
    label?: string;
    variant?: "rings" | "waves" | "bars" | "blob" | "grid" | "hill";
    rounded?: string;
  }>(),
  {
    seed: "musical",
    label: "",
    variant: "rings",
    rounded: "rounded-2xl",
  },
);

const PALETTES = [
  ["#ef963e", "#e0567a", "#2b1a4a"],
  ["#22d3ee", "#3b82f6", "#0f2a4a"],
  ["#f472b6", "#8b5cf6", "#1e1b4b"],
  ["#34d399", "#0ea5e9", "#082f49"],
  ["#fbbf24", "#f97316", "#3b1108"],
  ["#a78bfa", "#ec4899", "#2b0a2e"],
  ["#38bdf8", "#14b8a6", "#042f2e"],
  ["#fb7185", "#f59e0b", "#3f0d1f"],
];

const VARIANTS = ["rings", "waves", "bars", "blob", "grid", "hill"] as const;

const seedNumber = computed(() => {
  const str = String(props.seed ?? "musical");
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
});

const colors = computed(
  () => PALETTES[seedNumber.value % PALETTES.length],
);

const variant = computed(() => {
  if (VARIANTS.includes(props.variant)) return props.variant;
  return VARIANTS[seedNumber.value % VARIANTS.length];
});

const gid = computed(() => `cg-${seedNumber.value}`);
const view = 200;

const rootClass = computed(() => [props.rounded, "w-full h-full"]);

const heights = computed(() =>
  Array.from({ length: 7 }, (_, i) => ((seedNumber.value >> (i * 2)) % 7) / 6),
);

const labelShort = computed(() => {
  const raw = String(props.label ?? "").trim();
  if (!raw) return "";
  return raw.length > 10 ? raw.slice(0, 10) : raw;
});

const wavePath = (i: number) => {
  const a = view * (0.3 + i * 0.08);
  const b = view * (0.22 + i * 0.06);
  return `M 0 ${a} C ${view * 0.25} ${view * (0.05 + i * 0.1)}, ${view * 0.7} ${b}, ${view} ${a * 0.9}`;
};
</script>
