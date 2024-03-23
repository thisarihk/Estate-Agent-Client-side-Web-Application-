import React, { useState } from 'react';
import { DropdownList, NumberPicker, DateTimePicker } from 'react-widgets';
import "react-widgets/styles.css";

const SearchForm = ({ onSearch }) => {
    const inputStyle = {
        marginBottom: '5px',
        borderRadius: '5px',
        width: '100%',
        fontSize: '16px',
    };

    const buttonStyle = {
        padding: '10px 20px',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
        border: 'none',
        width: '100%',
        marginBottom: '5px',
    };

    const [propertyType, setPropertyType] = useState(null);
    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);
    const [minBedrooms, setMinBedrooms] = useState(null);
    const [maxBedrooms, setMaxBedrooms] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [postcodeArea, setPostcodeArea] = useState(null);


    const handleSearchClick = () => {
        //object with filters based on form inputs
        const filters = {
            propertyType: propertyType,
            minPrice: minPrice,
            maxPrice: maxPrice,
            minBedrooms: minBedrooms,
            maxBedrooms: maxBedrooms,
            startDate: startDate,
            endDate: endDate,
            postcodeArea: postcodeArea
        };

        onSearch(filters);
    };

    // Function to handle clear button click and reset form inputs
    const handleClearClick = () => {
        setPropertyType(null);
        setMinPrice(null);
        setMaxPrice(null);
        setMinBedrooms(null);
        setMaxBedrooms(null);
        setStartDate(null);
        setEndDate(null);
        setPostcodeArea(null);

        if (onSearch) {
            onSearch({});
        }
    }

    return (
        <div className='p-3 border rounded' style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h3 className='text-center text-secondary'>
                Advanced Search
            </h3>

            {/* Dropdown for property type */}
            <DropdownList
                data={['House', 'Flat', 'Any']}
                value={propertyType}
                onChange={value => setPropertyType(value)}
                placeholder="Select Property Type"
                style={inputStyle}
            />

            {/* Number pickers for price and bedrooms */}
            <NumberPicker
                style={inputStyle}
                format="currency"
                value={minPrice}
                onChange={value => setMinPrice(value)}
                placeholder="Min Price"
                min={0}
            />
            <NumberPicker
                style={inputStyle}
                format="currency"
                value={maxPrice}
                onChange={value => setMaxPrice(value)}
                placeholder="Max Price"
                min={0}
            />

            <NumberPicker
                style={inputStyle}
                value={minBedrooms}
                onChange={value => setMinBedrooms(value)}
                placeholder="Min Bedrooms"
                min={0}
            />
            <NumberPicker
                style={inputStyle}
                value={maxBedrooms}
                onChange={value => setMaxBedrooms(value)}
                placeholder="Max Bedrooms"
                min={0}
            />

            {/* DateTimePickers for start and end date */}
            <DateTimePicker
                style={inputStyle}
                value={startDate}
                onChange={value => setStartDate(value)}
                placeholder="Start Date"
            />
            <DateTimePicker
                style={inputStyle}
                value={endDate}
                onChange={value => setEndDate(value)}
                placeholder="End Date"
            />

            <input
                className="form-control "
                style={inputStyle}
                value={postcodeArea}
                onChange={event => setPostcodeArea(event.target.value)}
                placeholder="Postcode Area"
                type="text"
            />

            {/* Search and Clear buttons */}
            <button style={buttonStyle} className="btn btn-secondary" onClick={handleSearchClick}>Search</button>

            <button style={buttonStyle} className="btn btn-secondary" onClick={handleClearClick}>Clear</button>
        </div>
    );
};

export default SearchForm;
