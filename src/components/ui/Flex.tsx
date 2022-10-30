import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
	@media (max-width: ${(props) => props.theme.breakpoint.sm}) {
		display: flex;
		flex-direction: column;
	} ;
`;

interface Props {
	children?: any;
	className?: string;
	direction?: string;
	gap?: string;
	justify?: string;
	align?: string;
	wrap?: string;
	flexGrow?: string;
	style?: any;
	onclick?: any;
}

export const Flex: React.FC<Props> = ({
	children,
	className,
	onclick,
	direction,
	gap = '1rem',
	justify,
	align,
	wrap = 'nowrap',
	flexGrow,
	style,
	...rest
}) => {
	return (
		<StyledDiv
			onClick={onclick}
			style={{
				display: 'flex',
				flexDirection: direction,
				flexWrap: wrap,
				gap,
				justifyContent: justify,
				alignItems: align,
				flexGrow: flexGrow,
				...style,
				...rest,
			}}
			className={className}
		>
			{children}
		</StyledDiv>
	);
};

export default Flex;
