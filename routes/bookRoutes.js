const express = require("express");
const router = express.Router();

const { ReadBook, WriteBook } = require("../models/Book");

const PRODUCT_PREFIX = "164";
const VAT_RATE = 10;

// ========================================
// GET /books
// Đọc bằng read_23IT164
// ========================================

router.get("/", async (req, res) => {
  try {
    const books = await ReadBook.find().lean();

    res.render("books", {
      title: "Danh sách sách",
      books,
    });
  } catch (error) {
    res.status(500).send("Không thể đọc dữ liệu: " + error.message);
  }
});

// ========================================
// GET /books/add
// Hiển thị form
// ========================================

router.get("/add", (req, res) => {
  res.render("add-book", {
    title: "Thêm sách",
  });
});

// ========================================
// POST /books
// Ghi bằng write_23IT164
// ========================================

router.post("/", async (req, res) => {
  try {
    const { productCode, title, author, price } = req.body;

    // Kiểm tra prefix MSSV
    if (!productCode || !productCode.startsWith(PRODUCT_PREFIX)) {
      return res.status(400).render("add-book", {
        title: "Thêm sách",

        error: "Mã sản phẩm phải bắt đầu bằng 164",
      });
    }

    const numericPrice = Number(price);

    if (!Number.isFinite(numericPrice) || numericPrice < 0) {
      return res.status(400).render("add-book", {
        title: "Thêm sách",
        error: "Giá sản phẩm không hợp lệ",
      });
    }

    // VAT = (4 + 6)% = 10%
    const priceAfterTax = numericPrice * (1 + VAT_RATE / 100);

    const newBook = new WriteBook({
      productCode,
      title,
      author,

      price: numericPrice,

      vat: VAT_RATE,

      priceAfterTax,
    });

    await newBook.save();

    // Sau khi thêm → quay lại danh sách
    res.redirect("/books");
  } catch (error) {
    res.status(500).send("Không thể thêm sách: " + error.message);
  }
});

module.exports = router;
