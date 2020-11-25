import { fetch } from "./csrf";

export const RECEIVE_TICKETS = "RECEIVE_TICKETS";
export const REQUEST_TICKETS = "REQUEST_TICKETS";
export const RESET_TICKETS = "RESET_TICKETS";

export const requestTickets = () => ({
	type: REQUEST_TICKETS,
});

export const resetTickets = () => ({
	type: RESET_TICKETS,
});

export const receiveTickets = (data) => ({
	type: RECEIVE_TICKETS,
	payload: { tickets: data.tickets, receivedAt: Date.now() },
});

const fetchTickets = () => (dispatch) => {
	dispatch(requestTickets());
	return fetch(`/api/tickets`).then((res) =>
		dispatch(receiveTickets(res.data))
	);
};

const shouldFetchTickets = (state) => {
	const tickets = state.tickets;
	if (!tickets) {
		return true;
	}
	if (tickets.isFetching) {
		return false;
	}
	if (!tickets.lastUpdated) {
		return true;
	}
	return tickets.needsReset;
};

export const fetchTicketsIfNeeded = () => (dispatch, getState) => {
	if (shouldFetchTickets(getState())) {
		return dispatch(fetchTickets());
	}
};

const ticketsReducer = (
	state = { isFetching: false, needsReset: false, items: [] },
	action
) => {
	switch (action.type) {
		case RECEIVE_TICKETS:
			return {
				...state,
				isFetching: false,
				needsReset: false,
				items: action.payload.tickets,
				lastUpdated: action.payload.receivedAt,
			};
		case REQUEST_TICKETS:
			return { ...state, needsReset: false, isFetching: true };
		case RESET_TICKETS:
			return { ...state, needsReset: true };
		default:
			return state;
	}
};

export default ticketsReducer;
