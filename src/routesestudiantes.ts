import { Router, type Request, type Response } from 'express';

const router = Router();

interface Estudiante {
  id: number;
  nombre: string;
  email: string;
  bootcamp: string;
}

const estudiantes: Estudiante[] = [];
let contadorId = 1;

// GET - Obtener todos los estudiantes
router.get('/', (req: Request, res: Response) => {
  /* 
    #swagger.tags = ['Estudiantes']
    #swagger.summary = 'Obtener lista de estudiantes'
    #swagger.description = 'Retorna todos los estudiantes registrados o filtrados por bootcamp.'
    #swagger.parameters['bootcamp'] = {
      in: 'query',
      description: 'Filtrar estudiantes por nombre de bootcamp',
      type: 'string'
    }
  */
  const { bootcamp } = req.query;

  if (bootcamp) {
    const filtrados = estudiantes.filter(
      (e) => e.bootcamp.toLowerCase() === String(bootcamp).toLowerCase()
    );
    return res.json(filtrados);
  }

  return res.json(estudiantes);
});

// GET /:id - Obtener un estudiante por ID
router.get('/:id', (req: Request, res: Response) => {
  /* 
    #swagger.tags = ['Estudiantes']
    #swagger.summary = 'Obtener estudiante por ID'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID único del estudiante',
      required: true,
      type: 'integer'
    }
  */
  const idParam = Number(req.params.id);
  const estudiante = estudiantes.find((e) => e.id === idParam);

  if (!estudiante) {
    return res.status(404).json({ error: 'Estudiante no encontrado.' });
  }

  return res.json(estudiante);
});

// POST - Crear estudiante
router.post('/', (req: Request, res: Response) => {
  /* 
    #swagger.tags = ['Estudiantes']
    #swagger.summary = 'Registrar un nuevo estudiante'
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              nombre: { type: "string", example: "David Salinas" },
              email: { type: "string", example: "davosal@gmail.com" },
              bootcamp: { type: "string", example: "fullstackPERN" }
            },
            required: ["email"]
          }
        }
      }
    }
  */
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

// PUT /:id - Actualizar estudiante
router.put('/:id', (req: Request, res: Response) => {
  /* 
    #swagger.tags = ['Estudiantes']
    #swagger.summary = 'Actualizar datos de un estudiante'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID del estudiante a actualizar',
      required: true,
      type: 'integer'
    }
  */
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

// DELETE /:id - Eliminar estudiante
router.delete('/:id', (req: Request, res: Response) => {
  /* 
    #swagger.tags = ['Estudiantes']
    #swagger.summary = 'Eliminar un estudiante por ID'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID del estudiante a eliminar',
      required: true,
      type: 'integer'
    }
  */
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