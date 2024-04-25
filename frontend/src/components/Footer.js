import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className=' bg-secondary text-white' >
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className=" d-flex align-items-center">
          <Link to="/" className="mb-3 me-2 mb-md-0 text-white text-decoration-none lh-1">
            This app connects you to a world of culinary delights, bringing your favorite dishes right to your doorstep.
          </Link>
          <span className=" text-muted">&copy; 2023 EpicBites, Inc</span>
        </div>
      </footer>
    </div>
  );
}
