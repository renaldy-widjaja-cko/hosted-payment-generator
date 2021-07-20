import Vue from "vue";
import Vuex, {
} from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    type: "",
    form: {
      secret: "",
      successUrl: "",
      failureUrl: "",
      cancelUrl: "",
      expiry: "",
    },
    responseLink: ""
  },
  getters: {
    response: state => state.responseLink
  },
  mutations: {
    UPDATE_INIT_FORM(state, form) {
      state.form.secret = form.Secret;
      state.form.successUrl = form.SuccessUrl;
      state.form.failureUrl = form.FailureUrl;
      state.form.cancelUrl = form.CancelUrl;
    },
    UPDATE_RESPONSE(state, response) {
      state.responseLink = response;
    },
    POST_PAYMENT(state, data) {
      axios.defaults.headers.common["Authorization"] = state.form.secret;
      var formData = {
        "amount": data.TotalAmount,
        "currency": data.Currency,
        "reference": data.Reference, //A reference number for internal tracking
        "description": data.Description, //A brief description of the transaction
        "expires_in": state.expiry, //in seconds
        "customer": {
          "name": data.FirstName + " " + data.LastName,
          "email": data.Email
        },
        "billing": {
          "address": {
            "address_line1": data.Address1,
            "address_line2": data.Address2,
            "city": data.City,
            "state": data.State,
            "zip": data.Zip,
            "country": data.Country
          },
          "phone": {
            "country_code": data.PhoneCountryCode, //+65
            "number": data.Phone
          }
        },
        "products": data.Products,
        "3ds": {
          "enabled": true,
          "attempt_n3d": false
        },
        "return_url": state.cancelUrl,
        "locale": "en-GB"
      }
      axios.post("/payment-links", formData).then(
        result => {
          state.responseLink = result.data._links.redirect.href;
        }
      )
    }
  }
});