import instance from "@/services";
import { AppDispatch } from "@/store/store";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateActiveDiscussionId } from "@/features/discussion/discussionAction";
import { useForm } from "react-hook-form";
import UpdateDiscussion from "@/components/sidebar/UpdateDiscussion";

const HomeDiscussionDetailPage = () => {
  //init
  const { discussionId } = useParams();
  const [messages, setMessages]: any = useState([]);
  const [isScrollToBot, setIsScrollToBot] = useState(0);
  const [discussion, setDiscussion] = useState({
    title: "",
    _id: "",
  });
  const dispatch = useDispatch<AppDispatch>();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      text: "",
    },
  });
  // Hàm kiểm tra trạng thái scroll
  const [page, setPage] = useState(1);
  const messagesContainerRef = useRef(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNullData, setIsNullData] = useState(false);
  const container = messagesContainerRef.current as any;
  const handleScroll = () => {
    const currentScrollY = container.scrollTop;
    if (currentScrollY < lastScrollY && currentScrollY < 200 && !isNullData) {
      container.style.overflow = "hidden";
      (async () => {
        const previousScrollHeight = container.scrollHeight;
        const { data } = await instance.get(
          `/messages/${discussionId}?limit=20&page=${page + 1}`
        );
        if (data.length !== 0) {
          setMessages([...data, ...messages]);
          setPage(page + 1);
          const newScrollHeight = container.scrollHeight;
          container.scrollTop =
            currentScrollY + (newScrollHeight - previousScrollHeight);
        } else {
          setIsNullData(true);
        }
        container.style.overflow = "auto";
      })();
    }
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    dispatch(updateActiveDiscussionId({ discussionId }));
    (async () => {
      const { data } = await instance.get(
        `/messages/${discussionId}?limit=20&page=1`
      );
      setMessages(data);
      const res = await instance.get(`/discussion/${discussionId}`);
      setDiscussion(res.data);
      dispatch(updateActiveDiscussionId({ discussionId }));
      setIsScrollToBot(isScrollToBot + 1);
      setIsNullData(false);
      setPage(1);
    })();
  }, [discussionId]);

  async function handleInputMessage(dataBody: { text: string }): Promise<void> {
    try {
      // Add user message to db
      const { data } = await instance.post(`/messages`, {
        discussionId,
        sender: "user",
        text: dataBody.text,
      });
      setMessages([...messages, data]);
      setIsScrollToBot(isScrollToBot + 1);
      reset();
      // Fetch bot message from server
      const response = await instance.post(`/messages/response`, {
        discussionId,
        sender: "user",
        text: JSON.stringify(
          [...messages, data].filter(
            (_: any, i: any) => i > messages.length - 6
          )
        ),
      });
      setMessages([...messages, data, response.data]);
      setIsScrollToBot(isScrollToBot + 2);
    } catch (err) {
      console.error(err);
    }
  }

  //scroll to bot
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [isScrollToBot]);

  //ren
  return (
    <div className="flex-grow flex flex-col relative">
      <div className="p-3 border-b border-dashed flex justify-between">
        <h2 className="">{discussion.title}</h2>
        <div>
          {discussion._id && <UpdateDiscussion discussionId={discussion._id} />}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 top-[49px] flex-grow flex flex-col">
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto"
          onScroll={handleScroll}
        >
          <ul className="space-y-5 p-3">
            {/* {
              <div ref={messagesStartRef} className="flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                  />
                </svg>
              </div>
            } */}
            {messages.map((message: any) => {
              if (message.sender === "user") {
                return (
                  <li className="text-right" key={message._id}>
                    <div className="bg-blue-500 text-white p-2 px-4 rounded-md w-fit ml-auto">
                      {message.text}
                    </div>
                  </li>
                );
              } else {
                return (
                  <li key={message._id}>
                    <div className="bg-gray-300 p-2 px-4 rounded-md w-fit">
                      {message.text}
                    </div>
                  </li>
                );
              }
            })}
            <div ref={messagesEndRef} />
          </ul>
        </div>
        <div className="p-3">
          <form
            className="flex w-full items-center space-x-2"
            onSubmit={handleSubmit(handleInputMessage)}
          >
            <Input
              type="text"
              {...register("text")}
              name="text"
              id="text"
              placeholder="Type a message..."
            />
            <Button type="submit">Send</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HomeDiscussionDetailPage;
