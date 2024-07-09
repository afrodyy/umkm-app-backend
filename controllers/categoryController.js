const { Category, sequelize } = require("../models");

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll();

    if (categories.length < 1) {
      return res.status(200).json({
        status: true,
        message: "Data kategori menu kosong",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Menampilkan seluruh data kategori menu",
      data: categories,
    });
  } catch (error) {
    console.log(error);
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (category === null) {
      return res.status(404).json({
        status: false,
        message: "Data kategori tidak ditemukan",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Detil data kategori",
      data: category,
    });
  } catch (error) {
    console.log(error);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    const newCategory = await Category.create({
      name: name,
      description: description,
    });

    if (newCategory) {
      return res.status(201).json({
        status: true,
        message: "Kategori makanan berhasil diinput",
        data: newCategory,
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

const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (category === null) {
      return res.status(404).json({
        status: false,
        message: "Data kategori tidak ditemukan",
      });
    }

    const { name, description } = req.body;

    category.name = name;
    category.description = description;

    await category.validate();
    await category.save();

    return res.status(200).json({
      status: true,
      message: "Berhasil memperbarui data kategori",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.name,
      data: error.errors,
    });
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (category === null) {
      return res.status(404).json({
        status: false,
        message: "Data kategori tidak ditemukan",
      });
    }

    await category.destroy();

    return res.status(200).json({
      status: true,
      message: "Berhasil menghapus data kategori",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.name,
      data: error.errors,
    });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
