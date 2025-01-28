const ContextMenu = ({ children }) => {
  return (
    <div className="relative w-[200px] px-2 py-4 bg-gray-100 rounded-md shadow-md right-0 top-0 z-50">
      {children}
    </div>
  );
};

export default ContextMenu;
