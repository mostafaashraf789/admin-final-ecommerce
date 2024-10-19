

import MainRoutes from './routes/MainRoutes';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';

export default function App() {
  const queryClient = new QueryClient();

 
  return  (
    <QueryClientProvider client={queryClient}>
<div>
<MainRoutes/>
<Toaster position='top center' />
</div>
</QueryClientProvider>
  )


}
