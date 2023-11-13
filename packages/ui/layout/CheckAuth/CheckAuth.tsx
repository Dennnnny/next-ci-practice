import { useSession } from 'next-auth/react';
import { Center, Spinner } from '@chakra-ui/react';
import LoginForm from 'ui/form/Login/LoginForm';

export default function CheckAuth({ children }: { children: JSX.Element }) {
	const { status } = useSession();

	// if (status === 'loading') {
	// 	return (
	// 		<Center w="100vw" h="100vh">
	// 			<Spinner
	// 				thickness="4px"
	// 				speed="0.65s"
	// 				emptyColor="gray.200"
	// 				color="blue.500"
	// 				size="xl"
	// 			/>
	// 		</Center>
	// 	);
	// }

	// if (status === 'unauthenticated') {
	// 	return <LoginForm />;
	// }

	return children;
}
