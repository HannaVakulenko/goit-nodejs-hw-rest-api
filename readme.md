## GoIT Node.js Course Homework - hw02-express
### Завдання:
01. Написана REST API для роботи з колекцією контактів. Для роботи з REST API використовувався [Postman] (https://www.getpostman.com/).

02. Створений аккаунт на MongoDB Atlas та db-contacts, а в ній колекція contacts.
Для створення підключення до MongoDB використовувався npm пакет Mongoose.
У функціях обробки запитів замінений код CRUD-операцій над контактами з файлу (гілка hw02-express) на Mongoose-методи для роботи з колекцією контактів в базі даних MongoDB (гілка 03-mongodb).

03. Додана логіка аутентифікації / авторизації користувача через JWT (гілка 04-auth).

04. Додай можливість завантаження аватарки користувача через [Multer] та написаний unit-тест для контролера входу - логін (гілка hw05-avatars)

### Команди npm:

- `npm start` &mdash; старт сервера в режимі production
- `npm run start:dev` &mdash; старт сервера в режимі розробки (development)
- `npm run lint` &mdash; запустити виконання перевірки коду з eslint, необхідно виконувати перед кожним PR та виправляти всі помилки лінтера
- `npm lint:fix` &mdash; та ж перевірка лінтера, але з автоматичними виправленнями простих помилок
