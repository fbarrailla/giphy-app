import { connect } from 'react-redux';
import App from './App.js';
import { navigateToSearch } from '../src/ducks/router';
import { withRouter } from 'react-router-dom';

const mapStateToProps = undefined;

const mapDispatchToProps = { searchGifs: navigateToSearch };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
