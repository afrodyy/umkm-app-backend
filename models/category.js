"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.hasMany(models.Menu, {
        foreignKey: "category_id",
        as: "menus",
        onDelete: "CASCADE",
        hooks: true,
      });
    }
  }
  Category.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          name: "unique_category_name",
          msg: "Nama kategori sudah ada.",
        },
        validate: {
          notEmpty: {
            msg: "Nama kategori harus diisi",
          },
          notNull: {
            msg: "Nama kategori harus diisi",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Deskripsi kategori harus diisi",
          },
          notNull: {
            msg: "Deskripsi kategori harus diisi",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
