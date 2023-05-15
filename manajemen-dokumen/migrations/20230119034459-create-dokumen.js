"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("dokumen", {
      id_dokumen: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      judul_dokumen: {
        type: Sequelize.STRING,
      },
      nama_pengunggah: {
        type: Sequelize.STRING,
      },
      deskripsi: {
        type: Sequelize.TEXT,
      },
      filenya: {
        type: Sequelize.STRING,
      },
      tgl_upload: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("dokumen");
  },
};
