import { VisibilityOffOutlined } from '@mui/icons-material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

const Visibility = ({
	value,
	toggle,
}: {
	value: boolean;
	toggle: () => void;
}) => {
	return (
		<div onClick={() => toggle()}>
			{value ? (
				<VisibilityOutlinedIcon
					fontSize='small'
					sx={{ color: '#98A2B3', marginRight: '20px', cursor: 'pointer' }}
				/>
			) : (
				<VisibilityOffOutlined
					fontSize='small'
					sx={{ color: '#98A2B3', marginRight: '20px', cursor: 'pointer' }}
				/>
			)}
		</div>
	);
};

export default Visibility;
