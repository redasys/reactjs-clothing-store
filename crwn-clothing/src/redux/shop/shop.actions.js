import shopActionType from './shop.types';
import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
    type: shopActionType.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = collectionsMap => ({
    type: shopActionType.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
});

export const fetchCollectionsError = errMsg => ({
    type: shopActionType.FETCH_COLLECTIONS_ERROR,
    payload: errMsg
});

export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections');
        dispatch(fetchCollectionsStart());

        collectionRef.get().then(snapshot => {
            console.log(snapshot);
            const collectionsMap = convertCollectionSnapshotToMap(snapshot);
            dispatch(fetchCollectionsSuccess(collectionsMap));
        }).catch(error => {
            dispatch(fetchCollectionsError(error.message));
        });
    };
}