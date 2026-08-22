import express, { type Request, type Response } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import fs from 'node:fs';
import path from 'node:path';
import estudiantesRouter from './routesestudiantes.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

// Middleware global para CORS y JSON
app.use(cors());
app.use(express.json());

// Carga de Swagger UI
const swaggerPath = path.resolve(process.cwd(), 'swagger_output.json');

if (fs.existsSync(swaggerPath)) {
  const swaggerOutput = JSON.parse(fs.readFileSync(swaggerPath, 'utf-8'));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));
} else {
  console.warn('⚠️ Advertencia: swagger_output.json no se encontró. Ejecuta "npm run swagger" primero.');
}

app.get('/api/status', (_req: Request, res: Response) => {
  res.json({
    status: 'Servidor David Salinas en el ESPACIO!!',
    version: '1.0.0'
  });
});

// Ruta base correcta para los estudiantes
app.use('/api/estudiantes', estudiantesRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Swagger disponible en http://localhost:${PORT}/api-docs`);
});