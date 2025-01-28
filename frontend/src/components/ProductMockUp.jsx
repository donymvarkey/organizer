import { BookmarkIcon } from "lucide-react";

const ProductMockUp = () => {
  return (
    <div className="lg:block w-full">
      <div className="relative">
        {/* Product Screenshot */}
        <div className="bg-white p-4 rounded-2xl shadow-xl">
          <div className="bg-gray-100 rounded-xl aspect-[4/3] flex flex-col items-start justify-center">
            <div className="flex items-center mx-5">
              <BookmarkIcon className="w-8 h-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                Organizer
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 p-6 w-full">
              {/* Mock UI Elements */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-100 rounded w-1/2"></div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-100 rounded w-1/2"></div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-100 rounded w-1/2"></div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-100 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
        {/* Decorative Elements */}
        <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-indigo-50 rounded-full -z-10"></div>
        <div className="absolute -top-4 -left-4 w-48 h-48 bg-indigo-50 rounded-full -z-10"></div>
      </div>
    </div>
  );
};

export default ProductMockUp;
