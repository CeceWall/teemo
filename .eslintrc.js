const path = require('path')

module.exports = {
  "extends": "airbnb",
  "settings": {
    "import/resolver": {
      "webpack": {
        config: {
          resolve: {
            alias: {
              '@': path.resolve(__dirname, 'src/components'),
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
  }
};





