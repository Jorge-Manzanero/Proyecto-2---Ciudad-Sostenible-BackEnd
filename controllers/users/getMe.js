const selectUserById = require("../../db/querys/users/selectUserById");

const getMe = async (req, res) => {
  const id = req.user.id;

  const user = await selectUserById(id);

  res.json({
    status: "ok",
    data: user,
  });
};

module.exports = getMe;
