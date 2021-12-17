module.exports = (sequelize, dataTypes) => {

    let alias = "Pais"

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
        }

    }

    let config = {
        tableName: "pais",
        timestamps: false,
        underscored: false
    }


    const Pais = sequelize.define(alias, cols, config);


    Pais.associate = function (models) {

        Pais.hasMany(models.Personas, {
            as: "pais",
            foreignKey: "fk_pais_id"
        })
    }
    
    return Pais
}