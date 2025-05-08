const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
const PORT = 4000;

// Middleware - Plugin
app.use(express.urlencoded({ extended: false }));

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app.get("/users", (req, res) => {
  const html = `
        <ul>
            ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
        </ul>
    `;
  res.send(html);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    const body = req.body;
    const user = users.find((user) => user.id === id);

    if (user) {
      Object.assign(user, body); // Update the user with new data
      fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
        if (err) {
          return res
            .status(500)
            .json({ status: "error", message: "Failed to update user" });
        }
        return res.json({ status: "success", message: "User updated", user });
      });
    } else {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }
  })
  .delete((req, res) => {
    // Delete user with id
    return res.json({ status: "Pending" });
  });

// Dynamic path ----

app.get("/api/users/:id");

app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "success", id: users.length });
  });
});

// app.patch()
app.delete("/api/users/:id", (req, res) => {
  // TODO: Create new user
  res.json({ status: "pending" });
});

app.listen(PORT, (req, res) => {
  console.log(`PORT at listing at: ${PORT}`);
});
