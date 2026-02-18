import { Copyright } from 'lucide-react';
const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-orange-200 to-pink-200 text-gray-700 py-3 mt-auto">
      <div className="text-center">
        <p className="text-sm">
          <Copyright className="inline mr-1" size={16} aria-hidden="true" />{' '}
          2026 PixelPoint. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
