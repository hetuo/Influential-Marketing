import { connect } from 'react-redux';
import Payment from '../components/Payment';

const mapState = ({ payment }) => ({
	payment: payment
});

const mapDispatch = null;

export default connect(mapState, mapDispatch)(Payment);
