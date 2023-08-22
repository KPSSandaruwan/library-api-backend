const { Author } = require("../models/AuthorModel");



exports.createAuthor = async (req, res) => {
  try {
    const authorData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName
    }

    const author = new Author(authorData);

    const savedAuthor = await author.save();

    return res.status(200).json({
      success: true,
      message: "New author is created!",
      data: savedAuthor,
    });
  } catch (err) {
    console.log('errrrrrrrrrrrr', err)
    return res.status(422).json({
      success: false,
      message: "Author creation failed check validation errors!",
      data: err.message,
    });
  }
};

exports.getAllAuthors = async (req, res) => {
  console.log("getAllAuthors");
  let params = {
    skip: parseInt(req.params.skip) || 0,
    limit: parseInt(req.params.limit) || 5,
  }

  try {
    const totalAuthors = await Author.countDocuments();

    const authors = await Author.aggregate([
      {
        $skip: params.skip,
      },
      {
        $limit: params.limit,
      },
      {
        $project: {
          firstName: 1,
          lastName: 1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      message: 'Authors fetched successfully!',
      data: authors,
      totalAuthors: totalAuthors
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAuthorById = async (req, res) => {
  const authorId = req.params.id; 

  // if (bookId) {

  // }

  try {
    const author = await Author.findById(authorId);

    if (!author) {
      return res.status(404).json({
        success: false,
        message: 'Author not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Author found!',
      data: author,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching the author data.',
      error: error.message,
    });
  }
};