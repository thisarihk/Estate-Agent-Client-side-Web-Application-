import React from 'react';

const PropertyList = ({ properties, onPropertyClick, addToFavorites, handleDragStart, toggleModal }) => {
    if (!properties || properties.length === 0) {
        return <div>No properties found.</div>;
    }

    return (
        <div className="row">
            <h2 className="col-12 mb-4">Properties</h2>
            {/* Mapping through the properties to display each property */}
            {properties?.map(property => (
                <div key={property.id} className="mb-4 col-sm-6 col-md-6 col-lg-4">
                    <div
                        className="card shadow-sm h-100"
                        draggable // Allow the card to be draggable
                        onDragStart={() => handleDragStart(property)} // Handle drag start event
                        style={{ cursor: 'pointer' }} // Set cursor to pointer
                    >
                        <img
                            src={property.picture[0]}
                            alt={property.type}
                            className="card-img-top"
                            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                            onClick={() => { onPropertyClick(property); toggleModal(); }} // Open modal on image click
                        />

                        <div className="card-body" onClick={() => { onPropertyClick(property); toggleModal(); }}>
                            <h3 className="card-title">{property.type}</h3>
                            <div style={{ height: '70px', overflow: 'hidden' }}>
                                <div dangerouslySetInnerHTML={{ __html: property.description.substring(0, 100) ? property.description.substring(0, 100) + '...' : '' }} />
                            </div>
                            <p className="card-text mt-3">Price: Rs. {property.price} /=</p>
                            <p className="card-text">Date Added: {property.added.day}<sup>th</sup> {property.added.month} {property.added.year}</p>
                        </div>
                        {/* Add to Favorites button */}
                        <button
                            className="btn btn-secondary m-3"
                            onClick={() => addToFavorites(property)}
                        >
                            Add to Favorites
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PropertyList;
