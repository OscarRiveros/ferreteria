import React, { Component } from "react";
//import logo from "./logo.svg";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export default class Productos extends Component {
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
    return <div></div>;
  }
}
