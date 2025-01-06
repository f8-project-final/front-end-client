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
import { createDiscussionByUser } from "@/features/discussion/discussionAction";

export default function AddDiscussion() {
  const dispatch = useDispatch<AppDispatch>();

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
  function handleAddDiscussion(data: any) {
    if (!data) return;
    const { _id }: any = JSON.parse(localStorage.getItem("user") || "{}");
    dispatch(
      createDiscussionByUser({
        userId: _id,
        title: data.title,
      })
    );
    reset();
  }
  const handleCloseDialog = () => {
    reset(); // Reset form khi đóng dialog
  };
  return (
    <Dialog onOpenChange={(open) => !open && handleCloseDialog()}>
      <DialogTrigger asChild>
        <Button>
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add Discussion
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(handleAddDiscussion)}>
          <DialogHeader>
            <DialogTitle>Add Discussion</DialogTitle>
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
            <Button>Add</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
