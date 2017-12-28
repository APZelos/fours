import { connect } from 'react-redux';
import Button from '../../components/Button';
import counterButtonClicked from '../../actions';

const mapDispatchToProps = dispatch => ({
  onClick() {
    const action = counterButtonClicked();
    dispatch(action);
  },
});

const CounterButton = connect(null, mapDispatchToProps)(Button);

export default CounterButton;
