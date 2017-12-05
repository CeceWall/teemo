const path = require('path')

module.exports = {
  "extends": "airbnb",
  "settings": {
    "import/resolver": {
      "webpack": {
        config: {
          resolve: {
            extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
            alias: {
              '@': path.resolve(__dirname, 'src/components'),
              'src': path.resolve(__dirname, 'src'),
            }
          }
        }
      }
    }
  },
  "parser": "babel-eslint",
  "plugins": [
    "react"
  ],
  "env": {
    "browser": true
  },
  rules: {
    "jsx-a11y/anchor-is-valid": ["error", {
      "specialLink": ["hrefLeft", "hrefRight"],
      "aspects": ["noHref", "preferButton"]
    }]
  }
};





