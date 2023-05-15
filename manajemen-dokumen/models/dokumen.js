"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class dokumen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  dokumen.init(
    {
      id_dokumen: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      judul_dokumen: DataTypes.STRING,
      nama_pengunggah: DataTypes.INTEGER,
      deskripsi: DataTypes.TEXT,
      filenya: DataTypes.STRING,
      tgl_upload: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "dokumen",
      tableName: "dokumen",
    }
  );
  return dokumen;
};
