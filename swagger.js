const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0'});

const doc = {
  info: {
    version: '1.0.0',
    title: 'REST API',
    description: ''
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: ''
    },
  ],
  tags: [
    {
      name: '',
      description: ''
    },
  ],
  components: {
    securitySchemes:{
      bearerAuth: {
        type: 'http',
        scheme: 'bearer'
      }
    }
  }
};

const outputFile = './swagger-output.json';
const routes = ['./index.js'];

swaggerAutogen(outputFile, routes, doc).then(() => {
    require('./index')
}

);