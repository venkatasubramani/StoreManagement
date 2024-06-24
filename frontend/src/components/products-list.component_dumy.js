import React, { Component } from "react";
import { connect } from "react-redux";
import {
  retrieveProducts,
  findProductsByTitle,
  deleteAllProducts,
} from "../slices/products";
import { Link } from "react-router-dom";

class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveProduct = this.setActiveProduct.bind(this);
    this.findByTitle = this.findByTitle.bind(this);
    this.removeAllProducts = this.removeAllProducts.bind(this);

    this.state = {
      currentProduct: null,
      currentIndex: -1,
      searchTitle: "",
    };
  }

  componentDidMount() {
    this.props.retrieveProducts();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle,
    });
  }

  refreshData() {
    this.setState({
      currentProduct: null,
      currentIndex: -1,
    });
  }

  setActiveProduct(product, index) {
    this.setState({
      currentProduct: product,
      currentIndex: index,
    });
  }

  removeAllProducts() {
    this.props
      .deleteAllProducts()
      .then((response) => {
        console.log(response);
        this.refreshData();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  findByTitle() {
    this.refreshData();

    this.props.findProductsByTitle({ product_name: this.state.searchTitle });
  }

  render() {
    const { searchTitle, currentProduct, currentIndex } = this.state;
    const { products } = this.props;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by product name"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.findByTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Products List</h4>

          <ul className="list-group">
            {products &&
              products.map((product, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveProduct(product, index)}
                  key={index}
                >
                  {product.product_name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllProducts}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentProduct ? (
            <div>
              <h4>Product</h4>
              <div>
                <label>
                  <strong>Product Id:</strong>
                </label>{" "}
                {currentProduct.product_id}
              </div>
              <div>
                <label>
                  <strong>Product Name:</strong>
                </label>{" "}
                {currentProduct.product_name}
              </div>
              <div>
                <label>
                  <strong>Product Description:</strong>
                </label>{" "}
                {currentProduct.product_desc}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentProduct.out_of_stock ? "Out Of Stock" : "Stock Available"}
              </div>

              <Link
                to={"/products/" + currentProduct.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Product...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

export default connect(mapStateToProps, {
  retrieveProducts,
  findProductsByTitle,
  deleteAllProducts,
})(ProductsList);
