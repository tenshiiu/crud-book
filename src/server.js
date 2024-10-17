const express = require("express");
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Simulação de um banco de dados
let books = [];

// Rota raiz
app.get("/", (req, res) => {
    res.send("API de Books - Use /books para acessar os livros");
});

// CREATE - Adicionar um livro
app.post("/books", (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price
    };

    books.push(newBook);
    res.status(201).json(newBook);
});

// READ - Listar todos os livros
app.get("/books", (req, res) => {
    res.json(books);
});

// UPDATE - Atualizar um livro
app.put("/books/:id", (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));

    // Caso der erro.
    if (!book) return res.status(404).send("Livro não encontrado");

    book.title = req.body.title || book.title;
    book.description = req.body.description || book.description;
    book.price = req.body.price || book.price;
    
    res.json(book);
});

// DELETE - Remover um livro
app.delete("/books/:id", (req, res) => {
    const index = books.findIndex(b => b.id === parseInt(req.params.id));
    
    books.splice(index, 1);
    res.status(204).send(); // No content
});

// Ao iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
