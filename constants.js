const URL_REGEXP = /(https?:\/\/)(w{3}\.)?\w+#?/;
const DEV_KEY = 'dev-secret';
const MODE_PRODUCTION = 'production';

const MESSAGE_NOT_FOUND = 'По указанному URL ничего нет';
const MESSAGE_UNAUTORIZED = 'Необходима авторизация';
const MESSAGE_INTERNAL_SERVER_ERROR = 'На сервере произошла ошибка';
const MESSAGE_FORBIDDEN_MOVIE_DELETION = 'Вы не можете удалить этот фильм';
const MESSAGE_FILM_DOESNOT_EXIST = 'Передан несуществующий _id фильма.';
const MESSAGE_FILM_ID_INCORRECT = 'Передан некорректный _id фильма.';
const MESSAGE_FILM_DATA_INCORRECT = 'Переданы некорректные данные при создании фильма.';
const MESSAGE_USER_NOT_FOUND = 'Пользователь не найден.';
const MESSAGE_USER_DATA_INCORRECT = 'Переданы некорректные данные пользователя.';
const MESSAGE_EMAIL_MUST_BE_UNIQUE = 'Пользователь с таким email уже существует';
const MESSAGE_USER_DATA_INCORRECT_CREATION = 'Переданы некорректные данные при создании пользователя.';
const MESSAGE_USER_DATA_INCORRECT_CHANGING = 'Переданы некорректные данные при обновлении пользователя.';
const MESSAGE_WRONG_DATA_LOGIN = 'Неправильные почта или пароль';

module.exports = {
  URL_REGEXP,
  DEV_KEY,
  MODE_PRODUCTION,
  MESSAGE_NOT_FOUND,
  MESSAGE_UNAUTORIZED,
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_FORBIDDEN_MOVIE_DELETION,
  MESSAGE_FILM_DOESNOT_EXIST,
  MESSAGE_FILM_ID_INCORRECT,
  MESSAGE_FILM_DATA_INCORRECT,
  MESSAGE_USER_NOT_FOUND,
  MESSAGE_USER_DATA_INCORRECT,
  MESSAGE_EMAIL_MUST_BE_UNIQUE,
  MESSAGE_USER_DATA_INCORRECT_CREATION,
  MESSAGE_USER_DATA_INCORRECT_CHANGING,
  MESSAGE_WRONG_DATA_LOGIN,
};
