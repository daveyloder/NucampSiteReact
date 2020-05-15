import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Campsites } from './campsites.js';
import { Comments } from './comments.js';
import { Partners } from './partners.js';
import { Promotions } from './promotions';
import { createForms } from 'react-redux-form';
import { InitialFeedback } from './forms';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            campsites: Campsites,
            comments: Comments,
            partners: Partners,
            promotions: Promotions,
            ...createForms({
                feedbackForm: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
        
    );
    return store;
};