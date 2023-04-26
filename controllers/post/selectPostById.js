const selectPostByIdQuery = require('../../db/querys/post/selectPostByIdQuerry');

const selectPostById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const post = await selectPostByIdQuery(id);

        res.send({
            status: 'ok',
            data: {
                post,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = selectPostById;