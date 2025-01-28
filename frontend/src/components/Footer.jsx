import {
  BookmarkIcon,
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <BookmarkIcon className="w-8 h-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                Organizer
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              Your all-in-one solution for organizing and managing your digital
              content.
            </p>
            <div className="flex space-x-4">
              <TwitterIcon className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
              <GithubIcon className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
              <LinkedinIcon className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-3">
              <li className="text-gray-600 hover:text-gray-900 cursor-pointer">
                Features
              </li>
              <li className="text-gray-600 hover:text-gray-900 cursor-pointer">
                Pricing
              </li>
              <li className="text-gray-600 hover:text-gray-900 cursor-pointer">
                Documentation
              </li>
              <li className="text-gray-600 hover:text-gray-900 cursor-pointer">
                Updates
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              <li className="text-gray-600 hover:text-gray-900 cursor-pointer">
                About
              </li>
              <li className="text-gray-600 hover:text-gray-900 cursor-pointer">
                Blog
              </li>
              <li className="text-gray-600 hover:text-gray-900 cursor-pointer">
                Careers
              </li>
              <li className="text-gray-600 hover:text-gray-900 cursor-pointer">
                Contact
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-100">
          <p className="text-center text-gray-600">
            © 2025 Organizer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
