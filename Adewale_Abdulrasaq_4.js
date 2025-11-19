const express = require('express');
const app = express();
const PORT = 3000;

app.get('/users/:id', (req, res) => {
    const UserId = req.params.id;
    res.send(`fetching users with id: ${UserId}`)
})

app.get('/products', (req, res) => {
    const category = req.query.category;
    res.send(`The product category is: ${category}`);
})
app.listen(3000, () => {
    console.log(`server is running on http://localhost:${PORT}`);
})
app.use(express.json());
app.post('/login', (req, res) => {
    const user = req.body;
    res.send({ message: "Login attempt", user });
});