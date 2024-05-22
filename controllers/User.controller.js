const { User } = require('../models/index')

module.exports.createUser = async (req, res, next) => {
    try {
        const { body } = req;
        const createdUser = await User.create(body);
        return res.status(201).send(createdUser);
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
        const { userInstance } = req;

        return res.status(200).send(userInstance)
    } catch (error) {
        next(error);
    }
}

module.exports.deleteByPk = async (req, res, next) => {
    try {
        const { params: { UserId } } = req;
        const rowsCount = await User.destroy({
            where: {
                id: UserId
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

//СТАТИЧНИЙ МЕТОД - працює з усією таблицей
// module.exports.updateUser = async (req, res, next) => {
//     try {
//         const { params: { id }, body } = req;

//         const updatedUsersArray = await User.update(body, {
//             where: {
//                 id: id
//             },
//             returning: true
//         });

//             return res.status(200).send(updatedUsersArray);

//     } catch (error) {
//         next(error);
//     }
// }

module.exports.updateUser = async (req, res, next) => {
    try {
        const { body } = req;
        // //1. Знаходимо конкретного юзера, дії над яким треба вчинити
        // const foundUser = await User.findByPk(id)

        const { userInstance } = req;

        //2. Вчинити дії, над знайденим юзером
        const result = await userInstance.update(body);

        //3. Закриваємо з'єднання з певним кодом з клієнтом і повертаємо результат
        return res.status(200).send(result);

    } catch (error) {
        next(error);
    }
}

