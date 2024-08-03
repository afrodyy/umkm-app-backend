const { User, Role, sequelize } = require("../models");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: {
        model: Role,
        as: "role",
      },
    });

    if (users.length < 1) {
      return res.status(200).json({
        status: true,
        message: "Data pengguna saat ini kosong",
      });
    }

    const usersWithImageURL = users.map((user) => ({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      password: user.password,
      roleId: user.roleId,
      phone: user.phone,
      address: user.address,
      image: user.image ? `http://localhost:3030/${user.image}` : null,
      role: {
        id: user.role.id,
        name: user.role.name,
      },
    }));

    return res.status(200).json({
      status: true,
      message: "Menampilkan seluruh data pengguna",
      data: usersWithImageURL,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.name,
      data: error.errors,
    });
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      include: {
        model: Role,
        as: "role",
      },
    });

    if (user === null) {
      return res.status(404).json({
        status: false,
        message: "Data pengguna tidak ditemukan",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Detil data pengguna",
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { name, username, email, password, roleId, phone, address } =
      req.body;
    const image = req.file
      ? `images/user/${req.file.filename}`
      : "images/user/user.png";

    // Hash the password with a salt
    const saltRounds = 10; // You can adjust the number of salt rounds as needed
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      name: name,
      username: username,
      email: email,
      password: hashedPassword,
      roleId: roleId,
      phone: phone,
      address: address,
      image: image,
    });

    if (newUser) {
      return res.status(201).json({
        status: true,
        message: "Berhasil membuat pengguna baru",
        data: newUser,
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

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (user === null) {
      return res.status(404).json({
        status: false,
        message: "Data pengguna tidak ditemukan",
      });
    }

    const { name, username, email, password, roleId, phone, address } =
      req.body;
    let image = user.image;

    if (req.file) {
      image = `images/user/${req.file.filename}`;
    }

    // Hash the password with a salt
    const saltRounds = 10; // You can adjust the number of salt rounds as needed
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    user.name = name;
    user.username = username;
    user.email = email;
    user.password = hashedPassword;
    user.roleId = roleId;
    user.phone = phone;
    user.address = address;
    user.image = image;

    await user.validate();
    await user.save();

    return res.status(200).json({
      status: true,
      message: "Berhasil memperbarui data pengguna",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.name,
      data: error.errors,
    });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (user === null) {
      return res.status(404).json({
        status: false,
        message: "Data pengguna tidak ditemukan",
      });
    }

    await user.destroy();

    if (imagePath) {
      const imagePathToDelete = path.join(__dirname, "../public/", imagePath);

      if (fs.existsSync(imagePathToDelete)) {
        fs.unlinkSync(imagePathToDelete);
      }
    }

    return res.status(200).json({
      status: true,
      message: "Berhasil menghapus data pengguna",
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
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
