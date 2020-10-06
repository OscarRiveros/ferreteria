import React, { Component } from "react";
//import logo from "./logo.svg";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const url = "http://127.0.0.1:8000/api/proveedor/";

class Proveedor extends Component {
  state = {
    data: [],
    modalInsertar: false,
    modalEliminar: false,
    form: {
      idproveedor: "",
      nombre: "",
      telefono: "",
      ruc: "",
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
    axios.delete(url + this.state.form.idproveedor).then(response => {
      this.setState({ modalEliminar: false });
      this.peticionGet();
    });
  };

  peticionPut = () => {
    axios
      .put(url + this.state.form.idproveedor + "/", this.state.form)
      .then(response => {
        this.modalInsertar();
        this.peticionGet();
      });
  };

  peticionPost = async () => {
    //delete this.state.form.idproveedor;
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

  seleccionarProveedor = proveedor => {
    this.setState({
      tipoModal: "actualizar",
      form: {
        idproveedor: proveedor.idproveedor,
        nombre: proveedor.nombre,
        telefono: proveedor.telefono,
        ruc: proveedor.ruc
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
          <h1>Proveedor</h1>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Telefono</th>
                <th>Ruc</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map(proveedor => {
                return (
                  <tr>
                    <td>{proveedor.idproveedor}</td>
                    <td>{proveedor.nombre}</td>
                    <td>{proveedor.telefono}</td>
                    <td>{proveedor.ruc}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          this.seleccionarProveedor(proveedor);
                          this.modalInsertar();
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          this.seleccionarProveedor(proveedor);
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
                Agregar Proveedor
              </button>
              <br />
            </tbody>
          </table>
          <Modal isOpen={this.state.modalInsertar}>
            <ModalHeader style={{ display: "block" }}>
              <span style={{ float: "right" }}>Proveedor</span>
            </ModalHeader>
            <ModalBody>
              <div className="form-group">
                <label htmlFor="idproveedor">ID</label>
                <input
                  className="form-control"
                  type="text"
                  name="idproveedor"
                  id="idproveedor"
                  readOnly
                  onChange={this.handleChange}
                  value={form ? form.idproveedor : this.state.data.length + 1}
                />
                <br />
                <label htmlFor="nombre">Proveedor</label>
                <input
                  className="form-control"
                  type="text"
                  name="nombre"
                  id="nombre"
                  onChange={this.handleChange}
                  value={form ? form.nombre : ""}
                />
                <label htmlFor="telefono">Telefono</label>
                <input
                  className="form-control"
                  type="text"
                  name="telefono"
                  id="telefono"
                  onChange={this.handleChange}
                  value={form ? form.telefono : ""}
                />
                <label htmlFor="ruc">RUC</label>
                <input
                  className="form-control"
                  type="text"
                  name="ruc"
                  id="ruc"
                  onChange={this.handleChange}
                  value={form ? form.ruc : ""}
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
              Estás seguro que deseas eliminar el Proveedor{" "}
              {form && form.nombre}
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
export default Proveedor;
