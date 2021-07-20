<template>
  <div class="container">
    <div class="row justify-content-center text-center">
      <div class="col-8">
        <h1 class="display-4">Welcome</h1>
        <p>Please enter API key</p>
        <b-form @submit="onSubmit" @reset="onReset">
          <b-form-group label="API Key" label-for="secret">
            <b-form-input
              type="text"
              id="secret"
              class="form-control"
              v-model.trim="Form.Secret"
              :state="state__Secret"
              name="secret"
              placeholder="sk_xxxx"
              required
            />
            <b-form-invalid-feedback :state="state__Secret"
              >Please enter a valid API Key.</b-form-invalid-feedback
            >
          </b-form-group>
          <div class="row">
            <b-form-group class="col-8" label="Type" label-for="type">
              <b-form-select
                class="form-control"
                name="type"
                id="type"
                :options="HOSTED_TYPE_OPTIONS"
                required
                v-model="Form.Type"
                :state="state__Payment_Type"
              >
              </b-form-select>
            </b-form-group>
            <b-form-group class="col-4"
              v-show="type__payment_link"
            >
              <label for="expiry"
                >Expiry<span class="text-muted">(Optional)</span></label
              >
              <b-form-input
                type="number"
                class="form-control"
                name="expiry"
                id="expiry"
                placeholder="[1..1209600]"
                v-model="Form.Expiry"
                :state="state__Expiry"
              />
            </b-form-group>
          </div>
          <b-form-group label="Success Url" label-for="successUrl" v-show="type__hosted_payment">
            <b-form-input
              type="text"
              name="successUrl"
              id="successUrl"
              class="form-control"
              v-model.trim="Form.SuccessUrl"
              placeholder="https://example.com/success"
              :state="state__SuccessUrl"
              required
            />
            <b-form-invalid-feedback :state="state__SuccessUrl"
              >Please enter a Success Url.</b-form-invalid-feedback
            >
          </b-form-group>
          <b-form-group label="Failure Url" label-for="failureUrl" v-show="type__hosted_payment">
            <b-form-input
              type="text"
              name="failureUrl"
              id="failureUrl"
              class="form-control"
              placeholder="https://example.com/fail"
              v-model.trim="Form.FailureUrl"
              :state="state__FailureUrl"
              required
            />
            <b-form-invalid-feedback :state="state__FailureUrl"
              >Please enter a Failure Url.</b-form-invalid-feedback
            >
          </b-form-group>
          <b-form-group label="Cancel/Return Url" label-for="cancelUrl">
            <b-form-input
              type="text"
              name="cancelUrl"
              id="cancelUrl"
              class="form-control"
              placeholder="https://example.com/cancel"
              v-model.trim="Form.CancelUrl"
              :state="state__CancelUrl"
              required
            />
            <b-form-invalid-feedback :state="state__CancelUrl">
              Please enter a Cancel/Return Url.
            </b-form-invalid-feedback>
          </b-form-group>
          <div class="row pt-4">
            <b-button type="submit" variant="primary" class="col-12"
              >Enter</b-button
            >
          </div>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import formValidation from "../mixins/form-validation.js";
import { HOSTED_TYPE_OPTIONS, HOSTED_TYPE } from "../enum/index.js";

export default {
  name: "Home",
  mixins: [formValidation],
  data() {
    return {
      HOSTED_TYPE_OPTIONS,
      HOSTED_TYPE,
      Form: {
        Secret: "sk_test_c1510dde-f162-4a5b-86e1-365c285a2c27",
        SuccessUrl: "https://example.com/success",
        FailureUrl: "https://example.com/fail",
        CancelUrl: "https://example.com/cancel",
        Type: HOSTED_TYPE.PAYMENT_LINK,
        Expiry: 86400,
      },
    };
  },
  components: {},
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.$store.commit("UPDATE_INIT_FORM", this.Form);
      this.$router.push("Generator");
    },
    onReset(event) {
      event.preventDefault();
    },
  },
  computed: {
    type__payment_link() {
      return this.Form.Type == HOSTED_TYPE.PAYMENT_LINK;
    },
    type__hosted_payment() {
      return this.Form.Type == HOSTED_TYPE.HOSTED_PAYMENT_PAGE;
    },
    state__Secret() {
      return this.form__secret_validation(this.Form.Secret);
    },
    state__SuccessUrl() {
      return this.form__url_validation(this.Form.SuccessUrl);
    },
    state__FailureUrl() {
      return this.form__url_validation(this.Form.FailureUrl);
    },
    state__CancelUrl() {
      return this.form__url_validation(this.Form.CancelUrl);
    },
    state__Payment_Type(){
      return this.Form.Type != HOSTED_TYPE.UNKNOWN;
    },
    state__Expiry(){
      return this.Form.Expiry >= 1 && this.Form.Expiry <= 1209600;
    }
  },
};
</script>
