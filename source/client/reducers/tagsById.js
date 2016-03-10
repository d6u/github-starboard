import { indexBy, prop, assoc } from 'ramda';
import { UPDATE_TAGS } from '../actions/serverActions';
import { ADD_TAG, DELETE_TAG, GET_ALL_TAGS } from '../actions/creators';

export default function (state = {}, { type, payload }) {
  switch (type) {
  case `${GET_ALL_TAGS}_FULFILLED`:
    return indexBy(prop('id'), payload.data);
  case `${ADD_TAG}_FULFILLED`:
    const newTag = payload.data;
    return assoc(newTag.id, newTag, state);
  // case UPDATE_TAGS:
  //   return payload;
  // case `${DELETE_TAG}_PENDING`:
  //   return reject(state, ['id', payload.id]);
  default:
    return state;
  }
}
