import Layout from '@/components/dashboard/Layout'
import MyEvents from '@/components/eventanalysis/MyEvents';
import SalesAnalysis from '@/components/eventanalysis/SalesAnalysis';
import React from 'react'

const eventanalysis = () => {
  return (
     <Layout>
        <div className="w-full flex flex-col gap-[50px]">
           <div className="w-full max-w-[1000px] bg-white px-5 py-3 pb-[60px] drop-shadow-lg">
              <MyEvents />
           </div>

           <div className="w-full max-w-[1000px] bg-white px-5 py-6 pb-10 drop-shadow-lg">
              <SalesAnalysis />
           </div>
        </div>
     </Layout>
  );
}

export default eventanalysis