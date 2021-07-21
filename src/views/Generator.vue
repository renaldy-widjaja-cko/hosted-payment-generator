<template>
  <div class="container">
    <h1>Payment Link Generator</h1>
    <b-form id="payment-link-form">
      <div class="row">
        <div class="row pt-3">
          <h4>Billing address</h4>
        </div>
        <b-form-group
          class="col-6"
          label="First Name"
          label-for="firstName"
          :invalid-feedback="'Valid first name is required.'"
        >
          <b-form-input
            :type="'text'"
            name="firstName"
            id="firstName"
            v-model="Form.FirstName"
            :state="state__first_name"
            required
          />
        </b-form-group>
        <b-form-group class="col-6"
          label="Last Name"
          label-for="lastName"
          :invalid-feedback="'Valid last name is required.'"
        >
          <b-form-input
            :type="'text'"
            class="form-control"
            name="lastName"
            id="lastName"
            v-model="Form.LastName"
            :state="state__last_name"
            required
          />
        </b-form-group>
        <b-form-group
          class="col-6"
          label="Email"
          label-for="email"
          :invalid-feedback="'Invalid Email'"
        >
          <b-form-input
            :type="'email'"
            id="email"
            placeholder="Email"
            v-model="Form.Email"
            :state="state__email"
            trim
          ></b-form-input>
        </b-form-group>
        <b-form-group
          class="col-2"
          label="Phone Code"
          label-for="phoneCode"
          :invalid-feedback="'Invalid Phone Code'"
        >
          <b-form-input
            :type="'text'"
            name="phoneCode"
            id="phoneCode"
            v-model="Form.PhoneCountryCode"
            :state="state__phone_code"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          class="col-4"
          label="Phone Number"
          label-for="phone"
          :invalid-feedback="'Invalid Phone Number'"
        >
          <b-form-input
            id="phone"
            :type="'tel'"
            placeholder="Phone Number"
            v-model="Form.Phone"
            :state="state__phone"
            trim
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Address"
          label-for="address1"
          :invalid-feedback="'Invalid Address'"
        >
          <b-form-input
            :type="'text'"
            id="address1"
            placeholder="Address"
            v-model="Form.Address1"
            :state="state__address"
            trim
          ></b-form-input>
        </b-form-group>
        <b-form-group>
          <label for="address2"
            >Address2 <span class="text-muted">(Optional)</span></label
          >
          <b-form-input
            :type="'text'"
            id="address2"
            placeholder="Apartment or Suite"
            v-model="Form.Address2"
            :state="state__address2"
            trim
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Country" label-for="country" class="col-3">
          <b-form-input
            :type="'text'"
            id="country"
            class="form-control"
            placeholder="Singapore"
            v-model="Form.Country"
            :state="state__country"
            trim
          ></b-form-input>
        </b-form-group>
        <b-form-group class="col-3">
          <label for="city"
            >City <span class="text-muted">(Optional)</span></label
          >
          <b-form-input
            :type="'text'"
            name="city"
            id="city"
            v-model="Form.City"
            :state="state__city"
            placeholder="City"
          />
        </b-form-group>
        <b-form-group class="col-3">
          <label for="state"
            >State <span class="text-muted">(Optional)</span></label
          >
          <b-form-input
            :type="'text'"
            name="State"
            id="state"
            v-model="Form.State"
            :state="state__state"
            placeholder="State"
          />
        </b-form-group>
        <b-form-group
          class="col-3"
          label="Postal Code"
          label-for="zip"
          :invalid-feedback="'Invalid Postal Code'"
        >
          <b-form-input
            id="zip"
            placeholder="Postal Code"
            :type="'number'"
            v-model="Form.Zip"
            :state="state__zip"
            trim
          ></b-form-input>
        </b-form-group>
        <div class="row pt-3">
          <h4>Products</h4>
        </div>
        <div class="row table-responsive">
          <table class="table" id="product-table">
            <thead>
              <tr>
                <th data-sortable="true" scope="col" class="col-6">Name</th>
                <th scope="col" class="col-2">Quantity</th>
                <th scope="col" class="col-2">Price</th>
                <th scope="col" class="col-2">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, i) in Form.Products" :key="i">
                <td>
                  <b-form-input :type="'text'" v-model="product.name" />
                </td>
                <td>
                  <b-form-input :type="'number'" v-model="product.quantity" />
                </td>
                <td>
                  <b-form-input :type="'number'" v-model="product.price" />
                </td>
                <td>
                  <b-button
                    type="button"
                    class="btn btn-secondary"
                    @click="remove(i)"
                  >
                    x
                  </b-button>
                </td>
              </tr>
            </tbody>
          </table>
          <b-button type="button" variant=" btn-outline-dark" @click="add()">
            Add Product
          </b-button>
        </div>

        <b-form-group
          :invalid-feedback="'Amount is required'"
          label="Total Amount"
          label-for="amount"
          class="col-3"
        >
          <b-form-input
            :type="'number'"
            name="amount"
            id="amount"
            placeholder="1040"
            v-model="Form.TotalAmount"
            :state="state__total_amount"
            required
            pattern="\d+.\d{2}"
          />
          <div class="invalid-feedback"></div>
        </b-form-group>
        <b-form-group class="col-3">
          <label for="currency">Currency</label>
          <b-form-select
            class="form-control"
            name="currency"
            id="currency"
            v-model="Form.Currency"
            data-dropup-auto="false"
            data-live-search="true"
            :state="state__currency"
            required
          >
            <b-form-select-option disabled value="null"
              >Choose a currency</b-form-select-option
            >
            <b-form-select-option
              v-for="(currency, i) in CURRENCIES"
              :key="i"
              :value="currency.value"
              >{{ currency.entity }} -
              {{ currency.value }}</b-form-select-option
            >
          </b-form-select>
        </b-form-group>
        <b-form-group class="col-6" label="Reference" label-for="reference">
          <b-form-input
            :type="'text'"
            name="reference"
            id="reference"
            v-model="Form.Reference"
            :state="state__reference"
            placeholder=""
          />
        </b-form-group>
        <b-form-group
          label="Description"
          label-for="description"
        >
        <b-form-textarea
          id="description"
          v-model="Form.Description"
          :state="state__description"
        ></b-form-textarea>
        </b-form-group>
      </div>
      <b-button
        type="submit"
        variant="primary"
        class="col-12 mt-3"
        @click="postPayment"
        >Submit</b-button
      >
      <hr class="mb-4" />
    </b-form>

    <div
      class="row console-container"
      style="background-color: black; height: auto"
    >
      <div class="copy-icon-container">
        <button class="btn btn-light mx-3" v-clipboard="this.$store.state.responseLink">
          <font-awesome-icon
            :icon="['fas', 'clipboard']"
          ></font-awesome-icon>
        </button>
        <a class="btn btn-light" :href="response" id="go">
          <font-awesome-icon :icon="['fas','caret-right']"></font-awesome-icon>
        </a>
      </div>
      <pre
        class="console-text-container text-white mt-5"
      ><code id="console-text">{{response}}</code></pre>
    </div>

  </div>
