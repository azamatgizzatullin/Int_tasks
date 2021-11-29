<template>
  <footer>
    <ul>
      <li
        data-title="Finder"
        @click="jump($event, '1')"
        :style="{
          'border-bottom': getactivestate('1'),
        }"
      >
        <img
          data-title="Finder"
          src="https://harnerdesigns.com/wp-content/uploads/2018/05/finder.png"
        />
      </li>
      <li
        data-title="Chrome"
        @click="jump($event, '2')"
        :style="{
          'border-bottom': getactivestate('2'),
        }"
      >
        <img
          src="https://harnerdesigns.com/wp-content/uploads/2018/05/Google_Chrome_icon_2011.png"
        />
      </li>
      <li
        data-title="iTunes"
        class="closed"
        id="iTunes"
        @click="jump($event, '3')"
        :style="{
          'border-bottom': getactivestate('3'),
        }"
      >
        <img
          src="https://harnerdesigns.com/wp-content/uploads/2018/05/iTunes-logo.svg"
        />
      </li>
      <li
        data-title="Photoshop"
        @click="jump($event, '4')"
        :style="{
          'border-bottom': getactivestate('4'),
        }"
      >
        <img
          src="https://harnerdesigns.com/wp-content/uploads/2018/05/Adobe_Photoshop_CS6_icon.png"
        />
      </li>
      <li
        data-title="Dreamweaver"
        @click="jump($event, '5')"
        :style="{
          'border-bottom': getactivestate('5'),
        }"
      >
        <img
          src="https://harnerdesigns.com/wp-content/uploads/2018/05/Adobe_Dreamweaver_CS6_Icon.png"
        />
      </li>
      <li
        data-title="System&nbsp;Preferences"
        @click="jump($event, '6')"
        :style="{
          'border-bottom': getactivestate('6'),
        }"
      >
        <img
          src="https://harnerdesigns.com/wp-content/uploads/2018/05/20140418_System_Preferences.png"
        />
      </li>
      <li
        data-title="Trash"
        @click="jump($event, '7')"
        :style="{
          'border-bottom': getactivestate('7'),
        }"
      >
        <img
          src="https://harnerdesigns.com/wp-content/uploads/2018/05/512-TrashIcon-macosx1.png"
        />
      </li>
    </ul>
  </footer>
</template>

<script>
export default {
  name: "Dock",
  props: ["activewindows"],
  emits: ["windownum"],
  setup(props, context) {
    function jump(e, num) {
      e.target.classList.toggle("jump");
      context.emit("windownum", num);
    }
    //shows border if window is opened
    function getactivestate(sourceid) {
      if (props.activewindows.find((x) => x.sourceid == sourceid)) {
        return "solid";
      } else {
        return "none";
      }
    }

    return { jump, getactivestate };
  },
};
</script>

<style scoped>
footer {
  bottom: 0;
  display: inline-block;
  height: 4.4em;
  left: 50%;
  min-width: 35em;
  padding: 0 10px;
  perspective: 1000px;
  position: absolute;
  text-align: center;
  transform: translatex(-50%);
}

footer:before {
  background: linear-gradient(to top, #e6e6e6 0%, #a3a3a3 100%);
  bottom: 0;
  content: "";
  height: 4em;
  left: 0;
  margin-top: 15px;
  position: absolute;
  right: 0;
  top: 0;
  transform: rotatex(45deg);
  width: 100%;
  z-index: -1;
}

footer ul {
  display: inline-block;
  margin: 0 0.1em;
  padding: 0;
  transform-origin: bottom center !important;
}

footer li {
  display: inline-block;
  vertical-align: top;
  position: relative;
  transform: scale(1);
  transform-origin: bottom center;
  transition: transform 2s;
}

footer li:before {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  color: #fff;
  content: attr(data-title);
  display: block;
  float: left;
  font-size: 0.9em;
  left: 50%;
  margin: 2px auto;
  opacity: 0;
  padding: 0 10px;
  position: absolute;
  text-align: center;
  top: -35px;
  transform: translatex(-50%);
  transform-origin: bottom center !important;
  visibility: hidden;
  width: auto;
}

footer li:hover:before {
  opacity: 1;
  top: -45px;
  visibility: visible;
}

.jump {
  -webkit-animation: JUMP 600ms 2 cubic-bezier(0.4, 0.01, 0.6, 0.99);
}

footer img {
  -webkit-box-reflect: below -5px -webkit-gradient(
      linear,
      left bottom,
      left top,
      color-stop(0%, rgba(230, 230, 230, 0.2)),
      color-stop(100%, rgba(255, 255, 255, 0))
    );
  align-items: center;
  bottom: 0;
  display: flex;
  justify-content: center;
  margin: 0 5px;
  position: relative;
  transform: scale(1);
  transform-origin: bottom center !important;
  transition: all 0.2s;
  width: 4em;
}

footer img:hover {
  margin: 0 10px;
  transform: scale(1.2);
}

@-webkit-keyframes JUMP {
  0% {
    bottom: 0;
  }

  50% {
    bottom: 20px;
    padding-bottom: 20px;
  }

  100% {
    bottom: 0;
  }
}
</style>
