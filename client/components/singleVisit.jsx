import React from 'react';
import SingleDateLocation from './singleDateLocation';
import SingleVisitList from './singleVisitList';
import Navbar from './navbar';
import DeleteModal from './deleteModal';
import AddModal from './addModal';

class SingleVisit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visit: {},
      deleteModal: false
    };
    this.deleteModalToggle = this.deleteModalToggle.bind(this);
    this.deleteVisit = this.deleteVisit.bind(this);
  }

  componentDidMount() {
    fetch(`/api/visits/${this.props.visitId}`)
      .then(response => response.json())
      .then(data => this.setState({ visit: data }));
  }

  deleteModalToggle() {
    this.setState({ deleteModal: !this.state.deleteModal });
  }

  deleteVisit() {
    this.deleteModalToggle();
    fetch(`/api/visits/${this.props.visitId}`, {
      method: 'DELETE'
    });
    this.setState({ visit: {} });
    this.props.setView('visits');
  }

  render() {
    let deleteModal = null;
    if (this.state.deleteModal) {
      deleteModal = <DeleteModal deleteVisit={this.deleteVisit} deleteModalToggle={this.deleteModalToggle} />;
    }
    let addModal = null;
    if (this.props.addModal) {
      addModal = <AddModal addModalToggle={this.props.addModalToggle} setView={this.props.setView} />;
    }
    return (
      <div className="container mb-5 active1">
        <div className='row'>
          <div className='col-12 d-flex justify-content-between align-items-center mt-4'>
            <div onClick={() => this.props.setView('visits')} className="blueColor backFontSize backButton">&lt; Back</div>
            <SingleDateLocation data={this.state.visit} />
            <div><i onClick={this.deleteModalToggle} className="fas fa-ellipsis-h fa-3x visit-ellipsis"></i></div>
          </div>
        </div>
        <div className='row d-flex justify-content-center'>
          <div className='col-11'>
            <SingleVisitList diseases={this.state.visit.diseases} />
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <Navbar addModalToggle={this.props.addModalToggle} setView={this.props.setView} />
          </div>
        </div>
        {deleteModal}
        {addModal}
      </div>
    );
  }
}

export default SingleVisit;
