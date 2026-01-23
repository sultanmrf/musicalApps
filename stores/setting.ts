export const useSettingStore = defineStore('settingStore', {
    state: () => ({
        isOpenDrawerShowSong: false
    }),
    getters: {
        getIsOpenDrawerShowSong(state) {
            return state.isOpenDrawerShowSong;
        },
    },
    actions: {
       setDataOpen(val){
        this.isOpenDrawerShowSong = val;
         setTimeout(() => {
            document.getElementById("__nuxt").removeAttribute("inert");
         }, 1000);
       }

    }
})
