import { Middleware } from "@reduxjs/toolkit";

const STORAGE_KEY = "searchJobs";

export const searchJobsMiddleware: Middleware =
  (store) => (next) => (action) => {
    const result = next(action);

    // Save to localStorage after any action that modifies search jobs
    // @ts-ignore
    if (action.type.startsWith("searchJobs/")) {
      const state = store.getState();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.searchJobs.jobs));
    }

    return result;
  };
