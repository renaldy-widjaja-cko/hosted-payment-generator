import Vue from "vue";
import Vuex, {} from "vuex";
import axios from "axios";
import {
  HOSTED_TYPE
} from "../enum/index.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    type: "",

    secret: "",
    successUrl: "",
    failureUrl: "",
    cancelUrl: "",
    expiry: "",

    responseLink: ""
  },
  getters: {
    response: state => state.responseLink
  },
  mutations: {
    UPDATE_INIT_FORM(state, form) {
      state.secret = form.Secret;
      state.successUrl = form.SuccessUrl;
      state.failureUrl = form.FailureUrl;
      state.cancelUrl = form.CancelUrl;
    },
    UPDATE_RESPONSE(state, response) {
      state.responseLink = response;
    },
    POST_PAYMENT(state, data) {
      axios.defaults.headers.common["Authorization"] = state.secret;
      if (type == HOSTED_TYPE.PAYMENT_LINK) {
        var formData = constructPaymentLinkData(data, state)
        axios.post("/payment-links", formData).then(
          result => {
            state.responseLink = result.data._links.redirect.href;
          }).catch(exception => {
          state.responseLink = exception;
        })
      }
    }
  }
});

function constructPaymentLinkData(data, state) {
  return {
    "amount": data.TotalAmount,
    "currency": data.Currency,
    "reference": data.Reference,
    "description": data.Description,
    "expires_in": state.expiry,
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
        "country_code": data.PhoneCountryCode,
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
  };
}