import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';
import withSpinner from '../../.components/with-spinner/with-spinner.component';
import CollectionOverview from './collection-overview.component';

/* Container pattern. This HOC wraps the components used in the shop page routes 
    This buys us the following:
        1. No call to render from the route tags
        2. no need for shop to worry about loading state. It shouldn't.
*/
const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionFetching
});

const CollectionOverviewContainer = compose(
    connect(mapStateToProps),
    withSpinner
)(CollectionOverview);

export default CollectionOverviewContainer;