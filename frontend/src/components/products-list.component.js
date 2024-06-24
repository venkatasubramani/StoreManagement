import React, { Component } from "react";
import { connect } from "react-redux";
import {
  retrieveProducts,
  findProductsByTitle,
  deleteProduct,
} from "../slices/products";
import { Link } from "react-router-dom";

class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchProductID = this.onChangeSearchProductID.bind(this);
    this.onChangeSearchProductName = this.onChangeSearchProductName.bind(this);
    this.onChangeSearchProductDesc = this.onChangeSearchProductDesc.bind(this);
    this.onChangeSearchStatus = this.onChangeSearchStatus.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveProduct = this.setActiveProduct.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
    this.filterProducts = this.filterProducts.bind(this);

    this.state = {
      currentProduct: null,
      currentIndex: -1,
      searchProductID: "",
      searchProductName: "",
      searchProductDesc: "",
      searchStockAvailable: false,
      searchOutOfStock: false,
    };
  }

  componentDidMount() {
    this.props.retrieveProducts();
  }

  onChangeSearchProductID(e) {
    const searchProductID = e.target.value;

    this.setState({
      searchProductID: searchProductID,
    }, this.filterProducts);
  }

  onChangeSearchProductName(e) {
    const searchProductName = e.target.value;

    this.setState({
      searchProductName: searchProductName,
    }, this.filterProducts);
  }

  onChangeSearchProductDesc(e) {
    const searchProductDesc = e.target.value;

    this.setState({
      searchProductDesc: searchProductDesc,
    }, this.filterProducts);
  }

  onChangeSearchStatus(e) {
    const { name, checked } = e.target;
    this.setState({
      [name]: checked,
    }, this.filterProducts);
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

  removeProduct(productId) {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      this.props
        .deleteProduct({ id: productId })
        .then(() => {
          this.refreshData();
          this.props.retrieveProducts(); // Refresh the product list
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  filterProducts() {
    const {
      searchProductID,
      searchProductName,
      searchProductDesc,
      searchStockAvailable,
      searchOutOfStock,
    } = this.state;
    let filteredProducts = this.props.products;

    if (searchProductID) {
      filteredProducts = filteredProducts.filter(product =>
        product.product_id.includes(searchProductID)
      );
    }

    if (searchProductName) {
      filteredProducts = filteredProducts.filter(product =>
        product.product_name.includes(searchProductName)
      );
    }

    if (searchProductDesc) {
      filteredProducts = filteredProducts.filter(product =>
        product.product_desc.includes(searchProductDesc)
      );
    }

    if (searchStockAvailable && searchOutOfStock) {
      // No filtering if both checkboxes are checked
    } else if (searchStockAvailable) {
      filteredProducts = filteredProducts.filter(product =>
        !product.out_of_stock
      );
    } else if (searchOutOfStock) {
      filteredProducts = filteredProducts.filter(product =>
        product.out_of_stock
      );
    }

    return filteredProducts;
  }

  render() {
    const {
      currentProduct,
      currentIndex,
      searchProductID,
      searchProductName,
      searchProductDesc,
      searchStockAvailable,
      searchOutOfStock,
    } = this.state;
    const filteredProducts = this.filterProducts();

    return (
      <div className="list row">
        <div className="col-md-12">
          <h4>Products List</h4>

          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>
                  Product ID
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Product ID"
                    value={searchProductID}
                    onChange={this.onChangeSearchProductID}
                  />
                </th>
                <th>
                  Product Name
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Product Name"
                    value={searchProductName}
                    onChange={this.onChangeSearchProductName}
                  />
                </th>
                <th>
                  Description
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Description"
                    value={searchProductDesc}
                    onChange={this.onChangeSearchProductDesc}
                  />
                </th>
                <th>
                Stock Availablity
                  <div>
                    <label style={{ fontSize: '0.5rem' }}>
                      <input
                        type="checkbox"
                        name="searchStockAvailable"
                        checked={searchStockAvailable}
                        onChange={this.onChangeSearchStatus}
                      />
                      Stock Available
                    </label>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.5rem' }}>
                      <input
                        type="checkbox"
                        name="searchOutOfStock"
                        checked={searchOutOfStock}
                        onChange={this.onChangeSearchStatus}
                      />
                      Out Of Stock
                    </label>
                  </div>
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts &&
                filteredProducts.map((product, index) => (
                  <tr
                    key={index}
                    className={index === currentIndex ? "table-active" : ""}
                    onClick={() => this.setActiveProduct(product, index)}
                  >
                    <td>{product.product_id}</td>
                    <td>{product.product_name}</td>
                    <td>{product.product_desc}</td>
                    <td>{product.out_of_stock ? "Out Of Stock" : "Stock Available"}</td>
                    <td>
                      <Link
                        to={"/products/" + product.id}
                        className="btn btn-warning btn-sm"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => this.removeProduct(product.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
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
  deleteProduct,
})(ProductsList);
