/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  purge: {
    enabled: true,
    content: ["./src/**/*.{html,ts}",'./node_modules/preline/preline.js'],
  },
  darkMode: "class",
  important: true,
  theme: {
    extend: {
      backgroundImage: {
        'pattern': "url('./assets/images/decoration.png')",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        "fade-in-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-out-down": {
          from: {
            opacity: "1",
            transform: "translateY(0px)",
          },
          to: {
            opacity: "0",
            transform: "translateY(10px)",
          },
        },
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-out-up": {
          from: {
            opacity: "1",
            transform: "translateY(0px)",
          },
          to: {
            opacity: "0",
            transform: "translateY(10px)",
          },
        },
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
      flex: {
        0: "0 0 auto",
      },
      opacity: {
        12: "0.12",
        38: "0.38",
        87: "0.87",
      },
      rotate: {
        "-270": "270deg",
        15: "15deg",
        30: "30deg",
        60: "60deg",
        270: "270deg",
      },
      scale: {
        "-1": "-1",
      },
      zIndex: {
        "-1": -1,
        49: 49,
        60: 60,
        70: 70,
        80: 80,
        90: 90,
        99: 99,
        999: 999,
        9999: 9999,
        99999: 99999,
      },
      spacing: {
        13: "3.25rem",
        15: "3.75rem",
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem",
        50: "12.5rem",
        90: "22.5rem",
      },
      /**
       * Extended spacing values for width and height utilities.
       * This way, we won't be adding these to other utilities
       * that use 'spacing' config to keep the file size
       * smaller by not generating useless utilities such as
       * p-1/4 or m-480.
       */
      extendedSpacing: {
        // Fractional values
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",

        // Bigger values
        100: "25rem",
        120: "30rem",
        128: "32rem",
        140: "35rem",
        160: "40rem",
        180: "45rem",
        192: "48rem",
        200: "50rem",
        240: "60rem",
        256: "64rem",
        280: "70rem",
        320: "80rem",
        360: "90rem",
        400: "100rem",
        480: "120rem",
      },
      height: (theme) => ({
        ...theme("extendedSpacing"),
      }),
      minHeight: (theme) => ({
        ...theme("spacing"),
        ...theme("extendedSpacing"),
      }),
      maxHeight: (theme) => ({
        ...theme("extendedSpacing"),
        none: "none",
      }),
      width: (theme) => ({
        ...theme("extendedSpacing"),
      }),
      minWidth: (theme) => ({
        ...theme("spacing"),
        ...theme("extendedSpacing"),
        screen: "100vw",
      }),
      maxWidth: (theme) => ({
        ...theme("spacing"),
        ...theme("extendedSpacing"),
        screen: "100vw",
      }),
      transitionDuration: {
        400: "400ms",
      },
      transitionTimingFunction: {
        drawer: "cubic-bezier(0.25, 0.8, 0.25, 1)",
      },
      boxShadow: {
        custom: "0px 0px 50px 0px rgb(82 63 105 / 15%)",
      },
      colors: {
        primary: {
          50:"#e6f1fc",
          100:"#daeafa",
          200:"#b2d3f5",
          300:"#0771de", // main
          400:"#0666c8",
          500:"#065ab2",
          600:"#0555a7",
          700:"#044485",
          800:"#033364",
          900:"#02284e",
          'slideAuth':"#4788F3",
        },
        black: {
          50:"#eaeaec",
          100:"#dfe0e2",
          200:"#bdbfc3",
          300:"#2a2f3d",
          400:"#262a37",
          500:"#222631",
          600:"#20232e",
          700:"#191c25",
          800:"#13151b",
          800:"#0f1015",
        },
        slideContent:'rgba(183, 233, 246, 0.2509803922)',
        dangerDark:'#B00020',
        neutralMeduim:'#6E7489',
        lemon:'#FFB240',
        lemonLight:'#FFF2D2',
        yellowLight:'#ECDECC',
        green:'#009262',
        greenLight:'#BBD278'
      },
    },
    fontFamily: {
      Omnes: ["Omnes Arabic"],
      nunito: ["Nunito Sans", "sans-serif"],
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    scrollbar: ["dark", "rounded"],
  },

  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/container-queries"),
    require("tailwind-scrollbar"),
    require('preline/plugin'),
    "prettier-plugin-tailwindcss",
    ...(process.env.NODE_ENV === "production" ? [require("cssnano")()] : []),
  ],
  corePlugins: {
    appearance: false,
    gradientColorStops: false,
    container: false,
    float: false,
    clear: false,
    placeholderColor: false,
    placeholderOpacity: false,
    verticalAlign: false,
  },
};
