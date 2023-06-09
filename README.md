# ***Проект Movies-explorer (бэкенд)***
Дипломная работа на факультете веб-разработки ***Яндекс.Практикум***.

### ***О чём проект?***

Эта часть дипломного проеткта представляет собой серверное приложение на **Express.js** которое отвечает за создание, аутентификацию и авторизацию пользователя. Позволяет пользователям добавлять/удалять в приложение данные (карточки фильмов). Хранение и обработка данных - **MongoDB**. 

----

## *Функциональность:*

* Регистрация;
* Аутентификация;
* Авторизация;
* Обновление данных пользователя;
* Получение информации о текущем пользователе;
* Получение списка фильмов;
* Создание фильма;
* Удаление фильма;
* Централизовання обработка ошибок;
* Валидация входящих данных до роутинга.
* Валидация данных на уровне БД.

----

## *Используемые технологии:*

* NodeJS
* Express
* MongoDB
* Mongoose

----

## *Планы по доработке*
* Запись токена в httpOnly куку.

----

## *Запуск проекта:*
`npm сi` — установка зависимостей ;

`mongod` — запускает mongodDB;

`npm run start` — запускает сервер;

`npm run dev` — запускает сервер с hot-reload.

----

## *Сервер*

* Запросы на бэкенд по [https://api.portfolio.nomoredomains.monster](https://api.portfolio.nomoredomains.monster);
* Публичный IP адрес сервера `84.252.140.117`.
