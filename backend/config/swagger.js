const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Travel Booking API',
      version: '1.0.0',
      description: 'API documentation for Travel Booking System',
      contact: {
        name: 'API Support',
        email: 'support@travelbooking.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ['./routes/*.js', './models/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
