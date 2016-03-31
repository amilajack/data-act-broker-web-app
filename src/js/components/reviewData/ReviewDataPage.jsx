/**
 * ReviewDataPage.jsx
 * Created by Mike Bray 3/31/16
 **/

import React, { PropTypes } from 'react';
import { kGlobalConstants } from '../../GlobalConstants.js';
import Navbar from '../SharedComponents/navigation/NavigationComponent.jsx';
import Table from '../SharedComponents/table/TableComponent.jsx';
import AddDataHeader from './../addData/AddDataHeader.jsx';
import Progress from '../SharedComponents/ProgressComponent.jsx';
import SubmitButton from '../SharedComponents/SubmitButton.jsx';

import ReviewDataContainer from '../../containers/reviewData/ReviewDataContainer.jsx';

import Request from 'superagent';

const propTypes = {

};

const defaultProps = {

};

class GetErrors extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    // onClick function for submit button
    onClick() {
        this.sendRequest(this.state.submissionId);
    }

    // Set submission id from text input
    setSubmissionId(element) {
        this.setState({ submissionId: element.target.value });
    }

    sendRequest(submissionID) {
        const file = Request.post(kGlobalConstants.API + 'submission_error_reports/')
            .withCredentials()
            .send({ 'submission_id': submissionID });
        file.end((errFile, res) => {
            if (errFile) {
                console.log(errFile + res);
            } else {
                this.setState({ response: true, csv_url: res.body });
            }
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12 usa-da-table-holder">
                        <h2>Enter the Submission ID to download validation errors.</h2>
                        <form className="form-inline">
                            <div className="form-group">
                                <label htmlFor="submission-id" className="sr-only">Submission ID</label>
                                <input className="form-control" id="submission-id" name="submission-id" placeholder="Submission ID" onChange={this.setSubmissionId.bind(this)} />
                                <a className="btn btn-default" onClick={this.onClick.bind(this, this.props.submissionId)}>Review Data</a>
                                {hasLink}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

class ErrorContent extends React.Component {
    render() {
        const data = [
            ['AvailabilityTypeCode', 'Required field AvailabilityTypeCode is missing', '17'],
            ['AllocationTransferAgencyIdentifier', 'AllocationTransferAgencyIdentifier is missing', '38']
        ];

        const errorHeaders = ['Field Name', 'Error', 'Number of Occurrences'];

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12 usa-da-table-holder">
                        <Table data={data} headers={errorHeaders} />
                    </div>
                </div>
            </div>
        );
    }
}

class DownloadLink extends React.Component {
    render() {
        // create array of download file links from request response data
        const dlLinks = [];

        for (const key in this.props.link_array) {
            dlLinks.push(<a href={this.props.link_array[key]} >Download Errors</a>);
        }

        return (
            <div>{dlLinks}</div>
        );
    }
}

class UnknownIDComponent extends React.Component {
    render() {
        return (
            <GetErrors />
        );
    }
}

export default class ReviewDataPage extends React.Component {
    render() {
        let currentComponent;
        const submissionID = this.props.submissionID;

        if (!this.props.submissionID) {
            currentComponent = <UnknownIDComponent />;
        } else {
            currentComponent = <ReviewDataContainer submissionID={submissionID} />;
        }

        return (
            <div>
                <Navbar activeTab="addData"/>
                <AddDataHeader />
                <div className="usa-da-content-light-gray">
                    <div className="container center-block">
                        <div className="row">
                            <Progress totalSteps={3} currentStep={2} />
                        </div>
                    </div>
                </div>
                {currentComponent}
            </div>
        );
    }
}
