import { updateActiveDiscussionId } from "@/features/discussion/discussionAction";
import { AppDispatch } from "@/store/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Homepage = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(updateActiveDiscussionId({ discussionId: undefined }));
  }, []);
  return (
    <div>
      <div className="h-full flex justify-center mt-24">
        <h2 className="text-4xl">Welcome to My Friend App!</h2>
      </div>
    </div>
  );
};

export default Homepage;
