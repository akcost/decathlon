import React, {useEffect, useState} from 'react';
import {Col, Form, Row} from 'react-bootstrap';
import {fetchResults, deleteResult} from './resultService';

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

const eventNamesSimplified = {
    EVENT_100_METERS: '100 METERS',
    EVENT_LONG_JUMP: 'LONG JUMP',
    EVENT_SHOT_PUT: 'SHOT PUT',
    EVENT_HIGH_JUMP: 'HIGH JUMP',
    EVENT_400_METERS: '400 METERS',
    EVENT_110_METERS_HURDLES: '110 METERS HURDLES',
    EVENT_DISCUS_THROW: 'EVENT DISCUS THROW',
    EVENT_POLE_VAULT: 'POLE VAULT',
    EVENT_JAVELIN_THROW: 'JAVELIN_THROW',
    EVENT_1500_METERS: '1500 METERS',
};

const ResultsComponent = () => {
    const [results, setResults] = useState([]);
    const [sortCriteria, setSortCriteria] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');

    const [sortOrders, setSortOrders] = useState({
        name: 'asc',
        codeName: 'asc',
        phone: 'asc',
    });

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchResults()
            .then((data) => {
                // Sort the results by event name before saving to state
                const sortedData = data.sort((a, b) => a.eventName.localeCompare(b.eventName));
                setResults(sortedData);
            })
            .catch((error) => console.error('Error:', error));
    }, []);

    const handleDeleteResult = (id) => {
        deleteResult(id)
            .then(() => {
                setResults((prevResults) => prevResults.filter((result) => result.id !== id));
            })
            .catch((error) => console.error('Error:', error));
    };

    const handleSortChange = (event) => {
        const selectedSortCriteria = event.target.value;
        setSortCriteria(selectedSortCriteria);

        const currentSortOrder = sortOrders[selectedSortCriteria];
        const newSortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc';

        setSortOrder(newSortOrder);
        setSortOrders({...sortOrders, [selectedSortCriteria]: newSortOrder});
        sortResults(selectedSortCriteria, newSortOrder);
    };

    const handleSearchChange = (event) => {
        const {value} = event.target;
        setSearchTerm(value);
    };

    const sortResults = (criteria, order) => {
        const sortedResults = [...results];

        sortedResults.sort((a, b) => {
            if (criteria === 'name') {
                return order === 'asc' ? a.eventName.localeCompare(b.eventName) : b.eventName.localeCompare(a.eventName);
            } else {
                return order === 'asc'
                    ? a[criteria].toString().localeCompare(b[criteria].toString())
                    : b[criteria].toString().localeCompare(a[criteria].toString());
            }
        });

        setResults(sortedResults);
    };

    const getSortSymbol = (criteria) => {
        if (sortCriteria === criteria) {
            return sortOrder === 'asc' ? '∆' : '∇';
        }
        return '';
    };

    // Filter results based on the search term
    const filteredResults = results.filter(
        (result) =>
            result.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            result.resultValue.toString().includes(searchTerm) ||
            result.points.toString().includes(searchTerm)
    );

    return (
        <div>
            <h1 className="font-bold">Results</h1>
            <br/>
            <Row>
                <Col sm={12}>
                    <Form.Group controlId="search" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Search results"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col sm={3} className="font-bold hover: cursor-pointer select-none"
                     onClick={() => handleSortChange({target: {value: 'eventName'}})}>
                    Event name {getSortSymbol('eventName')}
                </Col>
                <Col sm={3} className="font-bold hover: cursor-pointer select-none"
                     onClick={() => handleSortChange({target: {value: 'resultValue'}})}>
                    Result {getSortSymbol('resultValue')}
                </Col>
                <Col sm={3} className="font-bold hover: cursor-pointer select-none"
                     onClick={() => handleSortChange({target: {value: 'points'}})}>
                    Points {getSortSymbol('points')}
                </Col>
                <Col sm={3}></Col>
            </Row>

            {filteredResults.map((result) => (
                <Row key={result.id}>
                    <Col sm={3} className="break-words"> {eventNamesSimplified[result.eventName]}</Col>
                    <Col sm={3}
                         className="break-words"> {result.resultValue} {eventMeasurementTypes[result.eventName]}</Col>
                    <Col sm={3} className="break-words"> {result.points}</Col>
                    <Col sm={3} className="text-end break-words">
                        <a className="no-underline text-red-600 font-bold" href=""
                           onClick={() => handleDeleteResult(result.id)}>
                            DELETE
                        </a>
                    </Col>
                </Row>
            ))}
        </div>
    );
};

export default ResultsComponent;
