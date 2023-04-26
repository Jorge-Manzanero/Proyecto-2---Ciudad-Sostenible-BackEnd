const getDB = require("../../getDB");

const selectAllPostQuery = async (keyword = "") => {
  let connection;

  try {
    connection = await getDB();

    const [post] = await connection.query(
      `
                SELECT 
                id, title, text, barrio, photo, idUser, resuelto, createdAt
                FROM posts P
                WHERE P.text LIKE ?
                ORDER BY P.createdAt DESC
                
            `,
      [`%${keyword}%`]
    );

    return post;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectAllPostQuery;
