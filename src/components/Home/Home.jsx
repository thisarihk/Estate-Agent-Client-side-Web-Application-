import React, { useState } from 'react';
import SearchForm from './SearchForm';
import PropertyList from './PropertyList';
import PropertyDetail from './PropertyDetail';
import propertiesData from '../../data/properties.json';
import FavoriteList from './FavoriteList';
import { useEffect } from 'react';


//convert month names to numbers
const monthToNumber = {
    "January": 0,
    "February": 1,
    "March": 2,
    "April": 3,
    "May": 4,
    "June": 5,
    "July": 6,
    "August": 7,
    "September": 8,
    "October": 9,
    "November": 10,
    "December": 11
};

function Home() {
    const { properties } = propertiesData;
    const [propertiesArray, setPropertiesArray] = useState(properties); // Set initial properties to data from JSON
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [selectedFavorite, setSelectedFavorite] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
    const [normalSearch, setNormalSearch] = useState("");


    //Function to filter properties
    const filterProperties = (filters) => {
        let filteredProperties = filters;

        filteredProperties = properties.filter(property => {
            //type filter
            if (filters.propertyType && filters.propertyType.toLowerCase() !== 'any' && property.type.toLowerCase() !== filters.propertyType.toLowerCase()) {
                return false;
            }

            //price filter
            if ((filters.minPrice && property.price < filters.minPrice) || (filters.maxPrice && property.price > filters.maxPrice)) {
                return false;
            }

            //bedrooms filter
            if ((filters.minBedrooms && property.bedrooms < filters.minBedrooms) || (filters.maxBedrooms && property.bedrooms > filters.maxBedrooms)) {
                return false;
            }

            //date added filter
            if (filters.startDate || filters.endDate) {
                const monthNumber = monthToNumber[property.added.month];
                const addedDate = new Date(property.added.year, monthNumber, property.added.day).setHours(12, 0, 0, 0); // Set time to midday to avoid timezone issues
                const startDate = new Date(filters.startDate).setHours(0, 0, 0, 0); // Set time to midnight to avoid timezone issues
                const endDate = new Date(filters.endDate).setHours(23, 59, 59, 999); // Set time to just before midnight to avoid timezone issues

                // Check if start date is provided and added date is after it
                if (filters.startDate) {
                    if ((addedDate <= startDate)) {
                        return false;
                    }
                }
                // Check if both start and end dates are provided and added date is between them
                if (filters.startDate && filters.endDate) {
                    if ((addedDate <= startDate) || (addedDate >= endDate)) {
                        return false;
                    }
                }
            }

            // Check postcode area filter postcode area with lowercase
            if (filters.postcodeArea && !property.location.toLowerCase().includes(filters.postcodeArea.toLowerCase())) {
                return false;
            }

            return true;
        });

        setPropertiesArray(filteredProperties);
    };

    // Function to handle property selection
    const handlePropertyClick = (property) => {
        setSelectedProperty(property);
    };

    // Reset properties to original list from JSON
    const resetProperties = () => {
        setPropertiesArray(properties);
        setNormalSearch("");
    };

    const addToFavorites = (property) => {
        if (!favorites.includes(property)) {
            setFavorites(prevFavorites => [...prevFavorites, property]);
        } else {
            alert('Property already in favorites');
        }
    };

    // Set selected favorite property
    const handleDragStart = (property) => {
        setSelectedFavorite(property);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    // Add property to favorites list
    const handleDrop = (e) => {
        e.preventDefault();
        if (selectedFavorite) {
            // check if property is already in favorites
            if (favorites.includes(selectedFavorite)) {
                alert('Property already in favorites');
                return;
            }

            addToFavorites(selectedFavorite);

        }
    };

    // Set selected favorite property
    const handleDragRemove = (property) => {
        setSelectedFavorite(property);
    };

    // Prevent default behavior of dragover event
    const handleDragRemoveOver = (e) => {
        e.preventDefault();
    }

    // Remove property from favorites list
    const handleRemoveDrop = (e) => {
        e.preventDefault();
        if (selectedFavorite) {
            setFavorites(prevFavorites => prevFavorites.filter(favorite => favorite !== selectedFavorite));
        }
    };

    // Toggle modal
    const toggleModal = () => {
        setShowModal(!showModal);
    };

    // Toggle advanced search form
    const handleAdvancedSearch = () => {
        setIsAdvancedSearch(!isAdvancedSearch);
    }

    // Remove favorite from favorites list
    const handleRemoveFavorite = (property) => {
        setFavorites(prevFavorites => prevFavorites.filter(favorite => favorite !== property));
    }

    // Clear all favorites
    const handleClearFavorites = () => {
        setFavorites([]);
    }


    // normal search
    useEffect(() => {
        const filteredProperties = properties.filter((property) =>
            property.bedrooms.toString().includes(normalSearch) ||
            property.type.toLowerCase().includes(normalSearch.toLowerCase()) ||
            property.tenure.toLowerCase().includes(normalSearch.toLowerCase()) ||
            property.description.toLowerCase().includes(normalSearch.toLowerCase()) ||
            property.location.toLowerCase().includes(normalSearch.toLowerCase()) ||
            property.price.toString().includes(normalSearch)
        );
        setPropertiesArray(filteredProperties);
    }, [properties, normalSearch]);

    return (
        <>
            <div className={`container-fluid mt-5 bg-dark ${isAdvancedSearch ? "" : "custom-nav"}`}>
                <div className="py-3 px-1 d-flex flex-column gap-2">
                    <div className="d-flex justify-content-end gap-2">
                        <div className="w-100">
                            <input type="text" className="form-control w-100" placeholder="Search" onChange={(e) => setNormalSearch(e.target.value)} value={normalSearch} />
                        </div>
                        <button className="btn btn-secondary mr-2 text-nowrap" onClick={resetProperties}>Reset</button>
                        <button className="btn btn-secondary text-nowrap" onClick={handleAdvancedSearch}>Advanced Search</button>
                    </div>

                    {/* Advanced Search Form */}
                    <div className="">
                        {isAdvancedSearch && <SearchForm onSearch={filterProperties} />}
                    </div>
                </div>
            </div>

            <div className={`container-fluid ${isAdvancedSearch ? "" : "home-container"}`} >

                <div className="row">
                    {/* Favorites List */}
                    <div className="col-md-4 pt-3 d-md-none" style={{ borderLeft: '2px dashed #ccc' }} onDragOver={handleDragOver} onDrop={handleDrop}>
                        <FavoriteList
                            favorites={favorites}
                            onPropertyClick={handlePropertyClick}
                            handleDragOver={handleDragOver}
                            handleDrop={handleDrop}
                            handleDragRemove={handleDragRemove}
                            toggleModal={toggleModal}
                            handleRemoveFavorite={handleRemoveFavorite}
                            handleClearFavorites={handleClearFavorites}
                        />
                    </div>

                    {/* Properties List*/}
                    <div className="col-md-8 pt-3">
                        <div onDragOver={handleDragRemoveOver} onDrop={handleRemoveDrop}>
                            <PropertyList
                                properties={propertiesArray}
                                onPropertyClick={handlePropertyClick}
                                addToFavorites={addToFavorites}
                                handleDragStart={handleDragStart}
                                toggleModal={toggleModal}

                            />
                        </div>
                        {showModal &&
                            <PropertyDetail property={selectedProperty} showModal={showModal} toggleModal={toggleModal} />
                        }
                    </div>

                    {/* Favorites List on Larger Screens */}
                    <div className="col-md-4 pt-3 d-none d-md-block" style={{ borderLeft: '2px dashed #ccc' }} onDragOver={handleDragOver} onDrop={handleDrop}>
                        <FavoriteList
                            favorites={favorites}
                            onPropertyClick={handlePropertyClick}
                            handleDragOver={handleDragOver}
                            handleDrop={handleDrop}
                            handleDragRemove={handleDragRemove}
                            toggleModal={toggleModal}
                            handleRemoveFavorite={handleRemoveFavorite}
                            handleClearFavorites={handleClearFavorites}
                        />
                    </div>
                </div>
            </div>
        </ >

    );
}

export default Home;
