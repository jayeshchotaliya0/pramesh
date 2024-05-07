// environment.js

// Import the dotenv package and load the .env file for local development
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }
  
const getEnvironment = () => {
    const env = process.env.NODE_ENV || 'development';
    const environments = {
      development: {
        apiUrl: process.env.REACT_APP_API_URL || 'http://localhost/pramesh/backend/api',
        fullPath :  'http://localhost:3000'
      },
      production: {
        apiUrl: process.env.REACT_APP_API_URL || 'https://prameshsilks.com/backend/api',
        fullPath :  'https://prameshsilks.com'
      },
    };
  
    return environments[env];
}
  export default getEnvironment;