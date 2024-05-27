const { User, Group } = require('../models/index');
const UserError = require('../errors/UserNotFound')

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
        const { params: { userId } } = req;
        const rowsCount = await User.destroy({
            where: {
                id: userId
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


//У відповіді отримати інфо про сутність юзера + інфор про всі групи, в яких цейюзер перебуває
// ПРИКЛАД Lazy Loading

// module.exports.getUserWithGroups = async (req, res, next) => {
//     try {
//         // //1. Знаходимо конкретного юзера

//         const { params: { userId } } = req;
//         const userInstance = await User.findByPk(userId);

//         if(!userInstance) {
//             throw new UserError('User is not found');
//         }

//         //2. Витягаємо всі групи юзера
//         const groupsArray = await userInstance.getGroups();

//         //3. Ми отримали і юзера і зрупи в 1 та 2 пунктах. Складаємо результат.Закриваємо з'єднання з певним кодом з клієнтом і повертаємо результат
//         return res.status(200).send({data: {userInstance, groupsArray}});

//     } catch (error) {
//         next(error);
//     }
// }

// ПРИКЛАД Eager Loading (моментальне завантаження)

module.exports.getUserWithGroups = async (req, res, next) => {
    try {
        // //1. Знаходимо конкретного юзера
        const { params: { userId } } = req;

        //2. Отримуємо і юзера і групи за ОДИН запит
        const userWithGroups = await User.findByPk(userId, {
            attributes: ['id', 'first_name', 'last_name'], //працює на таблицю Users
            include: [
                {
                    model: Group,
                    through: {
                        attributes: []// щоб не виводити звязуючу таблицю 
                    },
                    attributes: ['id', 'name'] // працює на таблицю Groups
                }
            ]
        });

        if (!userWithGroups) {
            throw new UserError('User is not found');
        }

        // Перед відправкою на сервер треба видалити пароль з результату запиту 

        return res.status(200).send(userWithGroups);

    } catch (error) {
        next(error);
    }
}
