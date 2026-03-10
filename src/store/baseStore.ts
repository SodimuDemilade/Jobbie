import {createSlice} from "@reduxjs/toolkit";
import {type AppConfig, appConfig} from "../configs/appConfig.ts";
import {Job} from "@/util/type/Job.ts";

export type BaseState = {
    appStage: AppConfig["stage"],
    loading: boolean;
    appliedJobs: Job[];
};

const initialState: BaseState = {
    appStage: appConfig.stage,
    loading: false,
    appliedJobs: [],
};

const actions = {}
const baseSlice = createSlice({
    name: "baseStore",
    initialState,
    reducers: {
        setAppStage(state, {payload}: { payload: BaseState["appStage"] }) {
            state.appStage = payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setAppliedJobs: (state, action) => {
            state.appliedJobs = action.payload;
        },
        reset: () => ({...initialState}),
    },
});

export const baseStore = {
    mutation: baseSlice.actions,
    action: actions,
    reducer: baseSlice.reducer,
};
