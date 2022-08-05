<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "addDish",
  data() {
    return {
      dishesList: [],
      dish: {},
    };
  },
  mounted() {
    this.getDishData();
  },
  methods: {
    getDishData() {
      axios
        .get(`http://localhost:9000/api/dishes/${this.$route.params.id}`)
        .then((res) => {
          this.dish = res.data.data;
        })
        .catch((err) => {
          this.errors.push(err);
        });
    },

    handleSubmit() {
      axios
        .put(`http://localhost:9000/api/dishes`, this.dish)
        .then((res) => {
          this.dishesList = res.data.data;
          Swal.fire(
            "Dish Updated!",
            "Dish updated successfully! Please wait...",
            "success"
          );
          setTimeout(() => {
            this.$router.push("/");
          }, 1000);
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
          <router-link to="/">
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
          <router-link to="/add-dish" class="active"
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

        <div class="px-3 py-5">
          <div class="card">
            <div class="card-header bg-white mb-3">
              <h5 class="card-title mb-0 text-left">
                <b>Edit Dish - #{{ this.$route.params.id }}</b>
              </h5>
            </div>
            <div class="card-body">
              <form @submit.prevent="handleSubmit">
                <div class="row">
                  <div class="col-md-4">
                    <div class="form-group text-left">
                      <label for="name">Name</label>
                      <input
                        id="name"
                        v-model="dish.name"
                        type="text"
                        class="form-control"
                      />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group text-left">
                      <label for="category">Category</label>
                      <input
                        id="category"
                        v-model="dish.category"
                        type="text"
                        class="form-control"
                      />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group text-left">
                      <label for="calories">calories</label>
                      <input
                        id="calories"
                        v-model="dish.calories"
                        type="text"
                        class="form-control"
                      />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group text-left">
                      <label for="image">Image</label>
                      <input
                        id="image"
                        v-model="dish.image"
                        type="text"
                        class="form-control"
                      />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group text-left">
                      <label for="waiting_time">Waiting Time</label>
                      <input
                        id="waiting_time"
                        v-model="dish.waiting_time"
                        type="text"
                        class="form-control"
                      />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group text-left">
                      <label for="price">Price</label>
                      <input
                        id="price"
                        v-model="dish.price"
                        type="text"
                        class="form-control"
                      />
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group text-left">
                      <label for="description">Description</label>
                      <textarea
                        id="description"
                        v-model="dish.description"
                        type="text"
                        rows="10"
                        class="form-control"
                      ></textarea>
                    </div>
                  </div>
                  <div class="col-md-12 d-flex justify-content-start mb-3">
                    <b-form-checkbox
                      v-model="dish.is_active"
                      name="check-button"
                      switch
                    >
                    Is Active?
                    </b-form-checkbox>
                  </div>
                  <div class="col-12 text-left">
                    <button type="submit" class="btn btn-danger btn-lg">
                      Create New Dish
                    </button>
                  </div>
                </div>
              </form>
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
.form-group label {
  font-weight: 600;
  color: #0f101d;
}
.form-group input {
  height: 45px !important;
}
</style>
