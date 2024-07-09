const { Menu, Category, sequelize } = require("../models");

const getAllMenus = async (req, res, next) => {
  try {
    const menus = await Menu.findAll({
      include: [
        {
          model: Category,
          as: "category",
        },
      ],
    });

    if (menus.length < 1) {
      return res.status(200).json({
        status: true,
        message: "Data menu saat ini kosong",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Menampilkan seluruh data menu",
      data: menus,
    });
  } catch (error) {
    console.log(error);
  }
};

const getMenuById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const menu = await Menu.findByPk(id);

    if (menu === null) {
      return res.status(404).json({
        status: false,
        message: "Data menu tidak ditemukan",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Detil data menu",
      data: menu,
    });
  } catch (error) {
    console.log(error);
  }
};

const createMenu = async (req, res, next) => {
  try {
    const { name, category_id, description, price } = req.body;
    const newMenu = await Menu.create({
      name: name,
      category_id: category_id,
      description: description,
      price: price,
    });

    if (newMenu) {
      return res.status(201).json({
        status: true,
        message: "Berhasil tambah data menu baru",
        data: newMenu,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: error.name,
      data: error.errors,
    });
  }
};

const updateMenu = async (req, res, next) => {
  try {
    const { id } = req.params;
    const menu = await Menu.findByPk(id);

    if (menu === null) {
      return res.status(404).json({
        status: false,
        message: "Data menu tidak ditemukan",
      });
    }

    const { name, category_id, description, price } = req.body;

    menu.name = name;
    menu.category_id = category_id;
    menu.description = description;
    menu.price = price;

    await menu.validate();
    await menu.save();

    return res.status(200).json({
      status: true,
      message: "Berhasil memperbarui data menu",
      data: menu,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.name,
      data: error.errors,
    });
  }
};

const deleteMenu = async (req, res, next) => {
  try {
    const { id } = req.params;
    const menu = await Menu.findByPk(id);

    if (menu === null) {
      return res.status(404).json({
        status: false,
        message: "Data menu tidak ditemukan",
      });
    }

    await menu.destroy();

    return res.status(200).json({
      status: true,
      message: "Data menu berhasil dihapus",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllMenus,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu,
};
