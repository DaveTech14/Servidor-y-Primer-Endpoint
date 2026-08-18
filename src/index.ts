import express, { type Request, type Response } from 'express';


const app = express();
const PORT = 3000;

// ---------------------------------------------------------
// 1. Middleware global
// ---------------------------------------------------------
// Configura express.json() antes de cualquier ruta para poder leer req.body
app.use(express.json());

// ---------------------------------------------------------
// 2. Ruta de verificación de estado
// ---------------------------------------------------------
app.get('/api/status', (_req: Request, res: Response) => {
  res.json({
    status: 'Servidor en línea',
    version: '1.0.0'
  });
});

// ---------------------------------------------------------
// 3. Interface Estudiante y almacenamiento en memoria
// ---------------------------------------------------------
interface Estudiante {
  id: number;
  nombre: string;
  email: string;
  bootcamp: string;
}

const estudiantes: Estudiante[] = [];
let contadorId = 1;

// ---------------------------------------------------------
// 4. Endpoints CRUD para /api/estudiantes
// ---------------------------------------------------------

// GET /api/estudiantes — Retorna la lista completa
app.get('/api/estudiantes', (_req: Request, res: Response) => {
  res.json(estudiantes);
});

// POST /api/estudiantes — Crea un estudiante con ID autogenerado
app.post('/api/estudiantes', (req: Request, res: Response) => {
  const { nombre, email, bootcamp } = req.body;

  // Validación: Responder con 400 si el email no está presente
  if (!email) {
    return res.status(400).json({ error: 'El campo "email" es obligatorio.' });
  }

  const nuevoEstudiante: Estudiante = {
    id: contadorId++,
    nombre,
    email,
    bootcamp
  };

  estudiantes.push(nuevoEstudiante);
  return res.status(201).json(nuevoEstudiante);
});

// PUT /api/estudiantes/:id — Actualiza un estudiante existente por ID
app.put('/api/estudiantes/:id', (req: Request, res: Response) => {
  const idParam = Number(req.params.id);
  const estudiante = estudiantes.find((e) => e.id === idParam);

  // Responder con 404 si el ID no existe
  if (!estudiante) {
    return res.status(404).json({ error: 'Estudiante no encontrado.' });
  }

  const { nombre, email, bootcamp } = req.body;

  // Actualizar únicamente los campos que hayan sido enviados en el body
  if (nombre !== undefined) estudiante.nombre = nombre;
  if (email !== undefined) estudiante.email = email;
  if (bootcamp !== undefined) estudiante.bootcamp = bootcamp;

  return res.json(estudiante);
});

// DELETE /api/estudiantes/:id — Elimina un estudiante del arreglo por ID
app.delete('/api/estudiantes/:id', (req: Request, res: Response) => {
  const idParam = Number(req.params.id);
  const index = estudiantes.findIndex((e) => e.id === idParam);

  // Responder con 404 si el ID no existe
  if (index === -1) {
    return res.status(404).json({ error: 'Estudiante no encontrado.' });
  }

  const [estudianteEliminado] = estudiantes.splice(index, 1);
  return res.json({
    mensaje: 'Estudiante eliminado con éxito',
    estudiante: estudianteEliminado
  });
});

// ---------------------------------------------------------
// 5. Inicio del Servidor
// ---------------------------------------------------------
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});