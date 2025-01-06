import AddDiscussion from "./AddDiscussion";
import ListDiscussions from "./ListDiscussions";

export default function SideBar() {
  return (
    <aside className="w-80 border-r h-screen relative">
      <div className="py-3">
        <div className="text-center mb-3">
          <AddDiscussion />
        </div>
        <div className="absolute top-[60px] left-0 right-0 bottom-3 overflow-y-auto">
          <ListDiscussions />
        </div>
      </div>
    </aside>
  );
}
