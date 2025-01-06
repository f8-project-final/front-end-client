import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { discussionSchema } from "@/schemas/discussionSchema";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { updateDiscussionById } from "@/features/discussion/discussionAction";
import { useEffect } from "react";
import instance from "@/services";
import { DialogClose } from "@radix-ui/react-dialog";

export default function UpdateDiscussion(props: any) {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    (async () => {
      const { data } = await instance.get(`/discussion/${props.discussionId}`);
      reset({
        title: data.title,
      });
    })();
  }, [props.discussionId]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(discussionSchema),
    defaultValues: {
      title: "",
    },
  });
  function handleUpdateDiscussion(data: any) {
    if (!data) return;
    dispatch(
      updateDiscussionById({
        discussionId: props.discussionId,
        title: data.title,
      })
    );
    window.location.reload();
  }
  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">
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
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(handleUpdateDiscussion)}>
          <DialogHeader>
            <DialogTitle>Update Discussion</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name" className="">
                Title
              </Label>
              <Input
                id="name"
                // value="Pedro Duarte"
                className="col-span-3"
                placeholder="Enter the title"
                {...register("title")}
              />
              {errors.title && (
                <span className="text-red-500 text-sm">
                  {errors.title?.message}
                </span>
              )}
            </div>
          </div>
          <DialogFooter>
            <DialogClose>
              <Button>Update</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
