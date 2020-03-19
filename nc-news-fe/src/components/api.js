import Axios from 'axios';


const BaseURL = 'https://nc-news-heroku.herokuapp.com/api/'

export const fetchArticle = (article_id) => {

    return Axios.get(`${BaseURL}articles/${article_id}`, { params: { article_id } })
}


export const fetchingVotes = (article_id, num) => {
    return Axios.patch(`${BaseURL}articles/${article_id}`, { params: { inc_votes: num, article_id } })
}