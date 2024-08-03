"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Role, { foreignKey: "roleId" });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Kolom nama lengkap harus diisi",
          },
          notNull: {
            msg: "Kolom nama lengkap harus diisi",
          },
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          name: "unique_user_username",
          msg: "Nama pengguna sudah digunakan",
        },
        validate: {
          notNull: {
            msg: "Kolom nama pengguna harus diisi",
          },
          notEmpty: {
            msg: "Kolom nama pengguna harus diisi",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          name: "unique_user_email",
          msg: "Email ini sudah digunakan",
        },
        validate: {
          notNull: {
            msg: "Kolom email harus diisi",
          },
          notEmpty: {
            msg: "Kolom email harus diisi",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Kolom password harus diisi",
          },
          notNull: {
            msg: "Kolom password harus diisi",
          },
        },
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Pengguna harus memiliki role pengguna",
          },
          notNull: {
            msg: "Pengguna harus memiliki role pengguna",
          },
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Kolom nomor telepon harus diisi",
          },
          notNull: {
            msg: "Kolom nomor telepon harus diisi",
          },
        },
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Kolom alamat pengguna harus diisi",
          },
          notNull: {
            msg: "Kolom alamat pengguna harus diisi",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
