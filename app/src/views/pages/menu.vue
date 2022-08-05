<script>
import axios from "axios";
import groupBy from "lodash.groupby";
import Swal from "sweetalert2";

export default {
  name: "menu",
  data() {
    return {
      dishesList: [],
      tabId: 0,
    };
  },
  mounted() {
    this.getDishesList();
    this.group();
  },
  computed: {
    groups() {
      return groupBy(this.dishesList, "category");
    },
  },
  methods: {
    getDishesList() {
      axios
        .get(`http://localhost:9000/api/dishes`)
        .then((res) => {
          this.dishesList = [];
          this.dishesList = res.data.data;
        })
        .catch((err) => {
          this.errors.push(err);
        });
    },
    groupBy(array, key) {
      const result = {};
      array.forEach((item) => {
        if (!result[item[key]]) {
          result[item[key]] = [];
        }
        result[item[key]].push(item);
      });
      return result;
    },
  },
};
</script>


<template>
  <div>
    <div class="overlay">
      <div class="container">
        <div class="menu-card">
          <div class="menu-head">
            <img src="@/assets/logo2.png" width="230px" alt="" />
          </div>
          <div class="menu-tab-links">
            <button
              v-for="(group, groupName, i) in groups"
              :key="i"
              :class="tabId === i ? 'active' : ''"
              @click="tabId = i"
            >
              {{ groupName }}
            </button>
          </div>
          <div
            class="menu-tab"
            v-for="(group, groupName, i) in groups"
            :key="i"
            v-if="tabId == i"
          >
          <h3 class="border-bottom mb-5 pb-2"><b>{{groupName}}</b> Dishes</h3>
            <div class="row">
              <div class="col-md-3" v-for="item in group" v-if="item.is_active" :key="item._id">
                <div class="dish-item">
                  <div class="img">
                    <img :src="item.image" alt="" />
                  </div>
                  <div class="cont">
                    <strong>{{ item.name }}</strong>
                    <p>{{ item.description }}</p>
                    <div class="row py-2">
                      <div class="col-6">
                        <b>Calories: </b> <br />
                        {{ item.calories }}
                      </div>
                      <div class="col-6">
                        <b>Waiting Time: </b> <br />{{ item.waiting_time }}
                      </div>
                    </div>
                    <div class="price">{{ item.price }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<style>
body {
  background: url(../../assets/menubg.jpg) !important;
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;
  background-repeat: no-repeat;
  position: relative;
}
.overlay {
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  padding-top: 50px;
  padding-bottom: 50px;
  backdrop-filter: blur(4px);
  position: fixed;
  top: 0;
  overflow-y: auto;
}
.menu-card {
  width: 100%;
  border-radius: 10px;
  background: rgba(255, 255, 255, 1);
  padding: 24px;
}

.menu-tab-links {
  margin: 20px 0;
  padding: 10px;
  background: rgba(235, 28, 0, 0.1);
  border-radius: 10px;
}

.menu-tab-links button {
  border-radius: 5px;
  color: #0f101d;
  padding: 0 20px;
  height: 44px;
  border: none;
  font-size: 15px;
  font-weight: 600;
  margin-right: 5px;
  background: none;
  transition: 0.2s all;
}

.menu-tab-links button:hover {
  background: #eb1c00;
  color: #fff;
}

.menu-tab-links button.active {
  background: #eb1c00;
  color: #fff;
}

.dish-item .img {
  height: 150px;
}
</style>
