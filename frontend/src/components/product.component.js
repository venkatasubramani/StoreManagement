import React, { Component } from "react";
import { connect } from "react-redux";
import { updateProduct, deleteProduct } from "../slices/products";
import ProductDataService from "../services/product.service";
import { withRouter } from '../common/with-router';
import Switch from "react-switch";

class Product extends Component {
  constructor(props) {
    super(props);
    this.onChangeProductID = this.onChangeProductID.bind(this);
    this.onChangeProductName = this.onChangeProductName.bind(this);
    this.onChangeProductDescription = this.onChangeProductDescription.bind(this);
    this.getProduct = this.getProduct.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.removeProduct = this.removeProduct.bind(this);

    this.state = {
      currentProduct: {
        id: null,
        product_id: "",
        product_name: "",
        product_desc: "",
        out_of_stock: false,
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getProduct(this.props.router.params.id);
  }

  onChangeProductID(e) {
    const product_id = e.target.value;

    this.setState(function (prevState) {
      return {
        currentProduct: {
          ...prevState.currentProduct,
          product_id: product_id,
        },
      };
    });
  }

  onChangeProductName(e) {
    const product_name = e.target.value;

    this.setState((prevState) => ({
      currentProduct: {
        ...prevState.currentProduct,
        product_name: product_name,
      },
    }));
  }

  onChangeProductDescription(e) {
    const product_desc = e.target.value;

    this.setState((prevState) => ({
      currentProduct: {
        ...prevState.currentProduct,
        product_desc: product_desc,
      },
    }));
  }

  getProduct(id) {
    ProductDataService.get(id)
      .then((response) => {
        this.setState({
          currentProduct: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateStatus(checked) {
    const status = !checked;
    var data = {
      id: this.state.currentProduct.id,
      product_id: this.state.currentProduct.product_id,
      product_name: this.state.currentProduct.product_name,
      product_desc: this.state.currentProduct.product_desc,
      out_of_stock: status,
    };

    this.props
      .updateProduct({ id: this.state.currentProduct.id, data })
      .unwrap()
      .then((response) => {
        console.log(response);

        this.setState((prevState) => ({
          currentProduct: {
            ...prevState.currentProduct,
            out_of_stock: status,
          },
        }));

        this.setState({ message: "The status was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateContent() {
    this.props
      .updateProduct({ id: this.state.currentProduct.id, data: this.state.currentProduct })
      .unwrap()
      .then((response) => {
        console.log(response);
        
        this.setState({ message: "The product was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removeProduct() {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      this.props
        .deleteProduct({ id: this.state.currentProduct.id })
        .then(() => {
          this.props.router.navigate('/products');
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  render() {
    const { currentProduct } = this.state;

    return (
      <div>
        {currentProduct ? (
          <div className="edit-form">
            <h4>Product</h4>
            <form>
              <div className="form-group">
                <label htmlFor="product_id">Product ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="product_id"
                  value={currentProduct.product_id}
                  onChange={this.onChangeProductID}
                />
              </div>
              <div className="form-group">
                <label htmlFor="product_name">Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="product_name"
                  value={currentProduct.product_name}
                  onChange={this.onChangeProductName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="product_desc">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="product_desc"
                  value={currentProduct.product_desc}
                  onChange={this.onChangeProductDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                <span> Out of Stock
                <Switch
                  onChange={this.updateStatus}
                  checked={!currentProduct.out_of_stock}
                  offColor="#ff0000"
                  onColor="#00ff00"
                  uncheckedIcon={<div style={{ paddingLeft: 2 }}></div>}
                  checkedIcon={<div style={{ paddingLeft: 2 }}></div>}
                  className="react-switch"
                  
                />In Stock  
                
                </span>
              </div>
            </form>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateContent}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Product...</p>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { updateProduct, deleteProduct })(withRouter(Product));
