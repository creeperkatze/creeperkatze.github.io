import colors from 'tailwindcss/colors';

module.exports = {
    theme: {
        fontFamily: {
            sans: ['"Lexend"', 'sans-serif']
        },
        extend: {
            borderColor: {
                DEFAULT: colors.gray[400],
            },
        },
    }
}