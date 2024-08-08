import PropTypes from "prop-types";

export default function FriendsSearchForm({ handleSearch }) {
  return (
    <form
      onSubmit={handleSearch}
      className="flex justify-between gap-4 border-2 border-solid border-slate-300 rounded-md shadow-box-shadow px-2 py-1"
    >
      <input
        type="text"
        name="search"
        placeholder="Search for new friends"
        className="p-1"
      />
      <button
        type="submit"
        className="bg-color-success px-2 py-1 rounded-md text-color-white"
      >
        Search
      </button>
    </form>
  );
}

FriendsSearchForm.PropTypes = {
  handleSeacrh: PropTypes.func,
};
