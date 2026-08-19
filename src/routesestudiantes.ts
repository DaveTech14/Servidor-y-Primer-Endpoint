import { Router, type Request, type Response } from 'express';

const router = Router();

// Interface Estudiante y almacenamiento en memoria
interface Estudiante {
  id: number;
  nombre: string;
  email: string;
  bootcamp: string;
}

const estudiantes: Estudiante[] = [];
let contadorId = 1;

// GET lista completa o filtrada

router.get('/', (req: Request, res: Response) => {
  const { bootcamp } = req.query;

  if (bootcamp) {
    const filtrados = estudiantes.filter(
      (e) => e.bootcamp.toLowerCase() === String(bootcamp).toLowerCase()
    );
    return res.json(filtrados);
  }

  return res.json(estudiantes);
});

// GET id  Obtener un estudiante específico por identificador
router.get('/:id', (req: Request, res: Response) => {
  const idParam = Number(req.params.id);
  const estudiante = estudiantes.find((e) => e.id === idParam);

  if (!estudiante) {
    return res.status(404).json({ error: 'Estudiante no encontrado.' });
  }

  return res.json(estudiante);
});

// POST Crea un estudiante con id autogenerado

router.post('/', (req: Request, res: Response) => {
  const { nombre, email, bootcamp } = req.body;

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

// PUT Actualiza un estudiante existente por id

router.put('/:id', (req: Request, res: Response) => {
  const idParam = Number(req.params.id);
  const estudiante = estudiantes.find((e) => e.id === idParam);

  if (!estudiante) {
    return res.status(404).json({ error: 'Estudiante no encontrado.' });
  }

  const { nombre, email, bootcamp } = req.body;

  if (nombre !== undefined) estudiante.nombre = nombre;
  if (email !== undefined) estudiante.email = email;
  if (bootcamp !== undefined) estudiante.bootcamp = bootcamp;

  return res.json(estudiante);
});

// DELETE Elimina un estudiante del arreglo por id

router.delete('/:id', (req: Request, res: Response) => {
  const idParam = Number(req.params.id);
  const index = estudiantes.findIndex((e) => e.id === idParam);

  if (index === -1) {
    return res.status(404).json({ error: 'Estudiante no encontrado.' });
  }

  const [estudianteEliminado] = estudiantes.splice(index, 1);
  return res.json({
    mensaje: 'Estudiante eliminado con éxito',
    estudiante: estudianteEliminado
  });
});

export default router;