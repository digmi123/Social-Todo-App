export default function NotificationsBar() {
  //   const { loading, userInfo } = useUser();

  //   if (loading) return <h1>Loading</h1>;

  return (
    <aside className="flex flex-col gap-4 border-2 border-slate-200 rounded-md p-4 ">
      {Array.from({ length: 10 }).map((_, index) => {
        return (
          <div
            key={index}
            className="flex items-center justify-between gap-4 border-2 border-slate-300 rounded-md p-2"
          >
            <div className="flex gap-4 items-center">
              <div className="min-w-[40px] min-h-[40px] rounded-full border-2 border-black"></div>
              <p>Alex (Alex@gmail.com) Liked your todo TODO_TITLE</p>
            </div>
          </div>
        );
      })}
    </aside>
  );
}
