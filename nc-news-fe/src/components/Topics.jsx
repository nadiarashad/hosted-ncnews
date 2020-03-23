import React, { Component } from 'react';
import { Link } from '@reach/router';
import * as api from '../api';
import ErrorPage from './ErrorPage'
import { Button, Card, ListGroup, Container, Row, Col } from 'react-bootstrap'
import styles from '../cssFiles/AllArticles.module.css'



class Topics extends Component {

    state = {
        topics: [],
        isLoading: true,
        hasError: false,
        articles: [],
        gotArticles: null
    }

    componentDidMount() {

        api.fetchAllTopics()
            .then(res => {
                this.setState({ topics: res.data.topics, isLoading: false })
            }).catch((err) => {
                this.setState({ isLoading: false, hasError: { msg: err.response.data.msg, status: err.response.data.status } })
            })
    }

    handleClick = (topic) => {

        api.handleTopicsByArticle(topic)
            .then(res => {
                this.setState({ articles: res.data.articles })
            })
    }


    render() {
        const { topics, isLoading, hasError, articles } = this.state

        if (isLoading === true) {
            return <h1>is loading...</h1>
        }
        if (hasError) {
            return <ErrorPage status={hasError.status} msg={hasError.msg} />
        }
        return (


            <Container>
                <Row>

                    <Card style={{ width: '40rem' }} >

                        {topics.map(topic => {
                            return (
                                <Col>
                                    <Card.Body className={styles.TopicArticles}>
                                        <ListGroup key={topic.slug}>
                                            <Card.Title>{topic.slug}</Card.Title>

                                            <Card.Text>
                                                {topic.description}

                                            </Card.Text>
                                            <> <Button variant="success" value={topic.slug} onClick={e => this.handleClick(e.target.value)}>View all related articles below</Button>{' '} </>
                                            <br></br><br></br>
                                        </ListGroup>
                                    </Card.Body>
                                </Col>
                            )
                        })
                        }


                        {articles.map(article => {
                            return (
                                <ListGroup key={article.article_id} >
                                    <Link to={`/articles/${article.article_id}`}> <Card.Title>{article.title}</Card.Title></Link>
                                    <Card.Text>  Author: {article.author}   </Card.Text><br></br><br></br>

                                </ListGroup>
                            )
                        })}
                    </Card>

                </Row>
            </Container>

        );
    }
}

export default Topics;


