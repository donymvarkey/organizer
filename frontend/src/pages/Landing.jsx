import {
  ArrowRightIcon,
  BookmarkIcon,
  FolderIcon,
  VideotapeIcon,
} from "lucide-react";
import ProductMockUp from "../components/ProductMockUp";
import Footer from "../components/Footer";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <BookmarkIcon className="w-8 h-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                Organizer
              </span>
            </div>
            <a
              href="/auth/signin"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content Section */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Organize your digital world in one place
                </h1>
                <p className="text-xl text-gray-600">
                  Save and organize your favorite websites and videos in a
                  beautiful, easy-to-use interface.
                </p>
              </div>

              {/* Features */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="p-3 bg-indigo-100 rounded-lg">
                      <FolderIcon className="w-6 h-6 text-indigo-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Custom Directories
                    </h3>
                    <p className="text-gray-600">
                      Create and manage folders to keep your links organized
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="p-3 bg-indigo-100 rounded-lg">
                      <BookmarkIcon className="w-6 h-6 text-indigo-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Universal Bookmarking
                    </h3>
                    <p className="text-gray-600">
                      Save any URL with a single click
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="p-3 bg-indigo-100 rounded-lg">
                      <VideotapeIcon className="w-6 h-6 text-indigo-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Video Support
                    </h3>
                    <p className="text-gray-600">
                      Save videos from any platform in your collections
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div>
                <a
                  href="/auth/signin"
                  className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                >
                  Get Started Free
                  <ArrowRightIcon className="ml-2 w-5 h-5" />
                </a>
                <p className="mt-3 text-sm text-gray-500">
                  No credit card required
                </p>
              </div>
            </div>

            {/* Right Image Section */}
            <ProductMockUp />
          </div>

          {/* Stats Section */}
          <div className="mt-24 w-full bg-white rounded-2xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-2">
                  100K+
                </div>
                <div className="text-gray-600">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-2">
                  1M+
                </div>
                <div className="text-gray-600">Bookmarks Saved</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-2">
                  50K+
                </div>
                <div className="text-gray-600">Organized Collections</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Landing;
