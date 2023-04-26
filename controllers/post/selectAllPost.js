const selectAllPostQuery = require("../../db/querys/post/selectAllPostQuery");

const selectAllPost = async (req, res, next) => {
  try {
    // Importamos un query param que nos permite filtrar los tweets por palabra clave.
    const { keyword } = req.query;

    const posts = await selectAllPostQuery(keyword);

    res.send({
      status: "ok",
      data: posts,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = selectAllPost;
