import { Github, Twitter } from 'lucide-react'; // Install Lucide or replace with SVG

function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-subtle py-6 mt-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white tracking-wide">
              Algorithm Visualizer
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Making algorithms easier to understand, one step at a time.
            </p>
          </div>

          <div className="flex space-x-6">
            <a
              href="https://github.com/your-repo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-transform transform hover:scale-110"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com/yourhandle"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-300 transition-transform transform hover:scale-110"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className=" text-center text-xs text-gray-400 dark:text-gray-500">
          <span className="font-bold">Algorithm Visualizer</span>. Built with ❤️ by Himanshu
        </div>
      </div>
    </footer>
  );
}

export default Footer;
