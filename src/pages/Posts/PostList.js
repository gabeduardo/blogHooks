import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import moment from 'moment'
import DateRanger from '../../features/DateRanger'
import { Link } from 'react-router-dom'
import './index.scss'

// file obtained by: curl https://jsonplaceholder.typicode.com/posts > posts.json
import posts from '../../data/posts.json'
const categories = ['catagory1', 'category2', 'category3', 'category4']

// For random number see https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
const somePosts = posts.slice(0, 8).map(post => { return { ...post, category: categories[Math.floor(Math.random() * 4)] } })

const PostsList = () => {
    const [postList] = useState(somePosts)
    const [categoryList] = useState(categories)
    const [selectedCategory, setCategory] = useState("")
    const [selectedTextLength, setTextLength] = useState(40)
    const [dateRange, setDateRange] = useState({
        // moment() object is expected by react-dates
        start: moment('2019-01-01T00:00:00'),
        end: moment(),
    })

    const handleOptionChange = changeEvent => {
        setCategory(changeEvent.target.value)
    }
    const handleFormSubmit = formSubmitEvent => {
        formSubmitEvent.preventDefault()
        setCategory("")
    };
    const handleDropdownSelection = changeEvent => {
        // console.log('You selected ', changeEvent, ' from the Dropdown list')
        setTextLength(changeEvent)
    }

    const handleDateRange = (range) => {
        setDateRange(range)
    }

    const thePosts = postList.map(post => {
        let date1 = Object.assign({}, dateRange.start);
        let date2 = Object.assign({}, dateRange.end);
        if (
            (selectedCategory === "" || selectedCategory === post.category)
            &&
            moment(post.postDate).isAfter(moment(date1).subtract('1', 'days')) &&
            // moment(post.postDate).isBefore(moment(date2).add('1', 'days'))
            moment(post.postDate).isBefore(moment(date2))
        ) {
            return <ListGroup.Item
                key={post.id}
                variant="flush">
                <h5>{post.title}</h5>
                {post.body.substr(0, selectedTextLength) + ' ...'}
                <Link to={`/post/${post.id}`}><strong>read more</strong></Link>
                <p><small><strong>{post.category}</strong> {moment(post.postDate).format('MM/DD/YYYY')}</small></p>
            </ListGroup.Item>
        } else {
            return null;
        }
    })
    const theCategoryOptions = categoryList.map((category, i) => {
        return <Form.Check
            key={i}
            type="radio"
            onChange={handleOptionChange}
            value={category}
            label={category}
            checked={selectedCategory === category}
        >
        </Form.Check>
    })
    return (
        <>
            <Container className="Posts mb-4">
                <Row>
                    <Col className="p-4">
                        <Card style={{ height: 300 + 'px' }}>
                            <Card.Body>
                                <Card.Title className="px-4 pt-0 pb-0">Filter by Post category</Card.Title>
                                <Form onSubmit={handleFormSubmit}>
                                    <Form.Label>Select a category to filter posts</Form.Label>
                                    {theCategoryOptions}
                                    <Button className="mt-4" variant="primary" type="submit">
                                        Clear Selection
                        </Button>
                                </Form>
                            </Card.Body>
                        </Card>

                        <Card>
                            <Card.Title className="px-4 pt-0 pb-0">
                                Filter by Date Range
                </Card.Title>
                            <Card.Text className="ml-4">
                                From: {dateRange.start ? dateRange.start.format('MM/DD/YYYY') : null}
                            </Card.Text>
                            <Card.Text className="ml-4">
                                To: {dateRange.end ? dateRange.end.format('MM/DD/YYYY') : null}
                            </Card.Text>
                            <DateRanger
                                theStartDate={dateRange.start}
                                handleDateRange={handleDateRange}
                                className="DateRanger" />
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Title>
                                Posts <small>(text length: {selectedTextLength})</small>
                            </Card.Title>
                            <Dropdown className="mx-2 mb-2">
                                <Dropdown.Toggle className="mx-2" variant="primary" id="post-text-length">
                                    Set Text Length
                  </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey={40} onSelect={handleDropdownSelection}>40 chars</Dropdown.Item>
                                    <Dropdown.Item eventKey={80} onSelect={handleDropdownSelection}>80 chars</Dropdown.Item>
                                    <Dropdown.Item eventKey={120} onSelect={handleDropdownSelection}>120 chars</Dropdown.Item>
                                    <Dropdown.Item eventKey={170} onSelect={handleDropdownSelection}>160 chars</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <ListGroup>
                                {thePosts}
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default PostsList
