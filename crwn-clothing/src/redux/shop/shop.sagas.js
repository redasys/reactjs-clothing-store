//put == dispatch
import { takeLatest, call, put } from 'redux-saga/effects';
import shopActionType from './shop.types';
import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';
import { fetchCollectionsError, fetchCollectionsSuccess } from './shop.actions';

export function* fetchCollectionsAsync() {
    try {
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionSnapshotToMap, snapshot);
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (err) {
        yield put(fetchCollectionsError(err.message));
    }
}

export function* fetchCollectionsStart() {
    yield takeLatest(shopActionType.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
    );
}