// tailwind.config.js

module.exports = {
  content: [
      './resources/**/*.blade.php',
      './resources/**/*.jsx',
  ],
  theme: {
      extend: {},
  },
  plugins: [
    require('daisyui')
  ],
};
