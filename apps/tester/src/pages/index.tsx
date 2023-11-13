import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Index = () => {
	const route = useRouter();
	return <h1 color="text">hello world</h1>;
};

export default Index;
