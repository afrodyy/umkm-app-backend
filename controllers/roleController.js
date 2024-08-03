const { Role, sequelize } = require("../models");

const getAllRole = async (req, res, next) => {
  try {
    const role = await Role.findAll();

    if (role.length < 1) {
      return res.status(200).json({
        status: true,
        message: "Data role pengguna saat ini kosong",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Menampilkan seluruh data role pengguna",
      data: role,
    });
  } catch (error) {
    console.log(error);
  }
};

const getRoleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id);

    if (role === null) {
      return res.status(404).json({
        status: false,
        message: "Data role pengguna tidak ditemukan",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Menampilkan data role pengguna berdasarkan ID",
      data: role,
    });
  } catch (error) {
    console.log(error);
  }
};

const createRole = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    const newRole = await Role.create({
      name: name,
      description: description,
    });

    if (newRole) {
      return res.status(201).json({
        status: true,
        message: "Berhasil tambah data role pengguna",
        data: newRole,
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

const updateRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id);

    console.log(role);

    if (role === null) {
      return res.status(404).json({
        status: false,
        message: "Data role tidak ditemukan",
      });
    }

    const { name, description } = req.body;

    role.name = name;
    role.description = description;

    await role.validate();
    await role.save();

    return res.status(200).json({
      status: true,
      message: "Data role user berhasil diperbarui",
      data: role,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message:
        error.name || "Terjadi kesalahan saat memperbarui data user role",
      data: error.errors || [],
    });
  }
};

const deleteRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id);

    if (role === null) {
      return res.status(404).json({
        status: false,
        message: "Data user role tidak ditemukan",
      });
    }

    await role.destroy();

    return res.status(200).json({
      status: true,
      message: "Data user role berhasil dihapus",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllRole,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
};
