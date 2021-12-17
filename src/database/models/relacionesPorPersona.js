module.exports = (sequelize, dataTypes) => {

    let alias = "Relaciones_por_persona"

    let cols = {
        fk_personas_id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            primaryKey: true
        },
        fk_relaciones_id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            primaryKey: true
        },

    }

    let config = {
        tableName: "relaciones_por_persona",
        timestamps: false,
        underscored: false
    }


    const Relaciones_por_persona = sequelize.define(alias, cols, config);


    return Relaciones_por_persona
}