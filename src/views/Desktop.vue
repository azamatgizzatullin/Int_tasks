<template>
  <div class="desktop">
    <Window
      v-for="window in activewindows"
      :key="window.itemId"
      :title="window.title"
      :top="window.top"
      :left="window.left"
      :width="window.width"
      :height="window.height"
      :z="window.z"
      :activeserviceID="window.id"
      @changeposition="ChangeP($event)"
      @deletewindow="deletewindow($event)"
    ></Window>
    <Dock @windownum="Open($event)" :activewindows="activewindows" />
  </div>
</template>

<script>
import { ref } from "vue";

import Dock from "@/components/Desktop/Dock.vue";
import Window from "@/components/Desktop/Window_resizable.vue";
import windows from "@/components/Desktop/inputs/windows-list.ts";
import { onMounted } from "vue";

export default {
  name: "Desktop",
  components: {
    Dock,
    Window,
  },

  watch: {
    activewindows: {
      handler(val) {
        localStorage.setItem("activewindows", JSON.stringify(val));
        console.log("saving");
      },
      deep: true,
    },
  },

  setup() {
    onMounted(() => {
      if (localStorage.getItem("activewindows")) {
        console.log("loaded data:");
        console.log(JSON.parse(localStorage.getItem("activewindows")));
        activewindows.value = JSON.parse(localStorage.getItem("activewindows"));
        try {
          this.activewindows.value = JSON.parse(
            localStorage.getItem("activewindows")
          );
        } catch (e) {
          localStorage.removeItem("activewindows");
        }
      }
    });

    const activewindows = ref([]);
    function ChangeP([left, top, width, height, z, activeserviceID]) {
      //writing data to ref array
      console.log(activewindows.value.find((x) => x.id == activeserviceID));
      activewindows.value.find((x) => x.id == activeserviceID).left = left;
      activewindows.value.find((x) => x.id == activeserviceID).top = top;
      activewindows.value.find((x) => x.id == activeserviceID).width = width;
      activewindows.value.find((x) => x.id == activeserviceID).height = height;
      //checking max z-index
      console.log("z-index:" + z);
      let maxz = Math.max(...activewindows.value.map((x) => x.z), 1);
      if (z < maxz) {
        activewindows.value.find((x) => x.id == activeserviceID).z =
          Number(maxz) + 1;
      } else {
        activewindows.value.find((x) => x.id == activeserviceID).z =
          Number(maxz);
      }
    }
    //Constructor for any active Window
    function Window(id, name, top, left, width, height, z, sourceid) {
      this.id = id;
      this.title = name;
      this.top = top;
      this.left = left;
      this.width = width;
      this.height = height;
      this.z = z;
      this.sourceid = sourceid;
    }
    function Open(Id) {
      //adding new service into reactive array
      let num = windows.findIndex((x) => x.id === Id);

      //checking if already exists, otherwise pushing

      if (!activewindows.value.find((x) => x.sourceid == Id)) {
        console.log(activewindows.value);

        activewindows.value.push(
          //looking for max id to proper delete afterwards

          new Window(
            //looking fir max ID, otherwise 1
            Math.max(...activewindows.value.map((x) => x.id).map(Number), 0) +
              1,
            windows[num].title,
            "calc(50vh - 150px)",
            "calc(50vw - 500px)",
            "200px",
            "200px",
            activewindows.value.length + 1,
            windows[num].id
          )
        );
      }
    }
    function deletewindow(Id) {
      let arrindex = activewindows.value.findIndex((x) => x.id === Id);
      activewindows.value.splice(arrindex, 1);
    }

    return { ChangeP, Open, activewindows, deletewindow };
  },
};
</script>

<style scoped>
.desktop {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: url("http://cdn.osxdaily.com/wp-content/uploads/2018/06/macos-mojave-default-wallpaper-light.jpg")
    50% no-repeat fixed;
  background-size: cover;
  height: 100vh;
  position: relative;
  height: 100vh;
  overflow: hidden;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
