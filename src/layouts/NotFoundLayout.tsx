import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFoundLayout = () => {
  return (
    <div className="w-[500px] mx-auto mt-10 flex flex-col items-center gap-3">
      <div>My Friend App</div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        404 Not Found
      </h1>
      <p>
        <Link to="/">
          <Button>Back to HomePage</Button>
        </Link>
      </p>
    </div>
  );
};

export default NotFoundLayout;
