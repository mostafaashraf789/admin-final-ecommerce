
import RevenueSection from './../../componants/RevenueSection';
import AnalyticsSection from './../../componants/AnalyticsSection';
import WebsiteVisitors from './../../componants/WebsiteVisitors';
import ProductSection from './../../componants/ProductSection';
import OrderTable from './../../componants/OrderTable';

function MainPage() {
  return (
    <>
      <AnalyticsSection />
      <WebsiteVisitors />
      <RevenueSection />
      
      <ProductSection />
      
      

      <OrderTable />  
    </>
  );
}

export default MainPage;
