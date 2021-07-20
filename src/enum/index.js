

export const HOSTED_TYPE = Object.freeze({
    UNKNOWN: 0,
    PAYMENT_LINK: 1,
    HOSTED_PAYMENT_PAGE: 2
})

export const HOSTED_TYPE_OPTIONS = Object.freeze([{
        value: null,
        text: "Please select an option",
        disabled: true,
    },
    {
        value: HOSTED_TYPE.PAYMENT_LINK,
        text: "Payment Link",
        selected: true,
    },
    {
        value: HOSTED_TYPE.HOSTED_PAYMENT_PAGE,
        text: "Hosted Payment Page"
    }
])