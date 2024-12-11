import React from 'react';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Dashboard() {
    return (
        <Container fluid className="dashboard-container text-white text-center p-5" style={{
            backgroundImage: 'url("https://archive.org/download/pulse_background/pulse_background.jpg")',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            minHeight: '100vh'
        }}>
            <h1>Welcome to Pulse</h1>
            <h2>Use the options in the navigation bar to find what is going on near you!</h2>

            <Row className="my-4">
                <Col>
                    <h3 className="text-start">Movies In Theaters Now</h3>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Carousel interval={3000} pause="hover" indicators={false} controls={false}>
                        <Carousel.Item>
                            <Row>
                                <Col md={3} className="d-flex justify-content-center">
                                    <img
                                        src="https://i.etsystatic.com/56270335/r/il/ce6b9d/6481599580/il_794xN.6481599580_ieke.jpg"
                                        alt="Moana 2"
                                        className="img-fluid rounded"
                                        style={{ height: '200px' }}
                                    />
                                </Col>
                                <Col md={3} className="d-flex justify-content-center">
                                    <img
                                        src="https://preview.redd.it/megathread-wicked-2024-trailer-v0-zr10s2ppm1ic1.jpeg?auto=webp&s=71df15b3c68e1ec3ad0924dbb6b8476814c842a1"
                                        alt="Wicked"
                                        className="img-fluid rounded"
                                        style={{ height: '200px' }}
                                    />
                                </Col>
                                <Col md={3} className="d-flex justify-content-center">
                                    <img
                                        src="https://d32qys9a6wm9no.cloudfront.net/images/movies/poster/85/fedce497491780e5a5d856d0602eebc0_original.jpg?t=1700044284"
                                        alt="Gladiator II"
                                        className="img-fluid rounded"
                                        style={{ height: '200px' }}
                                    />
                                </Col>
                                <Col md={3} className="d-flex justify-content-center">
                                    <img
                                        src="https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster--dark-mode.png/0/images/masterrepository/Fandango/235131/Y2K_2024.jpg"
                                        alt="Y2K"
                                        className="img-fluid rounded"
                                        style={{ height: '200px' }}
                                    />
                                </Col>
                            </Row>
                        </Carousel.Item>

                        <Carousel.Item>
                            <Row>
                                <Col md={3} className="d-flex justify-content-center">
                                    <img
                                        src="https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster--dark-mode.png/0/images/masterrepository/Fandango/237414/Flow_Janus_Poster_27x40_02_web.jpg"
                                        alt="Flow"
                                        className="img-fluid rounded"
                                        style={{ height: '200px' }}
                                    />
                                </Col>
                                <Col md={3} className="d-flex justify-content-center">
                                    <img
                                        src="https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster--dark-mode.png/0/images/masterrepository/Fandango/235359/WRB_Tree1Sheet6_RGB_1.jpg"
                                        alt="The Wild Robot"
                                        className="img-fluid rounded"
                                        style={{ height: '200px' }}
                                    />
                                </Col>
                                <Col md={3} className="d-flex justify-content-center">
                                    <img
                                        src="https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster--dark-mode.png/0/images/masterrepository/Fandango/237067/ANORA_Poster_Full.jpg"
                                        alt="Anora"
                                        className="img-fluid rounded"
                                        style={{ height: '200px' }}
                                    />
                                </Col>
                                <Col md={3} className="d-flex justify-content-center">
                                    <img
                                        src="https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster--dark-mode.png/0/images/MasterRepository/fandango/236932/WLIT_DOM_Online_Teaser_1-Sheet%202_Fin_10.jpg"
                                        alt="We Live In Time"
                                        className="img-fluid rounded"
                                        style={{ height: '200px' }}
                                    />
                                </Col>
                            </Row>
                        </Carousel.Item>
                    </Carousel>
                </Col>
            </Row>
        </Container>
    );
}
