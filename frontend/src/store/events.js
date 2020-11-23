import { fetch } from "./csrf";
import { combineReducers } from "redux";

export const REQUEST_EVENTS = "REQUEST_EVENTS";
export const RECEIVE_EVENTS = "RECEIVE_EVENTS";
export const SELECT_EVENTCATEGORYID = "SELECT_EVENTCATEGORYID";

export const selectEventCategoryId = (eventCategoryId) => ({
	type: SELECT_EVENTCATEGORYID,
	payload: { eventCategoryId },
});

export const requestEvents = (eventCategoryId) => ({
	type: REQUEST_EVENTS,
	payload: { eventCategoryId },
});

export const receiveEvents = (eventCategoryId, data) => ({
	type: RECEIVE_EVENTS,
	payload: { eventCategoryId, events: data.events, receivedAt: Date.now() },
});

const fetchEvents = (eventCategoryId) => (dispatch) => {
	dispatch(requestEvents(eventCategoryId));
	return fetch(`/api/events?eventCategoryId=${eventCategoryId}`).then((res) =>
		dispatch(receiveEvents(eventCategoryId, res.data))
	);
};

const shouldFetchEvents = (state, eventCategoryId) => {
	const events = state.events.eventsByEventCategoryId[eventCategoryId];
	if (!events) {
		return true;
	}
	if (events.isFetching) {
		return false;
	}
	return true;
};

export const fetchEventsIfNeeded = (eventCategoryId) => (
	dispatch,
	getState
) => {
	if (shouldFetchEvents(getState(), eventCategoryId)) {
		return dispatch(fetchEvents(eventCategoryId));
	}
};

//defaults to first category
const selectedEventCategoryId = (state = 1, action) => {
	switch (action.type) {
		case SELECT_EVENTCATEGORYID:
			return action.payload.eventCategoryId;
		default:
			return state;
	}
};

const events = (
	state = {
		isFetching: false,
		items: [],
	},
	action
) => {
	switch (action.type) {
		case REQUEST_EVENTS:
			return {
				...state,
				isFetching: true,
			};
		case RECEIVE_EVENTS:
			return {
				...state,
				isFetching: false,
				items: action.payload.events,
				lastUpdated: action.payload.receivedAt,
			};
		default:
			return state;
	}
};

const eventsByEventCategoryId = (state = {}, action) => {
	switch (action.type) {
		case RECEIVE_EVENTS:
		case REQUEST_EVENTS:
			return {
				...state,
				[action.payload.eventCategoryId]: events(
					state[action.payload.eventCategoryId],
					action
				),
			};
		default:
			return state;
	}
};

export const eventsReducer = combineReducers({
	eventsByEventCategoryId,
	selectedEventCategoryId,
});
