import React from 'react';
import styled from 'styled-components';
import clsx from 'clsx';

const LoaderContainer = styled.div`
	display: flex;
	gap: 10px;
	align-items: center;

	@keyframes loading {
		from {
			transform: rotate(0turn);
		}

		to {
			transform: rotate(2turn);
		}
	}

	.loading {
		min-width: 16px;
		min-height: 16px;
		pointer-events: none;
		position: relative;

		&::after {
			content: '';
			position: absolute;
			width: 12px;
			height: 12px;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			border: 2px solid transparent;
			border-top-color: ${(props) => props.theme.colors.purple};
			border-right-color: ${(props) => props.theme.colors.purple};
			border-bottom-color: ${(props) => props.theme.colors.purple};
			border-left-color: transparent;
			border-radius: 50%;
			animation: loading 1s ease infinite;
		}

		&.loading--lg {
			min-width: 24px;
			min-height: 24px;

			&::after {
				height: 20px;
				width: 20px;
			}
		}
		&.btn--state {
			&::after {
				border-top-color: ${(props) => props.theme.colors.white};
				border-right-color: ${(props) => props.theme.colors.white};
				border-bottom-color: ${(props) => props.theme.colors.white};
			}
		}
	}
`;

export const LoadingSize = {
	LARGE: 'large',
};

interface Props {
	children?: any;
	size?: string;
	color?: string;
}

export const Loading: React.FC<Props> = ({ children, size, color }) => (
	<LoaderContainer>
		<span
			className={clsx(
				`loading`,
				{
					'loading--lg': size === LoadingSize.LARGE,
				},
				{ 'btn--state': color === 'white' }
			)}
		/>
		{children && <span>{children}</span>}
	</LoaderContainer>
);

export default Loading;
