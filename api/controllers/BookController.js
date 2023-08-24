const { Book } = require("../models/BookModel");


exports.createBook = async (req, res) => {
  try {
    const bookData = {
      author: req.body.author,
      name: req.body.bookName,
      isbnNumber: req.body.isbn
    }

    const book = new Book(bookData);

    const savedBook = await book.save();

    return res.status(200).json({
      success: true,
      message: "New book is created!",
      data: savedBook,
    });
  } catch (err) {
    console.log('errrrrrrrrrrrr', err)
    return res.status(422).json({
      success: false,
      message: "Book creation failed check validation errors!",
      data: err.message,
    });
  }
};

exports.getAllBooks = async (req, res) => {
  console.log("getAllBooks");
  let params = {
    skip: parseInt(req.params.skip) || 0,
    limit: parseInt(req.params.limit) || 5,

  }
  try {
    const totalBooks = await Book.countDocuments();

    const books = await Book.aggregate([
      {
        $skip: params.skip,
      },
      {
        $limit: params.limit,
      },
      {
        $lookup: {
          from: 'authors',
          localField: 'author',
          foreignField: '_id',
          as: 'authorData',
        },
      },
      {
        $unwind: '$authorData',
      },
      {
        $project: {
          name: 1,
          isbnNumber: 1,
          authorData: { firstName: 1, lastName: 1, _id: 1 },
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      message: 'Books fetched successfully!',
      data: books,
      totalBooks: totalBooks
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getBookById = async (req, res) => {
  const bookId = req.params.id; 

  // if (bookId) {

  // }

  try {
    const book = await Book.findById(bookId).populate('author');

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Book found!',
      data: book,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching the book.',
      error: error.message,
    });
  }
};

exports.updateBook = async (req, res) => {
  const bookId = req.params.id;

  try {
    const updatedBookData = {
      author: req.body.author,
      name: req.body.bookName,
      isbnNumber: req.body.isbn,
    };

    console.log('updatedBookData', updatedBookData)

    const updatedBook = await Book.findByIdAndUpdate(bookId, updatedBookData, {
      new: true,
    });
    console.log('updatedBook', updatedBook)

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: 'Book not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Book updated!',
      data: updatedBook,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'An error occurred while updating the book.',
      error: error.message,
    });
  }
};