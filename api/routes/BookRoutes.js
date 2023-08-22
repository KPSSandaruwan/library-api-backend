module.exports = function (app) {
  const BookController = require("../controllers/BookController");

  app.post("/createBook", BookController.createBook);
  app.get("/getAllBooks/:skip/:limit", BookController.getAllBooks);
  app.get("/getBookById/:id", BookController.getBookById);
};