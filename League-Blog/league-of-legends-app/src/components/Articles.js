import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { Link } from 'react-router-dom';

function Articles() {
    let API_URL = process.env.API_URL || 'http://localhost:4000'
    const development = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
    if (!development) API_URL = 'https://league-it-out.herokuapp.com';
    const [articles, setArticles] = useState([])
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);
        createArticle(inputs.title, inputs.body, inputs.author)
    }

    const getArticles = useCallback(() => {
        axios.get(`${API_URL}/articles`, {})
            .then(function (response) {
                setArticles(response.data);
                console.log(response.data)
            }).catch(function (error) {
                console.log(error);
            })
    }, [API_URL]);

    function createArticle(title, articleBody, author) {
        axios.post(`${API_URL}/articles`, { title: title, body: articleBody, author: author })
            .then(function (response) {
                console.log(response.data)
                getArticles();
                setInputs({});
            }).catch(function (error) {
                console.log(error);
            })
    }

    const deleteArticle = (id) => {
        console.log("Delete article: ", id)
        axios.delete(`${API_URL}/articles/` + id, {})
            .then(function (response) {
                console.log(response.data)
                getArticles();
            }).catch(function (error) {
                console.log(error);
            })
    }

    useEffect(() => {
        getArticles();
    }, [getArticles])


    return (
        <div className="articles">
            <div className="backgroundNewsDiv">
                <h1> League It Out News </h1>
                <p> Never miss out on important information, be informed by fellow leaguers or create an article yourself to help out others too! </p>
            </div>
            <br />
            {articles.map((article) =>
                <div className="article" key={article._id}>
                    <h1>{article.title}</h1>
                    <div className="article-list-body">{article.body}</div>
                    <span>Written by: {article.author}</span>
                    <div className="crudButtons">
                        <Link to={`/articles/${article._id}`}>
                            <button id='editButton'> View </button>
                        </Link>
                        <button id='deleteButton' onClick={() => deleteArticle(article._id)}> Delete </button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="create-article-form">
                <div>
                    <label>Enter your article Title:
                        <input
                            type="text"
                            name="title"
                            value={inputs.title || ""}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>Enter your article author:
                        <input
                            type="text"
                            name="author"
                            value={inputs.author || ""}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>Enter your article body:
                        <textarea
                            name="body"
                            value={inputs.body || ""}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                <button type="submit" id='createButton'>Create Article</button>

            </form>
        </div>
    )
}

export default Articles;