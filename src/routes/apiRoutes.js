let express = require('express');
let router = express.Router();
const apiController = require('../controllers/apiController')
const fieldCreateValidator = require('../middlewares/fieldCreateValidator')
const fieldEditValidator = require('../middlewares/fieldEditValidator')


//---------------------------- HECHOS

router.get('/', function (req, res, next) {
  res.send("Bienvenido a api-supervielle!")
});

//OBTENER ESTADISTICAS GENERALES
router.get('/estadisticas',apiController.getEstadisticas);

//OBTENER TODAS LAS PERSONAS
router.get('/personas', apiController.getPersonas)

//CREAR PERSONA
router.post('/personas/crear',fieldCreateValidator, apiController.crearPersona)

//EDITAR PERSONA
router.put('/personas/editar/:id',fieldEditValidator, apiController.editarPersona)

//BORAR PERSONA
router.delete('/personas/borrar/:id', apiController.borrarPersona)

//CREAR RELACION ENTRE 2 PERSONAS ESPECIFICAS
router.post('/personas/:id1/:relacion/:id2', apiController.crearRelacion);

//OBTENER RELACION ENTRE 2 PERSONAS ESPECIFICAS
router.get('/relaciones/:id1/:id2', apiController.getRelacion)


//---------------------------- FALTAN





module.exports = router;
