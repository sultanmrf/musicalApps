import { tree } from "#build/ui";

export const useSettingStore = defineStore('settingStore', {
    state: () => ({
        isOpenDrawerShowSong: false,
        showLoading: true,
        showloadingApi: false
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
