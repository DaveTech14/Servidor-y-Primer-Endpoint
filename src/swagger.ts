import swaggerAutogen from 'swagger-autogen';
import path from 'node:path';

const doc = {
  info: {
    title: 'API de Inscripciones Académicas',
    description: 'Documentación de la API REST',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:3000/api/estudiantes',
      description: 'Servidor Local - Estudiantes',
    },
  ],
};

const outputFile = path.resolve(process.cwd(), 'swagger_output.json');
const endpointsFiles = [
  path.resolve(process.cwd(), 'src/routesestudiantes.ts')
];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);