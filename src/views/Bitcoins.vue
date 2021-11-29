<!--Осуществить подписку на новые неподтвержденные биткоин-транзакции с помощью
Blockchain WebSocket API (https://www.blockchain.com/api/api_websocket).
В интерфейсе должен присутствовать постоянно обновляющийся список транзакций, сумма отображенных транзакций, а также три кнопки:
«Запуск» - подписывается на сообщения о новых транзакциях;
«Остановка» - останавливает получение данных, при нажатии на «Запуск» возобновляет;
«Сброс» - очищает список транзакций и сбрасывает сумму.


Пример использования:
Юзер нажимает на кнопку «Запуск». По каждому сообщению в список добавляется транзакция, обновляется сумма транзакций.
Юзер нажимает на кнопку «Сброс». Список сообщений сбрасывается, сумма обнуляется, но при следующем сообщении снова пополняется список и обновляется сумма.
Юзер нажимает на кнопку «Остановка». Сообщения перестают приходить, но список и сумма остаются в том же состоянии, что и после последнего полученного сообщения. Юзер нажимает на кнопку «Запуск», список пополняется новыми транзакциями, обновляется сумма.
В качестве числового значения транзакции (величина биткоина) можно использовать любое число, которое есть в сообщении.
-->
<template>
  <div id="app">
    <h2>Сумма {{ sumstorage }} BTC</h2>
    <button v-on:click="subscribe">Запуск</button>
    <button v-on:click="unsubscribe">Остановка</button>

    <button v-on:click="clearData">Сброс</button>

    <div style="height: 100%">
      <div style="height: 100%; display: flex; flex-direction: column">
        <div style="margin-bottom: 4px"></div>
        <div style="flex-grow: 1">
          <ag-grid-vue
            style="width: 100%; height: 600px"
            class="ag-theme-alpine"
            id="myGrid"
            :columnDefs="columnDefs"
            @grid-ready="onGridReady"
            :rowData="rowData"
            :defaultColDef="defaultColDef"
            :animateRows="true"
          ></ag-grid-vue>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import { ref } from "vue";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue3";

export default {
  name: "App",
  data: function () {
    return {
      columnDefs: [{ field: "from" }, { field: "to" }, { field: "sum" }],
      //AG grid api
      gridApi: null,
      // center data
      defaultColDef: { flex: 1 },
      rowData: [],
      sumstorage: 0,
    };
  },
  components: {
    AgGridVue,
  },
  created() {
    //establish connection
    this.connection = new WebSocket("wss://ws.blockchain.info/inv");
    this.connection.onopen = function (event) {
      console.log(event);
      console.log("Successfully connected to the echo websocket server...");
    };
  },
  methods: {
    //API init
    onGridReady(params) {
      this.gridApi = params.api;
    },
    //triggers recound based on table data
    recountsum() {
      const rowData = [];
      let val = {};
      this.gridApi.forEachNode(function (node) {
        rowData.push(node.data);
      });
      //if data was cleared enter 0
      if (rowData.length == 0) {
        val.sum = 0;
      } else {
        val = rowData.reduce(function (previousValue, currentValue) {
          return {
            sum: previousValue.sum + currentValue.sum,
          };
        });
      }
      this.sumstorage = val.sum;
    },
    //logs
    printResult(res) {
      console.log("---------------------------------------");
      if (res.add) {
        res.add.forEach(function (rowNode) {
          console.log("Added Row Node", rowNode);
        });
      }
      if (res.remove) {
        res.remove.forEach(function (rowNode) {
          console.log("Removed Row Node", rowNode);
        });
      }
    },

    clearData() {
      this.gridApi.setRowData([]);
      this.recountsum();
    },
    //add recivied message to the grid
    addItems(newdata) {
      const newItems = [newdata];
      const res = this.gridApi.applyTransaction({
        add: newItems,
      });
      this.printResult(res);
    },

    subscribe() {
      let message = {
        op: "unconfirmed_sub",
      };
      this.connection.send(JSON.stringify(message));
      this.connection.onmessage = (event) => {
        let currdata = JSON.parse(event.data);

        let f = "";
        let t = "";
        let s = 0;
        currdata.x.inputs.forEach((el) => {
          f = f + el.prev_out.addr + ";";
          s = s + el.prev_out.value;
        });
        currdata.x.out.forEach((el) => {
          t = t + el.addr + ";";
        });

        let newdata = {
          from: f,
          to: t,
          sum: s,
        };
        this.addItems(newdata);
        this.recountsum();
      };
    },
    unsubscribe() {
      let message = {
        op: "unconfirmed_unsub",
      };
      this.connection.send(JSON.stringify(message));
    },
  }, //methods end
};
</script>

<style lang="scss">
@import "~ag-grid-community/dist/styles/ag-grid.css";
@import "~ag-grid-community/dist/styles/ag-theme-alpine.css";
</style>
