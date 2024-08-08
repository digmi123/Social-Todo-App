import Heart from "../assets/heart.svg?react";
import Bookmark from "../assets/bookmark.svg?react";

export default function SkeletonTodo() {
  return (
    <li className="box-border p-4 flex flex-col justify-between gap-3 w-full border border-slate-500 bg-color-white shadow-box-shadow rounded-xl">
      <div className="w-full flex items-center justify-between">
        <h2 className="font-bold">
          <div className="w-[180px] h-[28px] bg-gray-200 rounded-xl dark:bg-gray-700 mb-2.5"></div>
        </h2>
        <div className="flex gap-1">
          <label className="has-[:checked]:text-orange-700 cursor-pointer">
            <Heart fill="#d1d5db" />
          </label>

          <label className="has-[:checked]:text-orange-700 cursor-pointer">
            <Bookmark stroke="#d1d5db" />
          </label>
        </div>
      </div>
      <div className="h-[14px] bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>

      <div className="todo-info">
        <div className="h-[18px] w-[200px] bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-[16px] w-[80px] bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
      </div>

      <div className="flex w-full justify-end gap-4">
        <div className="h-[30px] w-[40px] bg-gray-200 rounded-md dark:bg-gray-700"></div>
        <div className="h-[30px] w-[60px] bg-gray-200 rounded-md dark:bg-gray-700"></div>
      </div>
    </li>
  );
}
