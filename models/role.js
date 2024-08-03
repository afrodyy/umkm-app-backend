"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Role.hasMany(models.User, { foreignKey: "roleId" });
    }
  }
  Role.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          name: "unique_role_name",
          msg: "Nama role sudah ada.",
        },
        validate: {
          notEmpty: {
            msg: "Kolom nama role harus diisi",
          },
          notNull: {
            msg: "Kolom nama role harus diisi",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Kolom deskripsi role harus diisi",
          },
          notNull: {
            msg: "Kolom deskripsi role harus diisi",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Role",
    }
  );
  return Role;
};
