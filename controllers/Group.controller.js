const { Group, User } = require('../models');

// 1. Створення групи

module.exports.createGroup = async (req, res, next) => {
  try {
    const { body } = req;

    console.log(body, 'BODY');

    const created = await Group.create(body);

    console.log(created, 'CREATED_GROUP');

    return res.status(201).send(created);
  } catch (error) {
    console.log(error, 'ERROR');
    next(error);
  }
}

// 2 Додавання юзера до групи

module.exports.addUserToGroup = async (req, res, next) => {
  try {
    const { userInstance, params: { groupId } } = req;

    // 1. Знайти сутність групи, у яку потрібно додати юзера
    const group = await Group.findByPk(groupId);

    // 2. Додаємо в знайдену групу юзера
    // parent.addChild(child)
    const result = await group.addUser(userInstance);

    return res.status(200).send('User successfully added to group');

  } catch (error) {
    next(error);
  }
}

//Знаходження всіх групп, якогось конкретного юзера

module.exports.getUserGroups = async (req, res, next) => {
  try {
    // 1. Знайти користувача, групи якого нам потрібно знайти
    const { userInstance } = req;

    // 2. Знайти групи користувача
    // parent.getChildren

    const groups = await userInstance.getGroups();

    return res.status(200).send(groups)

  } catch (error) {
    next(error);
  }
}

module.exports.deleteUserFromGroup = async (req, res, next) => {
  try {
    // 1. Знайти користувача
    const { userInstance, params: { groupId } } = req;

    // 2. Знайти групн з якої видаляємо користувача

    const groupInstance = await Group.findByPk(groupId);

    //3. Видалити користувача з групи
    // parent.removechild(child)

    const rowCount = await groupInstance.removeUser(userInstance);

    if (rowCount > 0) {
      return res.status(200).send('User successfully deleted')
    } else {
      return res.status(400).send('User is never been in this group ')
    }

  } catch (error) {
    next(error);
  }
}
