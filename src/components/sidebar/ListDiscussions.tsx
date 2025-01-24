import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  deleteDiscussionById,
  fetchDiscussionsByUser,
  updateActiveDiscussionId,
} from "@/features/discussion/discussionAction";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ListDiscussions() {
  const { discussions, activeDiscussionId } = useSelector(
    (state: RootState) => state.discussions
  );
  const dispatch = useDispatch<AppDispatch>();
  const nav = useNavigate();
  //exec
  useEffect(() => {
    const { _id }: any = JSON.parse(localStorage.getItem("user") || "{}");
    dispatch(fetchDiscussionsByUser({ userId: _id }));
  }, []);
  function handleDelete(e: any, discussionId: string) {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this discussion?")) {
      if (activeDiscussionId === discussionId) {
        dispatch(updateActiveDiscussionId({ discussionId: undefined }));
        nav("/");
      } else {
        nav(`/discussions/${activeDiscussionId}`);
      }
      dispatch(deleteDiscussionById({ discussionId }));
    }
  }
  //render
  return (
    <ul>
      {discussions.map((discussion) => (
        <li key={discussion._id} className="m-1 ">
          {activeDiscussionId === discussion._id ? (
            <Link
              to={`/discussions/${discussion._id}`}
              className="block p-3 pr-7 bg-gray-200 hover:bg-gray-300 rounded-md relative"
            >
              <span className="line-clamp-1">{discussion.title}</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <span
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-1/2 translate-y-[-50%] right-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="size-6 hover:text-gray-400 cursor-pointer"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                      />
                    </svg>
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {/* <DropdownMenuItem> */}
                  {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                    Rename */}
                  {/* <UpdateDiscussion discussionId={discussion._id} /> */}
                  {/* </DropdownMenuItem> */}
                  <DropdownMenuItem
                    onClick={(e) => handleDelete(e, discussion._id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </Link>
          ) : (
            <Link
              to={`/discussions/${discussion._id}`}
              className="block p-3 pr-7 hover:bg-gray-300 rounded-md relative"
            >
              <span className="line-clamp-1">{discussion.title}</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="absolute top-1/2 translate-y-[-50%] right-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="size-6 hover:text-gray-400 cursor-pointer"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                      />
                    </svg>
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {/* <DropdownMenuItem onClick={(e) => e.stopPropagation()}> */}
                  {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                    Rename */}
                  {/* <UpdateDiscussion discussionId={discussion._id} />
                  </DropdownMenuItem> */}
                  <DropdownMenuItem
                    onClick={(e) => handleDelete(e, discussion._id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}
