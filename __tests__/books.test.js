process.env.Node_env = "test";

const request = require("supertest");

const app = require("../app");
const db = require("../db");

let testBook;

beforeEach(async () => {
    //insert new book before each test
    let result = db.query(`INSERT INTO
                           books(isbn, amazon_url, author, language, pages, publisher, title, year)
                           VALUES('123456789', 'https://amazon.com/book, 'Anna', 'english', '50', 'Random House', 'My Book', '2021') RETURNING isbn`);
    testBook = result.rows[0].isbn;
});

//test post route
describe("POST /books", async function (){
    test("Creates a new book and adds to db", async function(){
        const response = await request(app).post('/books').send({
            isbn: '123456788',
            amazon_url: 'https://amazon.com/books',
            author: 'Anna',
            language: 'Spanish',
            pages: 2000,
            publisher: 'your dog',
            title: 'mani',
            year: 2020
        });
    expect(response.statusCode).toBe(201);
    
    })
})

afterEach(async function () {
    await db.query("DELETE FROM BOOKS");
  });

afterAll(async function () {
    await db.end()
  });