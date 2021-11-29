<template>
  <vue-resizable
    class="window"
    ref="draggableContainer"
    :z="z"
    :top="top"
    :left="left"
    @click="init"
  >
    <div
      draggable="true"
      :style="{
        'z-index': z,
        height: '100%',
      }"
      ref="draggableContainer_ins"
      :id="activeserviceID"
    >
      <div class="top drag-el">
        <div class="panel">
          <span class="first" @click="deletewindow(activeserviceID)"></span>
          <span class="second"></span>
          <span class="third"></span>
        </div>
        <div class="nav">
          <span class="prev active"><i class="fa fa-angle-left"></i></span>
          <span class="next"><i class="fa fa-angle-right"></i></span>
          <span class="set"><i class="fa fa-list-alt"></i></span>

          <span class="address">
            <input type="text" :value="title" class="address" editable="true" />
            <i class="fa fa-refresh"></i>
          </span>
        </div>
        <div class="nav right">
          <span class="share"><i class="fa fa-share-alt"></i></span>
          <span class="tabs">
            <span class="square front"></span>
            <span class="square behind"></span>
          </span>
        </div>

        <span class="new">
          <span class="plus x"></span>
          <span class="plus y"></span>
        </span>
      </div>

      <div class="inside">
        <div class="blok"></div>
        <div class="blok"></div>
        <div class="blok" style="margin: 0"></div>
      </div>
    </div>
  </vue-resizable>
</template>

<script>
import VueResizable from "@/components/Desktop/Resize_logic.vue";
export default {
  name: "Window",
  components: {
    VueResizable,
  },
  props: ["top", "left", "activeserviceID", "z", "title"],
  data() {
    return {
      positions: {
        clientX: undefined,
        clientY: undefined,
        movementX: 0,
        movementY: 0,
      },
    };
  },
  methods: {
    init(e) {
      //prevent after deletion
      if (e.target.className !== "first") {
        //Needed for position remembering
        let servnum = this.$refs.draggableContainer_ins.id;

        this.$emit("changeposition", [
          this.$refs.draggableContainer.style.left,
          this.$refs.draggableContainer.style.top,
          this.$refs.draggableContainer.style.width,
          this.$refs.draggableContainer.style.height,
          this.$refs.draggableContainer_ins.style.zIndex,

          servnum,
        ]);
      }
    },
    closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    },
    deletewindow(id) {
      this.$emit("deletewindow", id);
    },
  },
};
</script>

<style scoped>
.window {
  position: absolute;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  -moz-box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  -webkit-box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  width: 800px;
  overflow: hidden;
  border: 1px solid #c1c2c2;
}

.inside {
  background: #fff;
  overflow: hidden;
  padding: 10px;
  height: 100%;
}
.inside .blok {
  width: 32%;
  float: left;
  margin-right: 1.5%;
  height: 50px;
  background: #efefef;
}
.top {
  padding: 7px 0;
  position: relative;
  background: #f1f1f1;
  background: -moz-linear-gradient(top, #e9e9e9 3%, #d8d8d8 100%);
  background: -webkit-gradient(
    left top,
    left bottom,
    color-stop(3%, #e9e9e9),
    color-stop(100%, #d8d8d8)
  );
  background: -webkit-linear-gradient(top, #e9e9e9 3%, #d8d8d8 100%);
  background: -o-linear-gradient(top, #e9e9e9 3%, #d8d8d8 100%);
  background: -ms-linear-gradient(top, #e9e9e9 3%, #d8d8d8 100%);
  background: linear-gradient(to bottom, #e9e9e9 3%, #d8d8d8 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f1f1f1', endColorstr='#d8d8d8', GradientType=0 );

  -webkit-box-shadow: inset 0px 1px 1px 0px rgba(255, 255, 255, 0.76);
  -moz-box-shadow: inset 0px 1px 1px 0px rgba(255, 255, 255, 0.76);
  box-shadow: inset 0px 1px 1px 0px rgba(255, 255, 255, 0.76);

  overflow: hidden;
  border-bottom: 2px solid #bdbcc1;
}

.top > div {
  float: left;
}

.panel {
  padding-left: 9px;
  padding-top: 2px;
}

.panel > span {
  display: inline-block;
  float: left;
  width: 12px;
  height: 12px;
  margin-right: 7px;
  -webkit-border-radius: 6px;
  -moz-border-radius: 6px;
  border-radius: 6px;
  cursor: pointer;
}

.panel span.first {
  background: #ff5f4f;
}

.panel span.second {
  background: #f9c206;
}

.panel span.third {
  background: #19cc32;
}

.nav {
  overflow: hidden;
}

.nav > span {
  display: inline-block;
  float: left;
  background: #fbfbfb;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  height: 23px;
  padding: 0 8px;
  cursor: pointer;
  color: #b4b4b4;
  border-bottom: 1px solid #cecece;
}
.nav > span:hover {
  background: #f2f2f2;
  color: #666;
}
.nav > span i.fa {
  font-size: 23px;
}

.nav span.active {
  color: #707070;
}

.nav span.prev {
  margin-right: 1px;
  margin-left: 7px;
}

.nav span.next {
  margin-right: 7px;
}

.nav span.set i {
  font-size: 14px;
  position: relative;
  top: 3px;
}

.nav span.address {
  width: 400px;
  margin-left: 75px;
  display: inline-block;
  background: #fff;
  line-height: 23px;
  padding: 0;
  text-align: center;
  position: relative;
}
.nav span.address > input {
  font-size: 12px;
  color: #505050;
  border: none;
  background: none;
  text-align: center;
  position: relative;
  width: 300px;
}

.nav span.address > input:focus {
  outline: none;
}

.nav span.address > input.class {
  text-align: left;
}

.nav span.address > i.fa {
  position: absolute;
  right: 5px;
  top: 7px;
  font-size: 11px;
  color: #010101;
}

.nav.right {
  float: right !important;
  margin-right: 35px;
}

.nav span.share {
  margin-right: 7px;
}
.nav span.share > i.fa {
  font-size: 11px;
  position: relative;
  top: 2px;
}

.nav span.tabs {
  position: relative;
  width: 26px;
  padding: 0;
}

.nav span.tabs span {
  height: 7px;
  width: 7px;
  border: 1px solid #b4b4b4;
  display: inline-block;
  position: absolute;
  background: #fbfbfb;
}

.nav span.tabs span.front {
  top: 8px;
  left: 6px;
  z-index: 6;
}

.nav span.tabs span.behind {
  top: 6px;
  left: 8px;
  z-index: 5;
}

.nav span.tabs:hover span {
  border: 1px solid #666;
}

span.new {
  cursor: pointer;
  position: absolute;
  right: 0;
  bottom: 0;
  background: #cacaca;
  width: 23px;
  height: 23px;
  text-align: center;
  line-height: 23px;
  border-top: 1px solid #c1c2c2;
  border-left: 1px solid #c1c2c2;
}

span.new:hover {
  -webkit-box-shadow: inset 0px 1px 1px 0px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: inset 0px 1px 1px 0px rgba(0, 0, 0, 0.1);
  box-shadow: inset 0px 1px 1px 0px rgba(0, 0, 0, 0.1);
}
span.new .plus {
  position: absolute;
  background: #b0b0b0;
  display: inline-block;
}

span.new .plus.x {
  height: 1px;
  width: 14px;
  top: 12px;
  right: 0;
  left: 0;
  margin: auto;
}

span.new .plus.y {
  height: 14px;
  width: 1px;
  bottom: 0;
  top: 0;
  margin: auto;
}
</style>
