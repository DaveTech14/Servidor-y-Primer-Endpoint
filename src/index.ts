import express, { type Request, type Response } from 'express';
import estudiantesRouter from './routesestudiantes.js';

const app = express();
const PORT = 3000;

// Middleware global para procesar JSON
app.use(express.json());

// Ruta de verificación de estado
app.get('/api/status', (_req: Request, res: Response) => {
  res.json({
    status: 'Servidor David Salinas en el ESPACIO!!',
    version: '1.0.0'
  });
});

// Montar el router perfil de estudiantes
app.use('/api/estudiantes', estudiantesRouter);

// Inicio del Servidor

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});