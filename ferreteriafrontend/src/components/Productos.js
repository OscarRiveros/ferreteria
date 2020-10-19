import React, { Component } from "react";
//import logo from "./logo.svg";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const url = "http://127.0.0.1:8000/api/producto/";

export default class Productos extends Component {
  state = {
    data: [],
    modalInsertar: false,
    modalEliminar: false,
    form: {
      idproducto: "",
      codigobarra: "",
      preciocompra: "",
      precioventa: "",
      stock: "",
      descripcion: "",
      categoria_idcategoria: "",
      proveedor_idproveedor: "",
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
    axios.delete(url + this.state.form.idproducto).then(response => {
      this.setState({ modalEliminar: false });
      this.peticionGet();
    });
  };

  peticionPut = () => {
    axios
      .put(url + this.state.form.idproducto + "/", this.state.form)
      .then(response => {
        this.modalInsertar();
        this.peticionGet();
      });
  };

  peticionPost = async () => {
    delete this.state.form.idproducto;
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

  seleccionarProducto = producto => {
    this.setState({
      tipoModal: "actualizar",
      form: {
        idproducto: producto.idproducto,
        codigobarra: producto.codigobarra,
        preciocompra: producto.preciocompra,
        precioventa: producto.precioventa,
        stock: producto.stock,
        descripcion: producto.descripcion,
        categoria_idcategoria: producto.categoria_idcategoria,
        proveedor_idproveedor: producto.proveedor_idproveedor
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
          <br></br>
          <h1>Productos</h1>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Codigo de Barra</th>
                <th>Precio de Compra</th>
                <th>Precio de Venta</th>
                <th>Stock</th>
                <th>Producto</th>
                <th>Categoria</th>
                <th>Proveedor</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map(producto => {
                return (
                  <tr>
                    <td>{producto.idproducto}</td>
                    <td>{producto.codigobarra}</td>
                    <td>{producto.preciocompra}</td>
                    <td>{producto.precioventa}</td>
                    <td>{producto.stock}</td>
                    <td>{producto.descripcion}</td>
                    <td>{producto.categoria_idcategoria}</td>
                    <td>{producto.proveedor_idproveedor}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          this.seleccionarProducto(producto);
                          this.modalInsertar();
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          this.seleccionarProducto(producto);
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
                Agregar Producto
              </button>
              <br />
            </tbody>
          </table>
          <Modal isOpen={this.state.modalInsertar}>
            <ModalHeader style={{ display: "block" }}>
              <span style={{ float: "right" }}>Producto</span>
            </ModalHeader>
            <ModalBody>
              <div className="form-group">
                <label htmlFor="idproducto">ID </label>
                <input
                  className="form-control"
                  type="text"
                  name="idproducto"
                  id="idproducto"
                  readOnly
                  onChange={this.handleChange}
                  value={form ? form.idproducto : this.state.data.length + 1}
                />
                <br />
                <label htmlFor="codigobarra">Codigo de Barra</label>
                <input
                  className="form-control"
                  type="text"
                  name="codigobarra"
                  id="codigobarra"
                  onChange={this.handleChange}
                  value={form ? form.codigobarra : ""}
                />
                <br />
                <label htmlFor="preciocompra">Precio de Compra</label>
                <input
                  className="form-control"
                  type="text"
                  name="preciocompra"
                  id="preciocompra"
                  onChange={this.handleChange}
                  value={form ? form.preciocompra : ""}
                />
                <br />
                <label htmlFor="precioventa">Precio de Venta</label>
                <input
                  className="form-control"
                  type="text"
                  name="precioventa"
                  id="precioventa"
                  onChange={this.handleChange}
                  value={form ? form.precioventa : ""}
                />
                <br />
                <label htmlFor="stock">Stock</label>
                <input
                  className="form-control"
                  type="text"
                  name="stock"
                  id="stock"
                  onChange={this.handleChange}
                  value={form ? form.stock : ""}
                />
                <br />
                <label htmlFor="descripcion">Producto</label>
                <input
                  className="form-control"
                  type="text"
                  name="descripcion"
                  id="descripcion"
                  onChange={this.handleChange}
                  value={form ? form.descripcion : ""}
                />
                <br />
                <label htmlFor="categoria_idcategoria">Categoria</label>
                <input
                  className="form-control"
                  type="text"
                  name="categoria_idcategoria"
                  id="categoria_idcategoria"
                  onChange={this.handleChange}
                  value={form ? form.categoria_idcategoria : ""}
                />
                <br />
                <label htmlFor="proveedor_idproveedor">Proveedor</label>
                <input
                  className="form-control"
                  type="text"
                  name="proveedor_idproveedor"
                  id="proveedor_idproveedor"
                  onChange={this.handleChange}
                  value={form ? form.proveedor_idproveedor : ""}
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
              Estás seguro que deseas eliminar el Producto{" "}
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
//export default Productos;
