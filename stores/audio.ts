import { useSongsStore } from "./songs";
import type { Song } from "~~/shared/types/song";

export const useAudioStore = defineStore("audioStore", () => {
  const songsStore = useSongsStore();
  const song = ref<HTMLAudioElement | null>(null);
  const idSongCurrentPlay = ref<string | null>(null);
  const listPlay = reactive({
    songs: [] as Song[],
  });
  const counterSong = ref(0);
  const timerInterval = ref<any>(null);
  const seekSliderSong = reactive({
    val: 0,
    currentTimeText: "00:00",
    endTimeText: "00:00",
  });
  const isShuffle = ref(false);
  const isReply = ref(false);
  const volumeStatus = ref(true);

  onMounted(() => {
    song.value = new Audio();
  });

  const timeSong = computed({
    get() {
      return seekSliderSong.val;
    },
    set(newValue) {
      if (!song.value) return;
      song.value.currentTime = song.value.duration * (newValue / 100);
      clearInterval(timerInterval.value);
      timerInterval.value = setInterval(seekUpdate, 1000);
    },
  });

  const seekUpdate = () => {
    if (!song.value || isNaN(song.value.duration)) return;

    const percent = song.value.currentTime * (100 / song.value.duration);
    seekSliderSong.val = Math.floor(percent);

    const format = (time: number) => {
      const m = Math.floor(time / 60)
        .toString()
        .padStart(2, "0");
      const s = Math.floor(time % 60)
        .toString()
        .padStart(2, "0");
      return `${m}:${s}`;
    };

    seekSliderSong.currentTimeText = format(song.value.currentTime);
    seekSliderSong.endTimeText = format(song.value.duration);

    if (song.value.currentTime >= song.value.duration) {
      if (isReply.value) {
        song.value.currentTime = 0;
        song.value.play();
      } else {
        nextSong();
      }
    }
  };

  const setListPlay = (listSongs: [Song]) => {
    listPlay.songs = listSongs;
  };

  const playSong = (musicId: string, src: string) => {
    if (!song.value) return;

    if (idSongCurrentPlay.value !== musicId) {
      if (idSongCurrentPlay.value) {
        songsStore.changeStatus(idSongCurrentPlay.value, "waiting");
      }
      song.value.src = src;
    }

    song.value.play();
    songsStore.changeStatus(musicId, "play");
    idSongCurrentPlay.value = musicId;

    songsStore.songSelected =
      songsStore.list.find((s) => s._id === musicId) ||
      listPlay.songs?.find((s) => s._id === musicId) ||
      null;
    timerInterval.value = setInterval(seekUpdate, 1000);
  };

  const pauseSong = (musicId: string) => {
    if (!song.value) return;
    song.value.pause();
    songsStore.changeStatus(musicId, "stop");
    clearInterval(timerInterval.value);
  };

  const nextSong = () => {
    counterSong.value++;
    if (counterSong.value > listPlay.songs.length - 1) {
      counterSong.value = 0;
    }
    const next = listPlay.songs[counterSong.value];
    playSong(next._id, next.path);
  };

  const prevSong = () => {
    counterSong.value--;
    if (counterSong.value < 0) {
      counterSong.value = listPlay.songs.length - 1;
    }
    const prev = listPlay.songs[counterSong.value];
    playSong(prev._id, prev.path);
  };

  const closeMusic = () => {
    songsStore.songSelected = null;
  };

  const repeatMusic = () => {
    isReply.value = !isReply.value;
    if (song.value) song.value.loop = isReply.value;
  };

  const activeAndUnactiveShuffleSongs = (status = true) => {
    isShuffle.value = status;
    if (status) {
      listPlay.songs.sort(() => Math.random() - 0.5);
    }
  };

  const volumeSongs = (status: boolean = true) => {
    volumeStatus.value = status;
    if (song.value) song.value.volume = status ? 1 : 0;
  };

  return {
    song,
    idSongCurrentPlay,
    playSong,
    pauseSong,
    nextSong,
    prevSong,
    isShuffle,
    isReply,
    activeAndUnactiveShuffleSongs,
    timeSong,
    seekSliderSong,
    volumeSongs,
    volumeStatus,
    repeatMusic,
    closeMusic,
    setListPlay,
  };
});
