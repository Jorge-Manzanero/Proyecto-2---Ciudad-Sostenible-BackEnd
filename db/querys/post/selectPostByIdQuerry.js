const getDB = require("../../getDB");

const { generateError } = require("../../../helpers");

const selectPostByIdQuery = async (id) => {
  let connection;

  try {
    connection = await getDB();

    const [posts] = await connection.query(
      `
                SELECT 
                id, title, text, barrio, photo, idUser, resuelto, createdAt
                FROM posts P
                WHERE P.id = ?
                GROUP BY P.id
            `,
      [id]
    );

    // Si no existe el post lanzamos un error.
    if (posts.length < 1) {
      generateError("Post no encontrado", 404);
    }

    // Retornamos el post, no el array de post. ¡Ojo!
    return posts[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectPostByIdQuery;
