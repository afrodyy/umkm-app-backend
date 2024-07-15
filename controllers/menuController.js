const { Menu, Category, sequelize } = require("../models");
const fs = require("fs");
const path = require("path");

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

    const menusWithImageURL = menus.map((menu) => ({
      id: menu.id,
      name: menu.name,
      category_id: menu.category_id,
      description: menu.description,
      price: menu.price,
      image: menu.image ? `http://localhost:3030/${menu.image}` : null,
      category: {
        id: menu.category.id,
        name: menu.category.name,
      },
    }));

    return res.status(200).json({
      status: true,
      message: "Menampilkan seluruh data menu",
      data: menusWithImageURL,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Terjadi kesalahan dalam mengambil data menu",
      data: error,
    });
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
    const image = req.file ? `images/${req.file.filename}` : null;

    const newMenu = await Menu.create({
      name: name,
      category_id: category_id,
      description: description,
      price: price,
      image: image,
    });

    if (newMenu) {
      return res.status(201).json({
        status: true,
        message: "Berhasil tambah data menu baru",
        data: newMenu,
      });
    }
  } catch (error) {
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
    let image = menu.image;

    if (req.file) {
      image = `images/${req.file.filename}`;
    }
    console.log(image);

    menu.name = name;
    menu.category_id = category_id;
    menu.description = description;
    menu.price = price;
    menu.image = image;

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
      message: error.message || "Terjadi kesalahan saat memperbarui data menu",
      data: error.errors || [],
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

    const imagePath = menu.image;

    await menu.destroy();

    if (imagePath) {
      const imagePathToDelete = path.join(__dirname, "../public/", imagePath);

      if (fs.existsSync(imagePathToDelete)) {
        fs.unlinkSync(imagePathToDelete);
      }
    }

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
