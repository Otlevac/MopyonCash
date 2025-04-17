import { Stack, Redirect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import Loader from '../../components/loader';
import { useUser } from '../../contexts/UserContext';



const AuthLayout = () => {
  const { loading, isLogged } = useUser();

  if (!loading && isLogged) return <Redirect href="/home" />;



  return (
    <>
      <Stack >
        <Stack.Screen 
        name='sign-in' 
        options={{headerShown: false}}
        />
        <Stack.Screen 
        name='sign-up' 
        options={{headerShown: false}}
        />
      </Stack>

      <Loader isLoading={loading} />
      <StatusBar backgroundColor="#161622" style='light'/>
    </>
      
  )
}

export default AuthLayout;


