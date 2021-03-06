import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

function ViewArticle() {
    let API_URL = process.env.API_URL || 'http://localhost:4000'
    const development = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
    if (!development) API_URL = 'https://league-it-out.herokuapp.com';
    const [article, setArticle] = useState([])
    const [inputs, setInputs] = useState({});
    const { id } = useParams();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);
        updateArticle(inputs.title, inputs.body, inputs.author)
    }

    function updateArticle(title, articleBody, author) {
        axios.put(`${API_URL}/articles/` + id, { title: title, body: articleBody, author: author })
            .then(function (response) {
                console.log(response.data)
                getArticle();
            }).catch(function (error) {
                console.log(error);
            })
    }

    const deleteArticle = (id) => {
        console.log("Delete article: ", id)
        axios.delete(`${API_URL}/articles/` + id, {})
            .then(function (response) {
                console.log(response.data)
                getArticle();
            }).catch(function (error) {
                console.log(error);
            })
    }


    const getArticle = useCallback(() => {
        axios.get(`${API_URL}/articles/` + id, {})
            .then(function (response) {
                console.log(response.data)
                setArticle(response.data)
                setInputs({
                    title: response.data.title,
                    body: response.data.body,
                    author: response.data.author
                })
            }).catch(function (error) {
                console.log(error);
            })
    }, [id, API_URL]);


    useEffect(() => {
        getArticle();
    }, [getArticle])


    return (
        <div className="articles">
            <div className="backgroundNewsDiv">
                <h1> League It Out News </h1>
                <p> Never miss out on important information, be informed by fellow leaguers or create an article yourself to help out others too! </p>
            </div>
            <br />
            <div className="article" key={id}>
                <h1>{article.title}</h1>
                <div className="article-body">{article.body}</div>
                <span>Written by: {article.author}</span>
                <div className="crudButtons">
                    <button id='deleteButton' onClick={() => deleteArticle(article._id)}> Delete </button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="create-article-form">
                <div>
                    <label>Enter Your Article Title:
                        <input
                            type="text"
                            name="title"
                            value={inputs.title || ""}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>Enter Your Article Author:
                        <input
                            type="text"
                            name="author"
                            value={inputs.author || ""}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>Enter Your Article Body:
                        <br />
                        <textarea
                            name="body"
                            value={inputs.body || ""}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                <button type="submit" id='createButton'>Update Article</button>

            </form>
        </div>
    )
}

export default ViewArticle;