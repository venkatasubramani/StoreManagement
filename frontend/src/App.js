import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddProduct from "./components/add-product.component";
import Product from "./components/product.component";
import ProductsList from "./components/products-list.component";

class App extends Component {
  render() {
    return (
      <Router>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/products"} className="navbar-brand">
            Root5 Store
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/products"} className="nav-link">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<ProductsList/>} />
            <Route path="/products" element={<ProductsList/>} />
            <Route path="/add" element={<AddProduct/>} />
            <Route path="/products/:id" element={<Product/>} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
