const db = require('../database/models');

const { validationResult, body } = require('express-validator');

const personas = {
    getPersonas: function (req, res) {
        db.Personas.findAll({
            include: [
                { association: "tipoDeDocumento" },
                { association: "pais" },
            ]
        })
            .then(function (persona) {
                persona.length > 0 ? res.send(persona) : res.send({ msg: 'no hay ninguna persona' });
            })
            .catch(errores => {
                console.log(errores)
                res.send({ msg: 'Lo sentimos, ha ocurrido un error' })
            })

    },
    crearPersona: function (req, res) {

        let errors = validationResult(req)

        if (errors.isEmpty()) {
            db.Personas.create({
                nombre: req.body.nombre.trim(),
                apellido: req.body.apellido.trim(),
                documento: Number(req.body.documento),
                sexo: req.body.sexo.trim(),
                edad: Number(req.body.edad),
                fk_pais_id: Number(req.body.pais),
                fk_tipo_de_documento_id: Number(req.body.tipo_de_documento),
                contacto: req.body.contacto.trim()
            })
                .then(result => {
                    console.log(result)
                    res.send({ msg: 'Persona creada con éxito!' })
                })
                .catch(errores => {
                    console.log(errores)
                    res.send({ msg: 'Lo sentimos, ha ocurrido un error' })
                })
        } else {
            return res.send(errors)
        }
    },
    editarPersona: function (req, res) {
        let errors = validationResult(req)

        if (errors.isEmpty()) {
            db.Personas.update({
                nombre: req.body.nombre.trim(),
                apellido: req.body.apellido.trim(),
                documento: Number(req.body.documento),
                sexo: req.body.sexo.trim(),
                edad: Number(req.body.edad),
                fk_pais_id: Number(req.body.pais),
                fk_tipo_de_documento_id: Number(req.body.tipo_de_documento),
                contacto: req.body.contacto
            }, {
                where: {
                    id: req.params.id
                }
            })
                .then(result => {
                    console.log(result)
                    res.send({ msg: 'Los datos de guardaron correctamente' })
                })

                .catch(errores => {
                    console.log(errores)
                    res.send({ msg: 'Lo sentimos, ha ocurrido un error' })
                })
        } else {
            return res.send(errors)
        }

    },
    borrarPersona: function (req, res) {
        db.Personas.destroy({
            where: {
                id: req.params.id
            }
        })
        res.send({ msg: 'Datos eliminados con exito!' })

            .catch(errores => {
                console.log(errores)
                res.send({ msg: 'Lo sentimos, ha ocurrido un error' })
            })
    },
    crearRelacion: function (req, res) {

        let id1 = req.params.id1;

        let id2 = req.params.id2;

        let tipoRelacion = req.params.relacion.toUpperCase();

        let tipos = db.Tipo_de_relacion.findAll()

        let relacionExiste = db.Relaciones.findOne({
            where: {
                id: id1
            }
        })

        Promise.all([tipos, relacionExiste])

            .then(function ([tipos, relacionExiste]) {

                console.log(relacionExiste)

                let tipoId = []

                tipos.forEach(relacion => relacion.tipo_de_relacion == tipoRelacion ? tipoId.push(relacion.id) : false);

                if (relacionExiste) {
                    db.Relaciones.update({
                        id: id1,
                        persona_relacionada: id2,
                        fk_tipo_de_relacion_id: tipoId,
                    }, {
                        where: {
                            id: relacionExiste.id
                        }
                    })
                        .then(result => {
                            console.log(result)
                            res.send({ msg: 'La relacion se actualizó correctamente' })
                        })
                        .catch(errores => {
                            console.log(errores)
                            res.send({ msg: 'Lo sentimos, ha ocurrido un error' })
                        })
                } else {
                    db.Relaciones.create({
                        id: id1,
                        persona_relacionada: id2,
                        fk_tipo_de_relacion_id: tipoId,
                    })

                        .then(result => {
                            console.log(result)
                            res.send({ msg: 'La relacion se creó correctamente' })
                        })
                        .catch(errores => {
                            console.log(errores)
                            res.send({ msg: 'Lo sentimos, ha ocurrido un error' })
                        })
                }

            })
            .catch(errores => {
                console.log(errores)
                res.send({ msg: 'Lo sentimos, ha ocurrido un error' })
            })
    },
    getRelacion: function (req, res) {
        let personas = db.Personas.findAll()

        let relacion = db.Relaciones.findOne({
            where: {
                id: req.params.id1,
                persona_relacionada: req.params.id2
            },
            include: [
                { association: 'tipoDeRelacion' }
            ]
        })

        Promise.all([personas, relacion])

            .then(function ([personas, relacion]) {

                let persona1 = personas.filter(persona => persona.id == req.params.id1)
                let persona2 = personas.filter(persona => persona.id == req.params.id2)

                //IF
                relacion ? res.send([
                    `Persona:${persona1[0].nombre} ${persona1[0].apellido}`,
                    `Persona relacionada:${persona2[0].nombre} ${persona2[0].apellido}`,
                    'Tipo de relacion:' + relacion.tipoDeRelacion.tipo_de_relacion
                ]) :
                    res.send({ msg: 'no existe ninguna relacion' })
            })
            .catch(errores => {
                console.log(errores)
                res.send({ msg: 'Lo sentimos, ha ocurrido un error' })
            })

    },
    getEstadisticas: function (req, res) {
        db.Personas.findAll({
            include: [
                { association: 'pais' }
            ]
        })

            .then(function (personasTotales) {

                let hombres = personasTotales.filter(persona => persona.sexo == 'hombre')

                let mujeres = personasTotales.filter(persona => persona.sexo == 'mujer')

                let argentinosTotales = personasTotales.filter(persona => persona.pais.nombre == 'argentina')

                let porcentajeArgentinos = argentinosTotales.length * 100 / personasTotales.length

                res.send([
                    `cantidad_mujeres:${mujeres.length}`,
                    `cantidad_hombres:${hombres.length}`,
                    `personas_totales:${personasTotales.length}`,
                    `porcentaje_argentinos:${Math.round(porcentajeArgentinos)}%`,

                ])
            })
            .catch(errores => {
                console.log(errores)
                res.send({ msg: 'Lo sentimos, ha ocurrido un error' })
            })
    },
}

module.exports = personas