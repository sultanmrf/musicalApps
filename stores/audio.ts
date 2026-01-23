import { useIndexStore } from "./index";

export const useAudioStore = defineStore("audioStore", () => {
  let song = ref(),
    idSongCurrentPlay = ref(0),
    storeIndex = useIndexStore(),
    counterSong = ref(0),
    timerInterval = ref(0),
    seekSliderSong = reactive({
      val: 0,
      currentTimeText: "00:00",
      endTimeText: "00:00",
    }),
    isShuffle = ref(false),
    isReply = ref(false),
    volumeStatus = ref(true);

  onMounted(() => {
    song.value = new Audio();
  });

  const checkSongNew = (id: string) => {
    if (idSongCurrentPlay.value !== id) {
      return true;
    }
  };

  const timeSong = computed({
    get() {
      return seekSliderSong.val;
    },
    set(newValue) {
      editTimeSong(newValue);
      clearIntervalForValueBarRangeSong();
      setIntervalForValueBarRangeSong(newValue);
    },
  });

  const editTimeSong = (time: number) => {
    song.value.currentTime = song.value.duration * (time / 100);
  };

  const setIntervalForValueBarRangeSong = (startSecoundOf: number) => {
    timerInterval = setInterval(seekUpdate, 1000);
  };

  const seekUpdate = (startSecoundOf: number) => {
    let seekPosition = ref(startSecoundOf);
    // Check if the current track duration is a legible number
    if (!isNaN(song.value.duration)) {
      seekPosition.value = song.value.currentTime * (100 / song.value.duration);
      seekSliderSong.val = Math.floor(seekPosition.value);

      // Calculate the time left and the total duration
      let currentMinutes = Math.floor(song.value.currentTime / 60);
      let currentSeconds = Math.floor(
        song.value.currentTime - currentMinutes * 60
      );
      let durationMinutes = Math.floor(song.value.duration / 60);
      let durationSeconds = Math.floor(
        song.value.duration - durationMinutes * 60
      );

      // Add a zero to the single digit time values
      if (currentSeconds < 10) {
        currentSeconds = "0" + currentSeconds;
      }
      if (durationSeconds < 10) {
        durationSeconds = "0" + durationSeconds;
      }
      if (currentMinutes < 10) {
        currentMinutes = "0" + currentMinutes;
      }
      if (durationMinutes < 10) {
        durationMinutes = "0" + durationMinutes;
      }

      /* if song time end next song */
      if (
        currentSeconds === durationSeconds &&
        currentMinutes === durationMinutes
      ) {
        nextSong();
      }

      // Display the updated duration
      seekSliderSong.currentTimeText = currentMinutes + ":" + currentSeconds;
      seekSliderSong.endTimeText = durationMinutes + ":" + durationSeconds;
    }
  };

  const clearIntervalForValueBarRangeSong = () => {
    clearInterval(timerInterval);
  };

  const playSong = (id: string, src: string, callBack = () => {}) => {
    if (checkSongNew(id)) {
      song.value.src = src;
      changeStatusMusic(id, "stop");
      changeStatusMusic(idSongCurrentPlay.value, "waiting");
    }

    song.value.play();
    setIntervalForValueBarRangeSong(seekSliderSong.val);
    changeStatusMusic(id, "play");
    idSongCurrentPlay.value = id;
    callBack();
  };

  const pauseSong = (id: string, callBack = () => {}) => {
    song.value.pause();
    changeStatusMusic(id, "stop");
    clearIntervalForValueBarRangeSong();
    callBack();
  };

  const nextSong = () => {
    counterSong.value++;
    seekSliderSong.val = 0;
    clearIntervalForValueBarRangeSong();

    if (counterSong.value > storeIndex.mySongs.list.length - 1) {
      counterSong.value = 0;
    }

    let findSongNext = storeIndex.mySongs.list[counterSong.value];

    playSong(findSongNext._id, findSongNext.path);
    storeIndex.songSelected = findSongNext;
  };

  const prevSong = () => {
    counterSong.value--;
    seekSliderSong.val = 0;
    clearIntervalForValueBarRangeSong();

    if (counterSong.value < storeIndex.mySongs.list.length - 1) {
      counterSong.value = 0;
    }

    let findSongNext = storeIndex.mySongs.list[counterSong.value];
    playSong(findSongNext._id, findSongNext._path);
    storeIndex.songSelected = findSongNext;
  };

  const changeStatusMusic = (id: string, status: string) => {
    storeIndex.mySongs.list.filter((music) => {
      if (music._id === id) {
        music.status = status;
      }
    });
  };

  const convertMillisToMinutesAndSeconds = (millis: number) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  const activeAndUnactiveShuffleSongs = (status = true) => {
    if (status) {
      isShuffle.value = true;
      storeIndex.mySongs.list.sort(() => Math.random() - 0.5);
    } else {
      isShuffle.value = false;
      storeIndex.mySongs.list.sort((a, b) => a.id - b.id);
    }
  };

  const volumeSongs = (status: boolean = true) => {
    volumeStatus.value = status;
    song.value.volume = status;
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
    editTimeSong,
    activeAndUnactiveShuffleSongs,
    timeSong,
    convertMillisToMinutesAndSeconds,
    seekSliderSong,
    volumeSongs,
    volumeStatus,
  };
});
