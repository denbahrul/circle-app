const swaggerAutogen = require("swagger-autogen")({
  openapi: "3.0.0",
  // autoHeaders: false,
});

const doc = {
  info: {
    title: "CIRCLE API",
    description: "API Documentation for Circle App",
  },
  servers: [{ url: "localhost:3000/" }, { url: "https://circle-app-be-stagging.vercel.app/" }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
    "@schemas": {
      registerSchema: {
        type: "object",
        properties: {
          fullname: {
            type: "string",
          },
          email: {
            type: "string",
            format: "email",
          },
          password: {
            type: "string",
            format: "password",
          },
        },
      },
      loginSchema: {
        type: "object",
        properties: {
          email: {
            type: "string",
            format: "email",
          },
          password: {
            type: "string",
            format: "password",
          },
        },
      },
      profileEditSchema: {
        type: "object",
        properties: {
          fullname: {
            type: "string",
          },
          username: {
            type: "string",
          },
          bio: {
            type: "string",
          },
          profilePhoto: {
            type: "string",
            format: "binary",
          },
        },
      },
      createThreadSchema: {
        type: "object",
        properties: {
          content: {
            type: "string",
          },
          image: {
            type: "string",
            format: "binary",
          },
        },
      },
      createReplySchema: {
        type: "object",
        properties: {
          content: {
            type: "string",
          },
          image: {
            type: "string",
            format: "binary",
          },
        },
      },
      likeSchema: {
        type: "object",
        properties: {
          threadId: {
            type: "integer",
          },
        },
      },
      likeRepliesSchema: {
        type: "object",
        properties: {
          repliesId: {
            type: "integer",
          },
        },
      },
      followSchema: {
        type: "object",
        properties: {
          followingId: {
            type: "integer",
          },
        },
      },
    },
  },
};

const outputFile = "./swagger-output.json";
const routes = ["./src/index.ts"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
