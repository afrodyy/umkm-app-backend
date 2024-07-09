"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Menu.belongsTo(models.Category, {
        foreignKey: "category_id",
        as: "category",
        onDelete: "CASCADE",
      });
    }
  }
  Menu.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          name: "unique_menu_name",
          msg: "Nama menu sudah ada.",
        },
        validate: {
          notEmpty: {
            msg: "Kolom nama menu harus diisi",
          },
          notNull: {
            msg: "Kolom nama menu harus diisi",
          },
        },
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Menu harus memiliki ID Kategori",
          },
          notNull: {
            msg: "Menu harus memiliki ID Kategori",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Kolom deskripsi harus diisi",
          },
          notNull: {
            msg: "Kolom deskripsi harus diisi",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Menu harus memiliki harga",
          },
          notNull: {
            msg: "Menu harus memiliki harga",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Menu",
    }
  );
  return Menu;
};
