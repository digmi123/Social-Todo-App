import FriendSection from "../components/FriendsSection";
import Todos from "../components/Todos";

export default function Home() {
  return (
    <div className="grid grid-cols-[1fr_3fr] x sm:grid-cols-[1fr] gap-x-4 p-4 h-full">
      {/* sm:grid-cols-[1fr] */}
      <FriendSection />
      <div
        id="divider"
        className="w-full h-[2px] my-3 bg-slate-300 hidden sm:block"
      ></div>
      <Todos />
    </div>
  );
}
