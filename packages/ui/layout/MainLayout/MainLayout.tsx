import { MainLayoutProps } from 'types/layout';
import { Grid, GridItem } from '@chakra-ui/react';

export default function MainLayout(props: MainLayoutProps) {
	const { header, sidebar, children } = props;
	return (
		<Grid
			templateAreas={`"header header"
                      "nav main"`}
			gridTemplateRows={'48px 1fr'}
			gridTemplateColumns={'200px 1fr'}
			h="100vh"
		>
			<GridItem area={'header'}>{header}</GridItem>
			<GridItem area={'nav'}>{sidebar}</GridItem>
			<GridItem area={'main'}>{children}</GridItem>
		</Grid>
	);
}
