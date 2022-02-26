// import { Provider } from 'react-redux';
// import { store } from '../state';
// import RepositoriesList from './RepositoriesList';
import PokeForm from '../Pokemon/PokeForm';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <PokeForm />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
