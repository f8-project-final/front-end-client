import { createSlice } from "@reduxjs/toolkit";
import {
  createDiscussionByUser,
  deleteDiscussionById,
  fetchDiscussionsByUser,
  updateActiveDiscussionId,
} from "./discussionAction";
import { IDiscussion } from "@/interfaces/IDiscussion";

interface discussionState {
  discussions: IDiscussion[];
  activeDiscussionId?: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: discussionState = {
  discussions: [],
  activeDiscussionId: null,
  loading: false,
  error: null,
};

const discussionSlice = createSlice({
  name: "discussions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiscussionsByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDiscussionsByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.discussions = action.payload;
      })
      .addCase(fetchDiscussionsByUser.rejected, (state) => {
        state.loading = false;
        state.error = "Error";
      })
      .addCase(createDiscussionByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDiscussionByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.discussions = [...state.discussions, action.payload];
      })
      .addCase(createDiscussionByUser.rejected, (state) => {
        state.loading = false;
        state.error = "Error";
      })
      .addCase(deleteDiscussionById.fulfilled, (state, action) => {
        state.discussions = state.discussions.filter(
          (discussion) => discussion._id !== action.payload
        );  
      })
      .addCase(updateActiveDiscussionId.fulfilled, (state, action) => {
        state.activeDiscussionId = action.payload;
      });
  },
});

const discussionReducer = discussionSlice.reducer;
export default discussionReducer;
