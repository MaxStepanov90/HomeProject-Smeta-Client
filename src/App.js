import React from 'react';
import './App.css';
import Footer from "./components/Generic/Footer";
import NavigationBar from "./components/Generic/NavigationBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ProjectList from "./components/Project/List/ProjectList";
import ProjectForm from "./components/Project/ProjectForm";
import {TabContainer} from "react-bootstrap";
import ProjectInfo from "./components/Project/Info/ProjectInfo";
import Welcome from "./components/Welcome/Welcome";
import EstimateDetailsTabs from "./components/EstimateDetail/Tabs/EstimateDetailsTabs";
import PaymentList from "./components/Payment/PaymentList/PaymentList";
import EstimateDetailForm from "./components/EstimateDetail/EstimateDetailForm";
import MarkUpList from "./components/MarkUp/List/MarkUpList";
import MarkUpForm from "./components/MarkUp/MarkUpForm";
import EstimateForm from "./components/Estimate/EstimateForm";
import PaymentForm from "./components/Payment/PaymentForm";

function App() {
    return (
        <Router>
            <NavigationBar/>
            <TabContainer>
                <Row>
                    <Col lg={12} className="margin-top">
                        <Switch>
                            <Route path="/" exact component={Welcome}/>
                            <Route path="/addProject" component={ProjectForm}/>
                            <Route path="/addEstimate" component={EstimateForm}/>
                            <Route path="/addEstimateDetail" component={EstimateDetailForm}/>
                            <Route path="/addPayment" component={PaymentForm}/>
                            <Route path="/projects" component={ProjectList}/>
                            <Route path="/payments" component={PaymentList}/>
                            <Route path="/markUps" component={MarkUpList}/>
                            <Route path="/projectInfo/:id" component={ProjectInfo}/>
                            <Route path="/estimate/:id" component={EstimateDetailsTabs}/>
                            <Route path="/markUp/:id" component={MarkUpForm}/>
                            <Route path="/paymentList" component={PaymentList}/>
                        </Switch>
                    </Col>
                </Row>
            </TabContainer>
            <Footer/>
        </Router>

    )
        ;
}

export default App;
