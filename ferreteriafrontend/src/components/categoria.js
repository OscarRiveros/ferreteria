import React, { Component } from "react";
//import logo from "./logo.svg";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const url = "http://127.0.0.1:8000/api/categoria/";

class categoria extends Component {
  state = {
    data: [],
    modalInsertar: false,
    modalEliminar: false,
    form: {
      idcategoria: "",
      descripcion: "",
      tipoModal: ""
    }
  };

  peticionGet = () => {
    axios
      .get(url)
      .then(response => {
        this.setState({ data: response.data });
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  peticionDelete = () => {
    axios.delete(url + this.state.form.idcategoria).then(response => {
      this.setState({ modalEliminar: false });
      this.peticionGet();
    });
  };

  peticionPut = () => {
    axios
      .put(url + this.state.form.idcategoria + "/", this.state.form)
      .then(response => {
        this.modalInsertar();
        this.peticionGet();
      });
  };

  peticionPost = async () => {
    delete this.state.form.idcategoria;
    await axios
      .post(url, this.state.form)
      .then(response => {
        this.modalInsertar();
        this.peticionGet();
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  seleccionarCategoria = categoria => {
    this.setState({
      tipoModal: "actualizar",
      form: {
        idcategoria: categoria.idcategoria,
        descripcion: categoria.descripcion
      }
    });
  };

  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  };

  handleChange = async e => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
    console.log(this.state.form);
  };

  componentDidMount() {
    this.peticionGet();
  }
  render() {
    const { form } = this.state;
    return (
      <div className="container">
        <div className="App">
          <br />
          <h1>Categoria</h1>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Categoria</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map(categoria => {
                return (
                  <tr>
                    <td>{categoria.idcategoria}</td>
                    <td>{categoria.descripcion}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          this.seleccionarCategoria(categoria);
                          this.modalInsertar();
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          this.seleccionarCategoria(categoria);
                          this.setState({ modalEliminar: true });
                        }}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </td>
                  </tr>
                );
              })}
              <br />
              <button
                className="btn btn-success"
                onClick={() => {
                  this.setState({ form: null, tipoModal: "insertar" });
                  this.modalInsertar();
                }}
              >
                Agregar Categoria
              </button>
              <br />
            </tbody>
          </table>
          <Modal isOpen={this.state.modalInsertar}>
            <ModalHeader style={{ display: "block" }}>
              <span style={{ float: "right" }}>Categoria</span>
            </ModalHeader>
            <ModalBody>
              <div className="form-group">
                <label htmlFor="idcategoria">ID </label>
                <input
                  className="form-control"
                  type="text"
                  name="idcategoria"
                  id="idcategoria"
                  readOnly
                  onChange={this.handleChange}
                  value={form ? form.idcategoria : this.state.data.length + 1}
                />
                <br />
                <label htmlFor="descripcion">Categoria</label>
                <input
                  className="form-control"
                  type="text"
                  name="descripcion"
                  id="descripcion"
                  onChange={this.handleChange}
                  value={form ? form.descripcion : ""}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              {this.state.tipoModal === "insertar" ? (
                <button
                  className="btn btn-success"
                  onClick={() => this.peticionPost()}
                >
                  Insertar
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() => this.peticionPut()}
                >
                  Actualizar
                </button>
              )}
              <button
                className="btn btn-danger"
                onClick={() => this.modalInsertar()}
              >
                Cancelar
              </button>
            </ModalFooter>
          </Modal>
          <Modal isOpen={this.state.modalEliminar}>
            <ModalBody>
              Estás seguro que deseas eliminar la Categoria{" "}
              {form && form.descripcion}
            </ModalBody>
            <ModalFooter>
              <button
                className="btn btn-danger"
                onClick={() => this.peticionDelete()}
              >
                Sí
              </button>
              <button
                className="btn btn-secundary"
                onClick={() => this.setState({ modalEliminar: false })}
              >
                No
              </button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}
export default categoria;
