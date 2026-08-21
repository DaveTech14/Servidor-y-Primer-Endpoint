import swaggerAutogen from 'swagger-autogen';
import path from 'node:path';

const doc = {
  info: {
    title: 'API de Inscripciones Académicas',
    description: 'Documentación de la API REST',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

// Forzar la ruta absoluta a la raíz del proyecto
const outputFile = path.resolve(process.cwd(), 'swagger_output.json');
const routes = [
  path.resolve(process.cwd(), 'src/index.ts'),
  path.resolve(process.cwd(), 'src/routesestudiantes.ts')
];

console.log('🔄 Generando documentación de Swagger...');

swaggerAutogen({ openapi: '3.0.0' })(outputFile, routes, doc).then(() => {
  console.log('✅ Archivo swagger_output.json creado exitosamente en:', outputFile);
}).catch((err) => {
  console.error('❌ Error al generar Swagger:', err);
});