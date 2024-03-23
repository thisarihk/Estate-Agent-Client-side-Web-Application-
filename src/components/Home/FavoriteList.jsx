import React from 'react';

const FavoriteList = ({ favorites, onPropertyClick, handleDragRemove, toggleModal, handleRemoveFavorite, handleClearFavorites }) => {

    if (!favorites || favorites.length === 0) {
        //no favorite properties message 
        return (
            <div className="row min-vh-100"  >
                <div className="col-12">
                    <h2>Favorites</h2>
                    <div role="alert" className="alert alert-secondary mt-4 d-flex flex-column align-items-center">
                        <img
                            src='assets/images/icons/no-favorites.png'
                            alt='No Favorites'
                            style={{ width: '50px', height: '50px' }}
                        />
                        <h3 className="ml-3">No Favorites Yet!</h3>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="row min-vh-100" >
            <div className="col-12">
                {/*clear all favorites button */}
                <div className="d-flex justify-content-between">
                    <h2>Favorites</h2>
                    <button className="btn btn-secondary" onClick={handleClearFavorites}>Clear All <i className="fa fa-trash" aria-hidden="true"></i>
                    </button>
                </div>

                {/* List of favorite properties */}
                <div className="row mt-3">
                    {favorites.map(property => (
                        <div key={property.id} className="col-sm-6 col-md-12 mb-4" >
                            {/* Individual card for each favorite property */}
                            <div
                                className="card shadow-sm max-h-100"
                                draggable
                                onDragStart={() => handleDragRemove(property)}
                                style={{ cursor: 'pointer' }}
                            >
                                <img
                                    src={property.picture[0]}
                                    alt={property.picture[0]}
                                    className="card-img-top"
                                    style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                                    onClick={() => { onPropertyClick(property); toggleModal(); }}
                                />

                                <div className="card-body" onClick={() => { onPropertyClick(property); toggleModal(); }}>
                                    <h3 className="card-title">{property.type}</h3>
                                    <div style={{ height: '70px', overflow: 'hidden' }}>
                                        <div dangerouslySetInnerHTML={{ __html: property.description.substring(0, 100) ? property.description.substring(0, 100) + '...' : '' }} />
                                    </div>
                                    <p className="card-text mt-3">Price: Rs. {property.price} /=</p>
                                    <p className="card-text">Date Added: {property.added.day}<sup>th</sup> {property.added.month} {property.added.year}</p>
                                </div>
                                {/* Remove from favorites button */}
                                <button
                                    className="btn btn-secondary m-3"
                                    onClick={() => handleRemoveFavorite(property)}
                                >
                                    Remove from Favorites
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FavoriteList;
