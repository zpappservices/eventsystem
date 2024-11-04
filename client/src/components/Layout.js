import React from 'react'
import Header from './Header';

const Layout = ({ children }) => {
  return (
     <div className="w-full max-w-[1300px] mx-auto px-5 md:px-7 py-10 flex flex-col gap-5">
        <Header />
        {children}
     </div>
  );
}

export default Layout