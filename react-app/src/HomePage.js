import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import MyNavbar from "./MyNavbar";
import ResultForm from "./ResultForm";

function HomePage() {
    return (
        <div>
            <MyNavbar/>
            <br/>
            <div className="mx-auto w-50">
                <h2>Add a result</h2>
                <br/>
                <div className="mx-auto ">
                    <ResultForm/>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
