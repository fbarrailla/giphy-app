import { connect } from 'react-redux';
import SelectedGifModal from './SelectedGifModal';
import { getSelectedGif, unselectGif } from '../../ducks/gifs';

const mapStateToProps = state => ({
  selectedGif: getSelectedGif(state),
});

const mapDispatchToProps = {
  unselectGif,
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectedGifModal);
