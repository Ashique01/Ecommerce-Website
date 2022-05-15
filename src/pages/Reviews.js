import { Row, Col } from 'antd';
import React, { useEffect, useState } from 'react'
import DefautLayout from '../Components/DeafaultLayout';
import Review from '../Components/Review';


function Reviews() {
    const [reviews, setReviews] = useState([])
    useEffect(() => {
        fetch('reviews.json')
            .then(res => res.json())
            .then(data => setReviews(data));
    }, [])
    return (
        <DefautLayout>
            <div class="mgb-40 padb-30 auto-invert line-b-4 align-center">
                <h4 class="font-cond-l fg-accent lts-md mgb-10" contenteditable="false">Not Yet Convinced?</h4>
                <h1 class="font-cond-b fg-text-d lts-md fs-300 fs-300-xs no-mg" contenteditable="false">Read Customer Reviews</h1>
            </div>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                {reviews.map((review) => {
                    return <Col className="gutter-row" span={6}>
                        <Review review={review} />
                    </Col>
                })}
            </Row>

        </DefautLayout>
    )
}

export default Reviews