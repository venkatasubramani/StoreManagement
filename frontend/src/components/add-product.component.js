import React, { Component } from "react";
import { connect } from "react-redux";
import { createProduct } from "../slices/products";

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.onChangeProductID = this.onChangeProductID.bind(this);
    this.onChangeProductName = this.onChangeProductName.bind(this);
    this.onChangeProductDescription = this.onChangeProductDescription.bind(this);
    this.saveProduct = this.saveProduct.bind(this);
    this.newProduct = this.newProduct.bind(this);

    this.state = {
      id: null,
      product_id:"",
      product_name: "",
      product_desc: "",
      out_of_stock: false,
      submitted: false,
    };
  }

  onChangeProductID(e) {
    this.setState({
      product_id: e.target.value,
    });
  }
  onChangeProductName(e) {
    this.setState({
      product_name: e.target.value,
    });
  }

  onChangeProductDescription(e) {
    this.setState({
      product_desc: e.target.value,
    });
  }

  saveProduct() {
    const { product_id, product_name, product_desc } = this.state;

    this.props
      .createProduct({ product_name, product_id,product_desc })
      .unwrap()
      .then((data) => {
        this.setState({
          id: data.id,
          product_id:data.product_id,
          product_name: data.product_name,
          product_desc: data.product_desc,
          out_of_stock: data.out_of_stock,
          submitted: true,
        });
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newProduct() {
    this.setState({
      id: null,
      product_id:"",
      product_name: "",
      product_desc: "",
      out_of_stock: false,
      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newProduct}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="product_id">Product Id</label>
              <input
                type="text"
                className="form-control"
                id="product_id"
                required
                value={this.state.product_id}
                onChange={this.onChangeProductID}
                name="product_id"
              />
            </div>
            <div className="form-group">
              <label htmlFor="product_name">Product Name</label>
              <input
                type="text"
                className="form-control"
                id="product_name"
                required
                value={this.state.product_name}
                onChange={this.onChangeProductName}
                name="product_name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="product_desc">Description</label>
              <input
                type="text"
                className="form-control"
                id="product_desc"
                required
                value={this.state.product_desc}
                onChange={this.onChangeProductDescription}
                name="product_desc"
              />
            </div>

            <button onClick={this.saveProduct} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { createProduct })(AddProduct);
