import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-10 mt-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
        {/* Column 1 */}
        <div className="text-center md:text-left">
          <h2 className="text-white text-lg font-semibold mb-4">Products</h2>
          <ul className="space-y-2">
            {["Flutter", "React", "Android", "iOS"].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-blue-500 duration-300">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2 */}
        <div className="text-center md:text-left">
          <h2 className="text-white text-lg font-semibold mb-4">Design to Code</h2>
          <ul className="space-y-2">
            {["Figma plugin", "Templates"].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-blue-500 duration-300">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 */}
        <div className="text-center md:text-left">
          <h2 className="text-white text-lg font-semibold mb-4">Comparison</h2>
          <ul className="space-y-2">
            {[
              "DhiWise vs Anima",
              "DhiWise vs Appsmith",
              "DhiWise vs FlutterFlow",
              "DhiWise vs Monday Hero",
              "DhiWise vs Retool",
              "DhiWise vs Bubble",
              "DhiWise vs Figma Dev Mode",
            ].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-blue-500 duration-300">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4 */}
        <div className="text-center md:text-left">
          <h2 className="text-white text-lg font-semibold mb-4">Company</h2>
          <ul className="space-y-2">
            {["About Us", "Contact Us", "Career", "Terms of Service", "Privacy Policy"].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-blue-500 duration-300">{item}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div className="container mx-auto px-4 mt-10 pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <span className="text-white text-xl font-semibold">
            Cilli<span className="text-blue-500">Blog</span>
          </span>
        </div>
        <div className="mb-4 md:mb-0 text-center">
          &copy; Prateek Maheshwari
        </div>
        <div className="flex space-x-5">
          <a href="#" className="hover:text-white transition duration-300">
            <FaGithub size={20} />
          </a>
          <a href="#" className="hover:text-white transition duration-300">
            <BsYoutube size={20} />
          </a>
          <a href="#" className="hover:text-white transition duration-300">
            <FaLinkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
