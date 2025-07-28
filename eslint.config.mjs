// @ts-check
import withNuxt from '.nuxt/eslint.config.mjs'

export default withNuxt({
    rules: {
        "vue/no-multiple-template-root": "off",
        "vue/multi-word-component-names": "off",
        "vue/first-attribute-linebreak": "off",
        "vue/attribute-hyphenation": "off",
        "@typescript-eslint/no-unused-vars": "off",
    }
})

