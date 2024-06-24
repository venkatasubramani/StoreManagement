module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("product", {
    product_id: {
      type: Sequelize.STRING
    },
    product_name: {
      type: Sequelize.STRING
    },
    product_desc: {
      type: Sequelize.STRING
    },
    out_of_stock: {
      type: Sequelize.BOOLEAN
    },
    deleted: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }

  });

  return Product;
};
