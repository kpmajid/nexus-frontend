const AccountToggle = () => {
  return (
    <div className="border-b mb-4 mt-2 pb-4 border-stone-300">
      <button className="flex p-0.5 hover:bg-stone-200 rounded transition-colors relative gap-2 w-full">
        <img
          src=""
          alt=""
          className="size-8 rounded shrink-0 bg-violet-500 shadow"
        />
        <div className="text-start">
          <span className="text-sm font-medium block">Tom is Loading</span>
          <span className="text-xs block text-stone-500">tom@hover.dev</span>
        </div>
        <div className="absolute right-2 top-1/2 translate-y-[calc(-50%+4px)] text-xs"></div>
        <div className="absolute right-2 top-1/2 translate-y-[calc(-50%+4px)] text-xs"></div>
      </button>
    </div>
  );
};
export default AccountToggle;
