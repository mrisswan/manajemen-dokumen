import React from "react";
import $ from "jquery";
import axios from "axios";
import Sidebar from "./Sidebar";
import FileDownload from "js-file-download";

export default class Dokumen extends React.Component {
  constructor() {
    super();
    this.state = {
      dokumen: [],
      id_dokumen: 0,
      judul_dokumen: "",
      nama_pengunggah: "",
      deskripsi: "",
      filenya: null,
      tgl_upload: "",
    };
    let user = JSON.parse(localStorage.getItem("user"));
    if (localStorage.getItem("token") && user.role == "admin") {
      this.state.token = localStorage.getItem("token");
    } else {
      window.location = "/";
    }
  }

  headerConfig = () => {
    let header = {
      headers: { Authorization: `Bearer ${this.state.token}` },
    };
    return header;
  };

  getDokumen = () => {
    let url = "http://localhost:4040/manajemen/dokumen";
    axios
      .get(url, this.headerConfig())
      .then((response) => {
        this.setState({ dokumen: response.data.data });
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status) {
            window.alert(error.response.data.message);
            window.location = "/";
          }
        } else {
          console.log(error);
        }
      });
  };

  Add = () => {
    $("#modal_dok").show();
    this.setState({
      id_dokumen: 0,
      judul_dokumen: "",
      nama_pengunggah: "",
      deskripsi: "",
      filenya: null,
      tgl_upload: "",
      action: "insert",
    });
  };
  Edit = (selectedItem) => {
    $("#modal_dok").show();
    this.setState({
      id_dokumen: selectedItem.id_dokumen,
      judul_dokumen: selectedItem.judul_dokumen,
      nama_pengunggah: selectedItem.nama_pengunggah,
      deskripsi: selectedItem.deskripsi,
      filenya: selectedItem.filenya,
      tgl_upload: selectedItem.tgl_upload,
      action: "update",
    });
  };
  saveDokumen = (event) => {
    event.preventDefault();
    $("#modal_dok").show();
    let form = new FormData();
    form.append("id_dokumen", this.state.id_dokumen);
    form.append("judul_dokumen", this.state.judul_dokumen);
    form.append("nama_pengunggah", this.state.nama_pengunggah);
    form.append("deskripsi", this.state.deskripsi);
    form.append("filenya", this.state.filenya);
    form.append("tgl_upload", this.state.tgl_upload);
    let url = "http://localhost:4040/manajemen/dokumen";
    if (this.state.action === "insert") {
      axios.post(url, form, this.headerConfig()).then((response) => {
        window.alert(response.data.message);
        window.location.reload();
        // this.getDokumen();
      });
    } else if (this.state.action === "update") {
      axios
        .put(url, form, this.headerConfig())
        .then((response) => {
          window.alert(response.data.message);
          window.location.reload();
        })
        .catch((error) => console.log(error));
    }
    $("#modal_dok").hide();
  };
  dropDokumen = (selectedItem) => {
    if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
      let url =
        "http://localhost:4040/manajemen/dokumen/" + selectedItem.id_dokumen;
      axios
        .delete(url, this.headerConfig())
        .then((response) => {
          window.alert(response.data.message);
          window.location.reload();
          // this.getDokumen();
        })
        .catch((error) => console.log(error));
    }
  };

  FileDownload = require("js-file-download");
  unduhDokumen = (selectedItem) => {
    axios({
      url: "http://localhost:4040/doc/" + selectedItem.filenya,
      method: "GET",
      responseType: "blob", // Important
    }).then((response) => {
      FileDownload(response.data, selectedItem.filenya);
    });
  };

  handleFile = (event) => {
    this.setState({
      filenya: event.target.files[0],
    });
  };

  bind = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  componentDidMount() {
    this.getDokumen();
  }
  close = () => {
    $("#modal_dok").hide();
  };

  render() {
    return (
      <div class="p-4 sm:ml-64">
        <Sidebar />
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            Daftar Dokumen
            <button
              className="hover:bg-green-500 float-right bg-green-600 text-white font-bold uppercase text-xs px-4 py-3 mb-2 rounded-md shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
              type="button"
              onClick={() => this.Add()}
            >
              Tambah Dokumen
            </button>
          </caption>
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Judul Dokumen
              </th>
              <th scope="col" class="px-6 py-3">
                Deskripsi
              </th>
              <th scope="col" class="px-6 py-3">
                Nama Pengunggah
              </th>
              <th scope="col" class="px-6 py-3">
                Tanggal Unggah
              </th>
              <th scope="col" class="px-6 py-3">
                <span class="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.dokumen.map((item) => (
              <tr
                class="bg-white border-b font-sans dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                key={item.id_dokumen}
              >
                <td class="px-6 py-4">{item.judul_dokumen}</td>
                <td class="px-6 py-4">{item.deskripsi}</td>
                <td class="px-6 py-4">{item.nama_pengunggah}</td>
                <td class="px-6 py-4">{item.tgl_upload}</td>
                <td class="px-6 py-4 text-center flex justify-evenly">
                  <a
                    href="#"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() => this.Edit(item)}
                  >
                    Edit
                  </a>
                  <a
                    href="#"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() => this.dropDokumen(item)}
                  >
                    Hapus
                  </a>
                  <a
                    href="#"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() => this.unduhDokumen(item)}
                  >
                    Unduh
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Modal */}
        <div
          id="modal_dok"
          tabindex="-1"
          aria-hidden="true"
          class="overflow-x-auto fixed top-0 left-0 right-0 z-50 hidden w-full p-4 md:inset-0 h-modal md:h-full bg-tranparent bg-black bg-opacity-50"
        >
          <div class="flex lg:h-auto w-auto justify-center ">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-1/3">
              <button
                type="button"
                class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                onClick={() => this.close()}
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="sr-only">Tutup modal</span>
              </button>
              <div class="px-6 py-6 lg:px-8">
                <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                  Dokumen
                </h3>
                <form
                  class="space-y-6"
                  onSubmit={(event) => this.saveDokumen(event)}
                >
                  <div>
                    <label
                      for="judul_dokumen"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Nama Dokumen
                    </label>
                    <input
                      type="text"
                      name="judul_dokumen"
                      id="judul_dokumen"
                      value={this.state.judul_dokumen}
                      onChange={this.bind}
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Masukkan nama Dokumen"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="deskripsi"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Deskripsi
                    </label>
                    <input
                      type="text"
                      name="deskripsi"
                      id="deskripsi"
                      value={this.state.deskripsi}
                      onChange={this.bind}
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Masukkan deskripsi Dokumen"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="nama_pengunggah"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Nama Pengunggah
                    </label>
                    <input
                      type="text"
                      name="nama_pengunggah"
                      id="nama_pengunggah"
                      value={this.state.nama_pengunggah}
                      onChange={this.bind}
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Masukkan Nama Pengunggah Dokumen"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="filenya"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Filenya
                    </label>
                    <input
                      type="file"
                      name="filenya"
                      id="filenya"
                      placeholder="Pilih filenya Dokumen"
                      onChange={this.handleFile}
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    />
                  </div>
                  <button
                    type="submit"
                    class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Simpan
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
