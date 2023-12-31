import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import MyNavbar from "./MyNavbar";
import ResultsComponent from "./ResultsComponent";
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
                <br/>
                <ResultsComponent/>
            </div>
        </div>
    );
}

export default HomePage;
