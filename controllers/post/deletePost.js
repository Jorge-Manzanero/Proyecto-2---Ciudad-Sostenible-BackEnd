const selectPostByIdQuery = require("../../db/querys/post/selectPostByIdQuerry");
const deletePostQuery = require("../../db/querys/post/deletePostQuery");

const { generateError, deleteImg } = require("../../helpers");

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Comprobamos si somos los dueños del post.
    const post = await selectPostByIdQuery(id);

    // También podríamos poner: !post.owner
    if (post.idUser !== req.user.id) {
      generateError("No tienes suficientes permisos", 401);
    }

    // Si el post tiene imagen la eliminamos de la carpeta de "uploads".
    if (post.photo) {
      await deleteImg(post.photo);
    }

    // Eliminamos el post.
    await deletePostQuery(id);

    res.send({
      status: "ok",
      message: "Post eliminado",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = deletePost;
