module.exports = (sequelize, dataTypes) => {

    let alias = "Personas"

    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        nombre: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        apellido: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        documento: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        sexo: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        edad: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        contacto: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        fk_pais_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        fk_tipo_de_documento_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },

    }

    let config = {
        tableName: "personas",
        timestamps: false,
        underscored: false
    }


    const Personas = sequelize.define(alias, cols, config);


    Personas.associate = function (models) {

        Personas.belongsTo(models.Pais, {
                as: "pais",
                foreignKey: "fk_pais_id"
        })
        
        Personas.belongsTo(models.Tipo_de_documento, {
                as: "tipoDeDocumento",
                foreignKey: "fk_tipo_de_documento_id"
        }),
        Personas.belongsToMany(models.Relaciones, {
                as: 'relaciones',
                through: 'Relaciones_por_persona',
                foreignKey: 'fk_personas_id',//la clave foranea de este modelo en esa tabla intermedia
                otherKey: 'fk_relaciones_id'//la otra clave foranea del otro modelo en cuestion en esa tabla intermedia
        });
    }

    return Personas
}