const mongoose = require("mongoose");

// Connection chỉ dùng để ĐỌC
const readConnection = mongoose.createConnection(process.env.READ_URI);

// Connection chỉ dùng để GHI
const writeConnection = mongoose.createConnection(process.env.WRITE_URI);

// Theo dõi kết nối READ
readConnection.on("connected", () => {
  console.log("READ Database connected - read_23IT164");
});

readConnection.on("error", (err) => {
  console.error("READ Database error:", err.message);
});

// Theo dõi kết nối WRITE
writeConnection.on("connected", () => {
  console.log("WRITE Database connected - write_23IT164");
});

writeConnection.on("error", (err) => {
  console.error("WRITE Database error:", err.message);
});

module.exports = {
  readConnection,
  writeConnection,
};
