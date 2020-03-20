import Axios from 'axios';


const BaseURL = 'https://nc-news-heroku.herokuapp.com/api/'

export const fetchArticle = (article_id) => {

    return Axios.get(`${BaseURL}articles/${article_id}`, { params: { article_id } })
}

export const fetchingVotes = (article_id, num) => {
    return Axios.patch(`${BaseURL}articles/${article_id}`, { inc_votes: num, article_id })
}

export const handleCommentVoteUpdates = (article_id, num) => {
    return Axios.patch(`${BaseURL}articles/${article_id}/`, { inc_votes: num, article_id })
}

export const fetchAllArticles = () => {
    return Axios.get(`${BaseURL}articles/`)
}

export const handlingSort = (value) => {
    return Axios.get(`${BaseURL}articles?sort_by=${value}`, { params: { value } })
}

export const handlingOrder = (value) => {
    return Axios.get(`${BaseURL}/articles?order=${value}`, { params: { value } })
}

export const handleFilter = (tofilterby) => {
    console.log(tofilterby, 'in handle filter')
    console.log('in api request')
    return Axios.get(`${BaseURL}/articles?author=${tofilterby}`, { params: { tofilterby } })

}

export const fetchAllComments = () => {
    return Axios.get(`${BaseURL}/comments`)
}

// export const postComment = (article_id, newComment) => {
//     console.log(newComment, 'newcomment')
//     const { username, body } = newComment

//     return Axios.post(
//         `https://nc-news-heroku.herokuapp.com/api/articles/${article_id}/comments`, { params: { article_id, username, body } }
//     )

// }

export const fetchCommentsPerID = (article_id) => {

    return Axios.get(`${BaseURL}articles/${article_id}/comments`, { params: { article_id } })
}

export const handlingDelete = (props) => {
    return Axios.delete(`${BaseURL}/comments/${props}`, { params: { props } })
}

export const fetchAllTopics = () => {
    return Axios.get("https://nc-news-heroku.herokuapp.com/api/topics")
}


export const handleTopicsByArticle = (topic) => {
    return Axios.get(`${BaseURL}articles?topic=${topic}`)
}