import { connect } from 'react-redux';
import App from './App.js';
import { navigateToSearch } from '../src/ducks/router';
import { clearSearch } from '../src/ducks/search';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => ({
  searchString: state.search.searchString,
  lastSearch: state.search.lastSearch,
  router: state.router,
});

const mapDispatchToProps = { searchGifs: navigateToSearch, clearSearch };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
