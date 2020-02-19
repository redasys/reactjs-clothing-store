import { takeLatest, put, all, call } from 'redux-saga/effects';
import UserActionTypes from './user.types';
import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils';
import { signInSuccess, signInError, logoutSuccess, logoutError, signUpError, signUpSuccess } from './user.actions';

function* getSnapshotFromUserAuth(userAuth, additionalData) {
    const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
    const userSnapshot = yield userRef.get();
    yield put(
        signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
    );
}

function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);
    } catch (e) {
        yield put(
            signInError({ errorMessage: e.message })
        );
    }
}

function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);

    } catch (e) {
        yield put(signInError({ errorMessage: e.message }));
    }
}

function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth);
    } catch (error) {
        yield put(signInError({ errorMessage: error.message }));
    }
}

function* logout() {
    try {
        yield auth.signOut();
        yield put(logoutSuccess({
            currentUser: null
        }))       
    } catch (error) {
        alert(error.message);
        yield put(logoutError({ errorMessage: error.message }));
    }
}


function* signUp({payload: {email, password, displayName}}) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess({user, additionalData:{displayName}}));
    } catch (error) {
        yield put(signUpError(error.message));
    }
}

function* signInAfterSignUp({payload: {user, additionalData}}){
    yield getSnapshotFromUserAuth(user, additionalData);
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onLogoutStart() {
    yield takeLatest(UserActionTypes.LOGOUT_START, logout)
}

export function* onSignupStart(){
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess(){
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(isUserAuthenticated),
        call(onLogoutStart),
        call(onSignupStart),
        call(onSignUpSuccess)
    ])
}



