import React from 'react'
import "../resources/Review.css"


function Review({ review }) {
    const { name, description, image, occupation } = review
    return (
        <div className='reviews mt-3'>

            <img src={image} className="wpx-100 img-round mgb-20 text-center" title="" alt="" data-edit="false" data-editor="field" data-field="src[Image Path]; title[Image Title]; alt[Image Alternate Text]" />
            <p className="fs-110 font-cond-l" contenteditable="false">{description}</p>
            <h5 className="font-cond mgb-5 fg-text-d fs-130" contenteditable="false">{name}</h5>
            <small className="font-cond case-u lts-sm fs-80 fg-text-l" contenteditable="false">Business Woman - New York</small>



        </div>
    )
}

export default Review