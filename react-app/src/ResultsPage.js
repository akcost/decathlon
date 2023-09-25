import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from "./MyNavbar";
import ResultsComponent from "./ResultsComponent";

function ResultsPage() {
    return (
        <div>
            <MyNavbar/>
            <br/>
            <div className="mx-auto w-50">
                <ResultsComponent/>
            </div>
        </div>
    );
}

export default ResultsPage;
