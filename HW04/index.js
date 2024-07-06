/*
Урок 4. Создание REST API с Express

Для того, чтобы пользователи хранились постоянно, а не только, когда запущен сервер, необходимо реализовать хранение массива в файле.

Подсказки:
— В обработчиках получения данных по пользователю нужно читать файл
— В обработчиках создания, обновления и удаления нужно файл читать, чтобы убедиться, что пользователь существует, а затем сохранить в файл, когда внесены изменения
— Не забывайте про JSON.parse() и JSON.stringify() - эти функции помогут вам переводить объект в строку и наоборот.
*/

// Exporting:
const { error } = require("console");
const express = require("express");
const fs = require("fs");
const path = require("path");
const userGenerator = require("profile_generator_for_gb");

//Initializing:
const app = express();
const filePath = path.join(__dirname, "users.json");

if (!fs.existsSync(filePath)) {
  fs.writeFileSync(
    filePath,
    JSON.stringify([userGenerator.generateRandomProfile()], null, 2),
    "utf8"
  );
} else {
  console.log(`Using: \n ${filePath} \n file as user data-base`);
}

const port = 3000;
app.use(express.json());

//Operations on resources:
app.get("/users", (req, res) => {
  const users = JSON.parse(fs.readFileSync(filePath));
  console.log(users);
  res.send({ users });
});

app.get("/users/:id", (req, res) => {
  const users = JSON.parse(fs.readFileSync(filePath));
  const user = users.find((item) => item.id === +req.params.id);
  if (user) {
    res.send({ user });
  } else {
    res.status(404).send({ user: null, error: "user is not found!" });
  }
});

app.put("/users/:id", (req, res) => {
  const users = JSON.parse(fs.readFileSync(filePath));
  const user = users.find((item) => item.id === +req.params.id);
  if (user) {
    user.name = req.body.name;
    user.surname = req.body.surname;
    user.email = req.body.email;
    user.phoneNumber = req.body.phoneNumber;
    user.id = req.body.id;
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
    res.send({ user });
  } else {
    res.status(404).send({ user: null, error: "user is not found!" });
  }
});

app.post("/users/", (req, res) => {
  const users = JSON.parse(fs.readFileSync(filePath));

  const user = {
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    id: userGenerator.generateId(),
  };

  users.push(user);
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
  res.send({ user });
});

app.delete("/users/:id", (req, res) => {
  const users = JSON.parse(fs.readFileSync(filePath));
  const userIndex = users.findIndex((b) => b.id === +req.params.id);
  const user = users[userIndex];
  if (userIndex === -1) return res.status(404).send("User not found");

  users.splice(userIndex, 1);
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
  res.status(204).send({ status: "OK" });
});

app.listen(port, () => console.log(`Listening on port: ${port}`));
