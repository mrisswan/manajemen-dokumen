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
    if (localStorage.getItem("token") && user.role == "customer") {
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
                  <div id="laporan">
                    <h2
                      className="dark:text-white text-lg font-sans flex m-2"
                      id="refresh"
                      onClick={() => window.location.reload()}
                    ></h2>
                    <a
                      href="#"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => this.unduhDokumen(item)}
                    >
                      Unduh
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
