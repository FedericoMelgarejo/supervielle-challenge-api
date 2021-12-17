module.exports = (sequelize, dataTypes) => {

    let alias = "Tipo_de_relacion"

    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        tipo_de_relacion: {
            type: dataTypes.STRING(45),
            allowNull: false
        }

    }

    let config = {
        tableName: "tipo_de_relacion",
        timestamps: false,
        underscored: true
    }


    const Tipo_de_relacion = sequelize.define(alias, cols, config);


    return Tipo_de_relacion
}