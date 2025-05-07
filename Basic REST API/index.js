const express = require('express')
const users = require('./MOCK_DATA.json')

const app = express()
const PORT = 4000

app.get("/api/users", (req, res) => {
    return res.json(users)
})

app.get("/users", (req,res) => {
    const html = `
        <ul>
            ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
        </ul>
    `
    res.send(html)
})

app.route("/api/users/:id").get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id)
        return res.json(user)
    }).patch((req, res) => {
        // Edit user with id
        return res.json({status: "Pending"})
    })
    .delete((req, res) => {
        // Delete user with id
        return res.json({status: "Pending"})
    })

// Dynamic path ----

app.get("/api/users/:id")

app.post("/api/users/:id", (req, res) => {
    // TODO: Create new user
    res.json({status: "pending"})

})


app.patch()
app.delete("/api/users/:id", (req, res) => {
    // TODO: Create new user
    res.json({status: "pending"})

})

app.listen(PORT, (req, res) => {
    console.log(`PORT at listing at: ${PORT}`)
})