</template>
<script>
import formValidation from "../mixins/form-validation.js";
import { CURRENCIES } from "../enum/currency-code.js";
import { mapGetters } from "vuex";

export default {
  mixins: [formValidation],
  data() {
    return {
      CURRENCIES,
      Form: {
        FirstName: "John",
        LastName: "Doe",
        Email: "john.doe@checkout.com",
        PhoneCountryCode: "+65",
        Phone: "93887060",
        Address1: "1 Main Street 1234",
        Address2: "Main Building",
        City: "Singapore",
        State: "Singapore",
        Country: "SG",
        Zip: "123456",
        Products: [
          {
            name: "Sample Product",
            quantity: 5,
            price: 100,
          },
        ], //convert this to component
        TotalAmount: 500,
        Currency: "SGD",
        Reference: "SMP-TXT-101",
        Description: "Purchase of sample products",
      },
    };
  },
  methods: {
    add() {
      this.Form.Products.push({
        name: "",
        quantity: 0,
        price: 0,
      });
    },
    remove(index) {
      this.Form.Products.splice(index, 1);
    },
    postPayment(event) {
      event.preventDefault();
      this.$store.commit("POST_PAYMENT", this.Form);
    },
  },
  computed: {
    ...mapGetters(["response"]),
    state__first_name() {
      return this.form__name_validation(this.Form.FirstName);
    },
    state__last_name() {
      return this.form__name_validation(this.Form.LastName);
    },
    state__email() {
      return this.form__email_validation(this.Form.Email);
    },
    state__phone_code() {
      return this.form__phone_code_validation(this.Form.PhoneCountryCode);
    },
    state__phone() {
      return this.form__phone_validation(this.Form.Phone);
    },
    state__address() {
      return this.form__address_validation(this.Form.Address1);
    },
    state__address2() {
      return this.form__non_empty_validation(this.Form.Address2);
    },
    state__zip() {
      return this.form__zip_validation(this.Form.Zip);
    },
    state__country() {
      return this.form__country_validation(this.Form.Country);
    },
    state__city() {
      return this.form__non_empty_validation(this.Form.City);
    },
    state__state() {
      return this.form__non_empty_validation(this.Form.State);
    },
    state__reference() {
      return this.form__non_empty_validation(this.Form.Reference);
    },
    state__currency() {
      return this.form__non_empty_validation(this.Form.Currency);
    },
    state__description() {
      return this.form__non_empty_validation(this.Form.Description);
    },
    state__total_amount() {
      var sum = 0;
      this.Form.Products.forEach(product => {
        sum += parseInt(product.quantity) * parseInt(product.price);
      })
      console.log("sum: " + sum);
      console.log("Amount: " + this.TotalAmount)
      return parseInt(this.Form.TotalAmount) === sum;
    },
    amount() {
      var sum = 0;
      this.Form.Products.forEach((product) => {
        if (product.Name) {
          sum += parseInt(product.Price) * parseInt(product.Quantity);
        }
      });
      if (isNaN(sum)) sum = 0;
      return sum;
    },
  },
};
</script>
