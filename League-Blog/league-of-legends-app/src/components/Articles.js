import axios from "axios";
import { useState } from "react";

function Articles() {
    const articles = [
        {
            id: 0,
            title: "My first article",
            body: "My article is the best article in the world My article is the best article in the world My article is the best article in the world My article is the best article in the world",
            author: "Demmy",
            createdAt: '2022-04-25T20:42:39.413Z',
        },
        {
            id: 1,
            title: "My second article",
            body: "My article is the best article in the world",
            author: "Denilson",
            createdAt: '2022-04-25T20:42:39.413Z',
        },
        {
            id: 2,
            title: "My third article",
            body: "My article is the best article in the world",
            author: "Ousmane",
            createdAt: '2022-04-25T20:42:39.413Z',
        },
    ]
    const newArticle = () => {
        createArticle("My new one", "my lipgloss is cool", "button")
    }


    return (
        <div className="articles">
            <h1> PLACEHOLDER TEXT </h1>
            {articles.map((article) =>
                <div className="article">
                    <h1>{article.title}</h1>
                    <div className="article-body">{article.body}</div>
                    <span>Written by: {article.author}</span>
                </div>
            )}

            <button onClick={newArticle}>Create Article</button>
        </div>
    )
}

const articles = [];

function getArticles() {
    const articles = [];
    

    return articles
}

function getArticle(id) {
    axios.get("http://localhost:4000/articles/"+id, {})
    .then(function (response) {
        console.log(response.data)
        return response.data
    }).catch(function (error) {
        console.log(error);
    })
}

function createArticle(title, body, author) {
    axios.post("http://localhost:4000/articles", { body: { title: title, body: body, author: author } })
        .then(function (response) {
            console.log(response.data)
        }).catch(function (error) {
            console.log(error);
        })
}

function deleteArticle(id) {
    articles.splice(id, 1)
}

function updateArticle(id, title, body, author) {
    articles[id].title = title;
    articles[id].body = body;
    articles[id].author = author;
}

export default Articles;