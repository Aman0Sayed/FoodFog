import { Github, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-sage-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-sage-500 to-sage-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">FF</span>
              </div>
              <h3 className="text-xl font-serif font-semibold">FoodFog</h3>
            </div>
            <p className="text-sage-200 mb-6 max-w-md">
              Your ultimate culinary companion for discovering recipes, planning meals, and creating memorable dining experiences.
            </p>
            <div className="flex space-x-4">
                <a href="https://github.com/Aman0Sayed" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5 text-sage-300 hover:text-white cursor-pointer transition-colors" />
                </a>
                <a href="mailto:aman0sayed@gmail.com">
                  <Mail className="w-5 h-5 text-sage-300 hover:text-white cursor-pointer transition-colors" />
                </a>
            </div>
          </div>

          {/* Support - moved to right side */}
          <div className="md:col-span-1 md:col-start-3 md:justify-self-end">
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sage-200 text-right">
              <li><Link to="/support" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="/support" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/support" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="border-t border-sage-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <span className="text-sage-300 text-sm">Built with:</span>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
                  <span className="text-xs text-sage-300">React.js</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
                  <span className="text-xs text-sage-300">Node.js</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-green-600 rounded-sm"></div>
                  <span className="text-xs text-sage-300">MongoDB</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-orange-500 rounded-sm"></div>
                  <span className="text-xs text-sage-300">Firebase</span>
                </div>
              </div>
            </div>
            <p className="text-sage-300 text-sm">
              © 2024 FoodFog. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
