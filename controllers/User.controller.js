const { User } = require('../models/index')

module.exports.createUser = async (req, res, next) => {
    try {
        const { body } = req;
        const createduser = await User.create(body);
        return res.status(201).send(createduser);
    } catch (error) {
        next(error);
    }
}

module.exports.findAll = async (req, res, next) => {
    try {
        const resultsArray = await User.findAll()
        return res.status(200).send(resultsArray)
    } catch (error) {
        next(error);
    }
}

module.exports.findByPk = async (req, res, next) => {
    try {
        const { params: { id } } = req;
        const foundUser = await User.findByPk(id)
        return res.status(200).send(foundUser)
    } catch (error) {
        next(error);
    }
}

module.exports.deleteByPk = async (req, res, next) => {
    try {
        const { params: { id } } = req;
        const rowsCount = await User.destroy({
            where: {
                id: id
            }
        });

        if (rowsCount > 0) {
            return res.status(200).send('Successfully deleted')
        } else {
            return res.status(204).send();
        }

    } catch (error) {
        next(error);
    }
}

module.exports.updateUser = async (req, res, next) => {
    try {
        const { params: { id }, body } = req;

        const updatedUsersArray = await User.update(body, {
            where: {
                id: id
            },
            returning: true
        });
        
            return res.status(200).send(updatedUsersArray);

    } catch (error) {
        next(error);
    }
}