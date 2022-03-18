const Loading = ({white}) => {
  return (
    <div className={`w-16 h-16 border-b-2 rounded-full animate-spin ${white ? "border-white" : "border-gray-900"}`}>
      <span className="visually-hidden hidden">Loading...</span>
    </div>
  );
};

export default Loading;
