import { connect } from 'react-redux';
import App from './App.js';
import { searchGifs } from '../src/ducks/gifs';
import { withRouter } from 'react-router-dom';

const mapStateToProps = undefined;

const mapDispatchToProps = { searchGifs };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
