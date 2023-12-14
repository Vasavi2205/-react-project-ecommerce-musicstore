// Footer.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white p-3">
      <Container>
        <Row>
          <Col className="text-center">
            {/* Your footer content goes here */}
            <p>&copy; 2023 Your Company Name</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;