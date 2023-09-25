import React, {useState} from 'react';
import {Button, Col, Form, Row} from 'react-bootstrap';
import {addResult} from "./resultService";

const eventMeasurementTypes = {
    EVENT_100_METERS: 's',
    EVENT_LONG_JUMP: 'cm',
    EVENT_SHOT_PUT: 'm',
    EVENT_HIGH_JUMP: 'cm',
    EVENT_400_METERS: 's',
    EVENT_110_METERS_HURDLES: 's',
    EVENT_DISCUS_THROW: 'm',
    EVENT_POLE_VAULT: 'cm',
    EVENT_JAVELIN_THROW: 'm',
    EVENT_1500_METERS: 's',
};

const ResultForm = () => {
    const [eventName, setEventName] = useState('');
    const [resultValue, setResultValue] = useState(0.0);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if any field is empty before submitting the form
        if (!eventName || !resultValue) {
            alert('Please fill in all the fields before submitting.');
            return;
        }

        console.log("Event: " + eventName);
        console.log("Result: " + resultValue);
        // Create the new result object with the form values
        const newResult = {
            eventName: eventName,
            resultValue: resultValue,
        };

        addResult(newResult)
            .then((data) => {
                console.log('Result added successfully:', data);
                // Reset the form fields after successful submission
                setEventName('');
                setResultValue(0.0);
                window.location.reload();
            })
            .catch((error) => console.error('Error:', error));
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>


                <Form.Group controlId="eventName" className="mb-3">
                    <Row>
                        <Col sm={3}>
                            <Form.Label>Event Name:</Form.Label>
                        </Col>
                        <Col sm={9}>
                            <Form.Select
                                value={eventName}
                                onChange={(e) => setEventName(e.target.value)}>
                                <option>Select an event</option>
                                <option value="EVENT_100_METERS">100 METERS</option>
                                <option value="EVENT_LONG_JUMP">LONG JUMP</option>
                                <option value="EVENT_SHOT_PUT">SHOT PUT</option>
                                <option value="EVENT_HIGH_JUMP">HIGH JUMP</option>
                                <option value="EVENT_400_METERS">400 METERS</option>
                                <option value="EVENT_110_METERS_HURDLES">110 METERS HURDLES</option>
                                <option value="EVENT_DISCUS_THROW">DISCUS THROW</option>
                                <option value="EVENT_POLE_VAULT">POLE VAULT</option>
                                <option value="EVENT_JAVELIN_THROW">JAVELIN THROW</option>
                                <option value="EVENT_1500_METERS">1500 METERS</option>
                            </Form.Select>
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group controlId="result" className="mb-3">
                    <Row>
                        <Col sm={3}>
                            <Form.Label>Result(<b>{eventMeasurementTypes[eventName]}</b>):</Form.Label>
                        </Col>
                        <Col sm={9}>
                            <Form.Control
                                type="decimal"
                                value={resultValue}
                                onChange={(e) => setResultValue(e.target.value)}
                                maxLength={50}

                            />
                        </Col>
                    </Row>
                </Form.Group>

                <Button type="submit">Add Result</Button>
            </Form>
        </div>
    );
};

export default ResultForm;
