const SavedCode = require('../models/SavedCode');

// @desc    Get user's saved code snippets
// @route   GET /api/saved-code
// @access  Private
const getSavedCodes = async (req, res) => {
  try {
    const snippets = await SavedCode.find({ user: req.user._id }).sort({ updatedAt: -1 });

    const formatted = snippets.map((s) => ({
      id: s._id.toString(),
      _id: s._id,
      title: s.title,
      language: s.language,
      code: s.code,
      lines: s.lines || (s.code ? s.code.split('\n').length : 1),
      lastSaved: new Date(s.updatedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
      createdAt: s.createdAt,
      updatedAt: s.updatedAt,
    }));

    return res.status(200).json({
      success: true,
      count: formatted.length,
      savedCode: formatted,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error retrieving saved code snippets',
      error: error.message,
    });
  }
};

// @desc    Save a new code snippet
// @route   POST /api/saved-code
// @access  Private
const saveCodeSnippet = async (req, res) => {
  try {
    const { title, language = 'C++', code = '' } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Snippet title is required',
      });
    }

    const lines = code ? code.split('\n').length : 1;

    const newSnippet = await SavedCode.create({
      user: req.user._id,
      title: title.trim(),
      language,
      code,
      lines,
    });

    return res.status(201).json({
      success: true,
      message: 'Code snippet successfully saved to your catalog in MongoDB!',
      snippet: {
        id: newSnippet._id.toString(),
        _id: newSnippet._id,
        title: newSnippet.title,
        language: newSnippet.language,
        code: newSnippet.code,
        lines: newSnippet.lines,
        lastSaved: 'Just now',
        createdAt: newSnippet.createdAt,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error saving snippet',
      error: error.message,
    });
  }
};

// @desc    Delete a saved snippet
// @route   DELETE /api/saved-code/:id
// @access  Private
const deleteSavedCode = async (req, res) => {
  try {
    const snippet = await SavedCode.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!snippet) {
      return res.status(404).json({
        success: false,
        message: 'Saved snippet not found or unauthorized',
      });
    }

    await snippet.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Snippet deleted from your saved catalog',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error deleting snippet',
      error: error.message,
    });
  }
};

module.exports = {
  getSavedCodes,
  saveCodeSnippet,
  deleteSavedCode,
};
