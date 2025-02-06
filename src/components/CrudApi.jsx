import React, { useState } from 'react';
import axios from 'axios';

const CrudApi = () => {
    const [apiUrl, setApiUrl] = useState(''); // State for API URL
    const [newData, setNewData] = useState(''); // State for new data input
    const [headersData, setHeadersData] = useState(''); // State for headers input
    const [requestType, setRequestType] = useState('GET'); // State for request type
    const [error, setError] = useState(''); // State for error messages
    const [response, setResponse] = useState(null); // State for API response

    // Function to send the request based on the selected type
    const sendRequest = async () => {
        if (!apiUrl) {
            setError('API URL cannot be empty.');
            return;
        }

        setError(''); // Clear previous errors
        setResponse(null); // Clear previous response

        try {
            let res;
            const data = newData ? JSON.parse(newData) : {}; // Parse JSON data from textarea
            const headers = headersData ? JSON.parse(headersData) : {}; // Parse JSON headers from textarea

            switch (requestType) {
                case 'GET':
                    res = await axios.get(apiUrl, { headers });
                    break;
                case 'POST':
                    res = await axios.post(apiUrl, data, { headers });
                    break;
                case 'PUT':
                    res = await axios.put(apiUrl, data, { headers });
                    break;
                case 'DELETE':
                    res = await axios.delete(apiUrl, { headers });
                    break;
                default:
                    throw new Error('Invalid request type');
            }

            setResponse(res.data); // Set the response data
        } catch (error) {
            setError('Error: ' + error.message);
        }
    };

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-10">
                <div className="w-full">
                    <h2>API URL</h2>
                    <input
                        type="text"
                        value={apiUrl}
                        onChange={(e) => setApiUrl(e.target.value)}
                        className="mb-2"
                        placeholder="https://your-api-url.example"
                    />
                    {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}

                    <h2>Data (for POST/PUT):</h2>
                    <textarea
                        value={newData}
                        onChange={(e) => setNewData(e.target.value)}
                        placeholder='{ "itemName": "value", .. }'
                        className="mb-2"
                        rows="4"
                        cols="50"
                    />

                    <h2>Headers (JSON format):</h2>
                    <textarea
                        value={headersData}
                        onChange={(e) => setHeadersData(e.target.value)}
                        placeholder='{ "Authorization": "Bearer your-api-key", "Custom-Header": "value" }'
                        className="mb-2"
                        rows="4"
                        cols="50"
                    />

                    <h2>Select Method:</h2>
                    <div className="flex flex-wrap items-center gap-2 my-2">
                        <label>
                            <input
                                type="radio"
                                value="GET"
                                checked={requestType === 'GET'}
                                onChange={(e) => setRequestType(e.target.value)}
                            />
                            GET
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="POST"
                                checked={requestType === 'POST'}
                                onChange={(e) => setRequestType(e.target.value)}
                            />
                            POST
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="PUT"
                                checked={requestType === 'PUT'}
                                onChange={(e) => setRequestType(e.target.value)}
                            />
                            PUT
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="DELETE"
                                checked={requestType === 'DELETE'}
                                onChange={(e) => setRequestType(e.target.value)}
                            />
                            DELETE
                        </label>
                    </div>
                    <button className="px-4 py-2 bg-blue-500 text-white mt-2 w-full" onClick={sendRequest}>Send Request</button> {/* Button to send request */}
            </div>
            <div className="w-full">
                <h2 className="mb-2">Results:</h2>
                <ul>
                    {response ? (
                        <li>{JSON.stringify(response)}</li> // Display response data
                    ) : (
                        <li>No data yet.</li>
                    )}
                </ul>
            </div>
        </div>
</div>
);
};

export default CrudApi;