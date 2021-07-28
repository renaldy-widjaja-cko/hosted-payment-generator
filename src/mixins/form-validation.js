const URL_EXP = new RegExp("(https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,})");
const SECRET_EXP = new RegExp("^sk_(test_)?(\\w{8})-(\\w{4})-(\\w{4})-(\\w{4})-(\\w{12})$");
const NAME_EXP = new RegExp(/^[A-Za-z]{1,20}\s?[A-Za-z]{1,20}$/);
const EMAIL_EXP = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const PHONE_EXP = new RegExp(/^[0-9]{8}$/);
const ADDRESS_EXP = new RegExp("^[#.0-9a-zA-Z\\s,-]+$");
const PHONE_CODE_EXP = new RegExp(/^[+][0-9]{1,4}$/);
const COUNTRY_EXP = new RegExp(/^[A-Za-z]{2}$/)

export default {
    data() {
    },
    methods: {
        form__basic_validation(str, regex) {
            if (!str || str.length == 0) return null;
            return regex.test(str) && str.length > 0;
          },
        form__url_validation(str) {
            return this.form__basic_validation(str, URL_EXP);
        },
        form__secret_validation(str) {
            return this.form__basic_validation(str, SECRET_EXP);
        },
        form__name_validation(str) {
            return this.form__basic_validation(str, NAME_EXP);
        },
        form__email_validation(str) {
            return this.form__basic_validation(str, EMAIL_EXP);
        },
        form__phone_validation(str) {
            return this.form__basic_validation(str, PHONE_EXP);
        },
        form__address_validation(str) {
            return this.form__basic_validation(str, ADDRESS_EXP);
        },
        form__phone_code_validation(str) {
            return this.form__basic_validation(str, PHONE_CODE_EXP);
        },
        form__country_validation(str) {
            return this.form__basic_validation(str, COUNTRY_EXP);
        },
        form__non_empty_validation(str) {
            if(str)
                return true;
            return null;
        },
        form__non_zero_validation(num) {
            if (parseInt(num) > 0)
                return true
            return null;
        }
    }
}