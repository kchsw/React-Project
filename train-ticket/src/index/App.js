import React from 'react';
import { connect } from 'react-redux'
import './App.css';

function App(props) {
  return (
      <h1>Index page</h1>
  );
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
