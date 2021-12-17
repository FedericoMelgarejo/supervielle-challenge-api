module.exports = (sequelize, dataTypes) => {

    let alias = "Relaciones"

    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        persona_relacionada: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            allowNull: true,
        },
        fk_tipo_de_relacion_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },

    }

    let config = {
        tableName: "relaciones",
        timestamps: false,
        underscored: false
    }


    const Relaciones = sequelize.define(alias, cols, config);


    Relaciones.associate = function (models) {

        Relaciones.belongsTo(models.Tipo_de_relacion, {
            as: "tipoDeRelacion",
            foreignKey: "fk_tipo_de_relacion_id"
        })
    }

    return Relaciones
}