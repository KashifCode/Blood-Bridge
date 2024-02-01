import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type allEventsState = {
    events: any[];
}

type initialStateType = {
    value: allEventsState;
};

const initialState = {
    value: {
        events: []
    } as allEventsState,
} as initialStateType

interface EventPayload {
    events: any[];
}

export const allEvents = createSlice({
    name: 'allEvents',
    initialState,
    reducers: {
        updateAllEvents: (state, action: PayloadAction<EventPayload>) => {
            return {
                value: {
                    events: action.payload.events
                }
            }
        }
    }
});

export const { updateAllEvents } = allEvents.actions;
export default allEvents.reducer;