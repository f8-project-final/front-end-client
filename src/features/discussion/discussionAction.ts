import instance from "@/services";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchDiscussionsByUser = createAsyncThunk(
  "discussions/fetchDiscussionsByUser",
  async ({ userId }: { userId: string }) => {
    const { data } = await instance.get(`/discussions/${userId}`);
    return data;
  }
);

export const createDiscussionByUser = createAsyncThunk(
  "discussions/createDiscussionByUser",
  async ({ userId, title }: { userId: string; title: String }) => {
    const { data } = await instance.post(`/discussions`, { userId, title });
    return data;
  }
);

export const updateDiscussionById = createAsyncThunk(
  "discussions/updateDiscussionById",
  async ({ discussionId, title }: { discussionId: string; title: String }) => {
    const { data } = await instance.patch(`/discussions/${discussionId}`, {
      title,
    });
    return data;
  }
);

export const deleteDiscussionById = createAsyncThunk(
  "discussions/deleteDiscussionById",
  async ({ discussionId }: { discussionId: string }) => {
    await instance.delete(`/discussions/${discussionId}`);
    return discussionId;
  }
);

export const updateActiveDiscussionId = createAsyncThunk(
  "discussions/updateActiveDiscussion",
  ({ discussionId }: { discussionId: string | undefined }) => {
    return discussionId;
  }
);
