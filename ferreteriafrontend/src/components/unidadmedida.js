import React, { Component } from "react";
//import logo from "./logo.svg";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const url = "http://127.0.0.1:8000/api/unidadmedida/";

class unidadmedida extends Component {
  state = {
    data: [],
    modalInsertar: false,
    modalEliminar: false,
    form: {
      idunidadmedida: "",
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
    axios.delete(url + this.state.form.idunidadmedida).then(response => {
      this.setState({ modalEliminar: false });
      this.peticionGet();
    });
  };

  peticionPut = () => {
    axios
      .put(url + this.state.form.idunidadmedida + "/", this.state.form)
      .then(response => {
        this.modalInsertar();
        this.peticionGet();
      });
  };

  peticionPost = async () => {
    delete this.state.form.idunidadmedida;
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

  seleccionarUnidadMedida = unidadmedida => {
    this.setState({
      tipoModal: "actualizar",
      form: {
        idunidadmedida: unidadmedida.idunidadmedida,
        descripcion: unidadmedida.descripcion
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
          <br />
          <br />
          <br />
          <h1>Unidad de Medida</h1>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Medida</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map(unidadmedida => {
                return (
                  <tr>
                    <td>{unidadmedida.idunidadmedida}</td>
                    <td>{unidadmedida.descripcion}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          this.seleccionarUnidadMedida(unidadmedida);
                          this.modalInsertar();
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          this.seleccionarUnidadMedida(unidadmedida);
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
              <br />
              <button
                className="btn btn-success"
                onClick={() => {
                  this.setState({ form: null, tipoModal: "insertar" });
                  this.modalInsertar();
                }}
              >
                Agregar Unidad de Medida
              </button>
              <br />
            </tbody>
          </table>
          <Modal isOpen={this.state.modalInsertar}>
            <ModalHeader style={{ display: "block" }}>
              <span style={{ float: "right" }}>Unidad de Medida</span>
            </ModalHeader>
            <ModalBody>
              <div className="form-group">
                <label htmlFor="idunidadmedida">ID </label>
                <input
                  className="form-control"
                  type="text"
                  name="idunidadmedida"
                  id="idunidadmedida"
                  readOnly
                  onChange={this.handleChange}
                  value={
                    form ? form.idunidadmedida : this.state.data.length + 1
                  }
                />
                <br />
                <label htmlFor="descripcion">Unidad de Medida</label>
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
              Estás seguro que deseas eliminar la Unidad de Medida{" "}
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
export default unidadmedida;
