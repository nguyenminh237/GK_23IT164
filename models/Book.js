const mongoose = require("mongoose");
const { readConnection, writeConnection } = require("../config/database");

const bookSchema = new mongoose.Schema(
  {
    productCode: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    author: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    vat: {
      type: Number,
      required: true,
    },

    priceAfterTax: {
      type: Number,
      required: true,
    },
  },
  {
    collection: "books",
  },
);

// Cùng schema nhưng sử dụng 2 connection khác nhau
const ReadBook = readConnection.model("ReadBook", bookSchema);
const WriteBook = writeConnection.model("WriteBook", bookSchema);

module.exports = {
  ReadBook,
  WriteBook,
};
