"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn("Users", "image", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "images/user/user.png",
      validate: {
        notEmpty: {
          msg: "User harus memiliki gambar",
        },
        notNull: {
          msg: "User harus memiliki gambar",
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("Users", "image");
  },
};
