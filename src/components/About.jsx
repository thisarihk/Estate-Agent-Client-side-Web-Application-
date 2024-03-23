import React from "react";

function About() {
    return (
        <div className="container-fluid mt-5">
            <div className="row py-5 justify-content-center">
                <div className="col-md-10">
                    <div className="card rounded-3 bg-secondary text-white">
                        <div className="p-4">
                            <h2 className="card-title text-center mb-0"><b>The Best Place To Find Your Dream Property</b></h2>
                        </div>
                        <div className="card-body d-flex justify-content-between">
                            <div className="col-md-6">
                                <p className="card-text fs-4 px-3" style={{ textAlign: 'justify' }}>
                                    <b>At Luxurious,</b> we understand that finding your dream home is about more than square footage; it's about discovering a sanctuary that reflects your success and celebrates your unique style. Let our passionate team guide you through a seamless journey to owning a piece of extraordinary.
                                </p>
                            </div>
                            <div className="col-md-6 d-flex justify-content-center align-items-center">
                                <img
                                    src="assets/images/profile/aboutus.png"
                                    alt="about"
                                    className="card-img-top"
                                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover', borderRadius: '10px' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default About;
