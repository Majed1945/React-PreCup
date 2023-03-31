/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "login-image": "url('/src/Assets/Login_Logo.png')",
        "register-image": "url('/src/Assets/Register_Logo.png')",
        bgColor:
          "linear-gradient(-65deg, var(--background) 50%, var(--background-light) 50%)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
