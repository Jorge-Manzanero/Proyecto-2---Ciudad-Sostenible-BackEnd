const getDB = require("../../getDB");

const deletePostQuery = async (idPost) => {
  let connection;

  try {
    connection = await getDB();

    // Eliminamos el Post
    await connection.query(`DELETE FROM posts WHERE id = ?`, [idPost]);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deletePostQuery;
