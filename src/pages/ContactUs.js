import React, { useState } from 'react'
import DefautLayout from '../Components/DeafaultLayout'
import "../resources/contactUs.css"
import emailjs from '@emailjs/browser';
import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';

function ContactUs() {

    function sendEmail(e) {
        e.preventDefault();

        emailjs.sendForm('service_r3j1fpj', 'template_yx6ggrh', e.target, 'user_aOZl7OOsxjQX5a21ep9H1')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        e.target.reset();
    };
    const [size, setSize] = useState('large');
    const handleSizeChange = e => {
        setSize(e.target.value);
    };
    return (
        <DefautLayout>
            <div className="wrapper rounded d-flex align-items-stretch">
                <div className="bg-yellow">
                    <div className="text-white"> <span className="far fa-envelope"></span> </div>
                    <div className="pt-5 cursive"> Please describe your Opinion in a nutshell </div>
                    <div className="pt-sm-5 pt-5 cursive mt-sm-5">We need your email to reach you back </div>
                </div>
                <div className="contact-form">
                    <div className="h3">Contact Us</div>
                    <form onSubmit={sendEmail}>
                        <div className="form-group pt-3"> <label for="message">Message</label> <textarea name="message" className="form-control" required></textarea> </div>
                        <div className="d-flex align-items-center flex-wrap justify-content-between pt-4">
                            <div className="form-group pt-lg-2 pt-3"> <label for="name">Your Name</label> <input type="text" name="name" className="form-control" required /> </div>
                            <div className="form-group pt-lg-2 pt-3"> <label for="name">Your Email</label> <input type="email" name="email" className="form-control" required /> </div>
                            <div className="form-group pt-lg-2 pt-3"> <label for="name">Subject</label> <input type="text" name="subject" className="form-control" required /> </div>
                        </div>
                        <Button className='mt-3' type="primary" size={size}>
                            Submit
                        </Button>
                    </form>
                </div>
            </div>
        </DefautLayout>
    )
}

export default ContactUs