<script>
import axios from "axios";
import groupBy from "lodash.groupby";
import Swal from "sweetalert2";

export default {
  name: "dashboard",
  data() {
    return {
      dishesList: [],
      fields: [
        {
          key: "name",
          sortable: true,
          label: "Name",
        },
        {
          key: "description",
          sortable: true,
          label: "Description",
        },
        {
          key: "category",
          sortable: true,
          label: "Category",
        },
        {
          key: "calories",
          sortable: true,
          label: "Calories",
        },
        {
          key: "waiting_time",
          sortable: true,
          label: "Waiting Time",
        },
        {
          key: "price",
          sortable: true,
          label: "Price",
        },
        {
          key: "is_active",
          sortable: false,
          label: "Active",
        },
        {
          key: "_id",
          sortable: false,
          label: "Actions",
        },
      ],
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
    /* group() {
      const byBreed = groupBy(this.dishesList, (item) => {
        return item.category;
      });
      console.log(byBreed);
    }, */
    deleteDish(Id) {
      axios
        .delete(`http://localhost:9000/api/dishes/${Id}`)
        .then(() => {
          this.getDishesList();
          Swal.fire("Deleted!", "Item deleted successfully!", "success");
        })
        .catch((err) => {
          this.errors.push(err);
          this.getDishesList();
          Swal.fire("Deleted!", "Item deleted successfully!", "success");
        });
    },

    changeStatus(item) {
      if (item.is_active === true) {
        item.is_active = false;
      } else {
        item.is_active = true;
      }

      axios
        .put(`http://localhost:9000/api/dishes`, item)
        .then(() => {
          Swal.fire(
            "Item Updated!",
            "Item updated successfully!",
            "success"
          );
        })
        .catch((err) => {
          this.errors.push(err);
        });
    },
  },
};
</script>


<template>
  <div>
    <div class="page-main">
      <div class="page-sidebar">
        <div class="logo">
          <img src="@/assets/logo1.png" width="100%" alt="" />
          <h1>ChefMehmet</h1>
        </div>
        <div class="menu-links">
          <router-link to="/dashboard" class="active">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-pie-chart"
              viewBox="0 0 16 16"
            >
              <path
                d="M7.5 1.018a7 7 0 0 0-4.79 11.566L7.5 7.793V1.018zm1 0V7.5h6.482A7.001 7.001 0 0 0 8.5 1.018zM14.982 8.5H8.207l-4.79 4.79A7 7 0 0 0 14.982 8.5zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"
              /></svg
            >Dashboard
          </router-link>
          <router-link to="/menu-list"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-menu-button-wide"
              viewBox="0 0 16 16"
            >
              <path
                d="M0 1.5A1.5 1.5 0 0 1 1.5 0h13A1.5 1.5 0 0 1 16 1.5v2A1.5 1.5 0 0 1 14.5 5h-13A1.5 1.5 0 0 1 0 3.5v-2zM1.5 1a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5h-13z"
              />
              <path
                d="M2 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm10.823.323-.396-.396A.25.25 0 0 1 12.604 2h.792a.25.25 0 0 1 .177.427l-.396.396a.25.25 0 0 1-.354 0zM0 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8zm1 3v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2H1zm14-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2h14zM2 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"
              /></svg
            >Menu List
          </router-link>
          <router-link to="/add-dish"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-plus-circle"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path
                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
              /></svg
            >Add New Dish
          </router-link>
          <router-link to="/menu"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-menu-button-wide"
              viewBox="0 0 16 16"
            >
              <path
                d="M0 1.5A1.5 1.5 0 0 1 1.5 0h13A1.5 1.5 0 0 1 16 1.5v2A1.5 1.5 0 0 1 14.5 5h-13A1.5 1.5 0 0 1 0 3.5v-2zM1.5 1a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5h-13z"
              />
              <path
                d="M2 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm10.823.323-.396-.396A.25.25 0 0 1 12.604 2h.792a.25.25 0 0 1 .177.427l-.396.396a.25.25 0 0 1-.354 0zM0 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8zm1 3v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2H1zm14-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2h14zM2 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"
              /></svg
            >Customer Menu
          </router-link>
        </div>
        <div class="menu-bottom"></div>
      </div>
      <div class="page-content">
        <div class="page-head">
          <div class="logo">
            <p>DishesMenu <span>Beta!</span></p>
          </div>
          <div class="support">
            <a href="#"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-question-circle-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"
                /></svg
              >Support</a
            >
          </div>
        </div>

        <div class="p-3">
          <div class="row">
            <div class="col-md-9">
              <div class="row">
                <div class="col-md-3 mb-2">
                  <div class="card">
                    <div class="card-body">
                      <div class="media">
                        <div class="media-body overflow-hidden">
                          <p
                            class="text-truncate font-size-16 mb-2 text-left"
                            style="font-size: 16px"
                          >
                            Total Dishes
                          </p>
                          <h4
                            class="mb-0 text-left"
                            style="font-size: 22px; font-weight: bold"
                          >
                            {{ dishesList.length }}
                          </h4>
                        </div>
                        <div class="text-danger">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            fill="currentColor"
                            class="bi bi-collection"
                            viewBox="0 0 16 16"
                          >
                            <path
                              d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zm1.5.5A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-3 mb-2" v-for="(group, groupName) in groups">
                  <div class="card">
                    <div class="card-body">
                      <div class="media">
                        <div class="media-body overflow-hidden">
                          <p
                            class="text-truncate font-size-16 mb-2 text-left"
                            style="font-size: 16px"
                          >
                            Total <b>{{ groupName }}</b
                            >(s)
                          </p>
                          <h4
                            class="mb-0 text-left"
                            style="font-size: 22px; font-weight: bold"
                          >
                            {{ group.length }}
                          </h4>
                        </div>
                        <div class="text-danger">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            fill="currentColor"
                            class="bi bi-collection"
                            viewBox="0 0 16 16"
                          >
                            <path
                              d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zm1.5.5A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="card mt-3">
                    <div class="card-header bg-white">
                      <h5 class="card-title text-left mb-0">
                        Dishes List Overview
                      </h5>
                    </div>
                    <div class="card-body">
                     
                      <b-table
                        striped
                        hover
                        :items="dishesList"
                        :fields="fields"
                      >
                        <template v-slot:cell(name)="row">
                          <div class="d-flex align-items-center">
                            <img
                              class="rounded-circle"
                              style="height: 30px"
                              :src="row.item.image"
                              width="30"
                            /><span class="ml-2">{{ row.value }}</span>
                          </div>
                        </template>
                        <template v-slot:cell(is_active)="row">
                          <b-form-checkbox
                            v-model="row.value"
                            name="check-button"
                            switch
                            @change="changeStatus(row.item)"
                          >
                          </b-form-checkbox>
                        </template>
                        <template v-slot:cell(_id)="row">
                          <router-link
                            :to="'/edit-dish/' + row.item._id"
                            v-b-tooltip.hover
                            title="View / Edit"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-pencil-square"
                              viewBox="0 0 16 16"
                            >
                              <path
                                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                              />
                              <path
                                fill-rule="evenodd"
                                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                              />
                            </svg>
                          </router-link>
                          <a
                            href="javascript:void(0);"
                            class="text-danger"
                            v-b-tooltip.hover
                            title="Delete"
                            @click="deleteDish(row.item._id)"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-trash"
                              viewBox="0 0 16 16"
                            >
                              <path
                                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                              />
                              <path
                                fill-rule="evenodd"
                                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                              />
                            </svg>
                          </a>
                        </template>
                      </b-table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-3">
              <div class="mb-2">
                <div class="card mb-3" v-for="(group, groupName) in groups">
                  <div class="card-body">
                    <div class="media">
                      <div class="media-body overflow-hidden">
                        <p
                          class="text-truncate font-size-16 mb-2 text-left"
                          style="font-size: 16px"
                        >
                          <b>{{ groupName }}</b> Category Dishes ({{
                            group.length
                          }})
                        </p>
                        <div
                          class="d-flex align-items-center mb-2 border-top pt-2"
                          v-for="item in group"
                          :key="item._id"
                        >
                          <img
                            class="rounded-circle"
                            style="height: 30px"
                            :src="item.image"
                            width="30"
                          /><span class="ml-2">{{ item.name }}</span>
                          <span class="badge badge-success ml-auto">{{
                            item.price
                          }}</span>
                        </div>
                      </div>
                    </div>
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
/* body {
  background: linear-gradient(to bottom left, #214172, #1d2e4d);
} */
/* thead {
  position: sticky;
  top: -17px;
  z-index: 99;
  background: #fff;
} */
</style>
