import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import { InputContainer } from '../admin/addAdminModal/AddAdminModal';

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const roles = [
	'adminManager',
	'artisanManager',
	'bookingManager',
	'userManager',
];

function getStyles(name: string, personName: string[], theme: Theme) {
	return {
		fontWeight:
			personName.indexOf(name) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium,
	};
}

export default function MultipleSelect({
	setRoles,
	roleError,
}: {
	setRoles: Function;
	roleError: string;
}) {
	const theme = useTheme();
	const [personName, setPersonName] = useState<string[]>([]);
	const [clicked, setClicked] = useState(false);

	const handleChange = (event: SelectChangeEvent<typeof personName>) => {
		const {
			target: { value },
		} = event;
		setRoles((prevState: any) => ({
			...prevState,
			role: typeof value === 'string' ? value.split(',') : value,
			roleError: '',
		}));
		setPersonName(typeof value === 'string' ? value.split(',') : value);
	};

	React.useEffect(() => {
		console.log(personName);
	}, [personName]);

	return (
		<>
			<InputContainer>
				<label htmlFor='Role'>Role</label>
				<FormControl fullWidth size='small'>
					{/* <InputLabel id='demo-multiple-name-label'>Role</InputLabel> */}
					<Select
						labelId='demo-multiple-name-label'
						id='demo-multiple-name'
						multiple
						value={personName}
						onChange={handleChange}
						style={{ padding: '0px auto' }}
						MenuProps={MenuProps}
						required
					>
						{roles.map((role) => (
							<MenuItem
								key={role}
								value={role}
								onClick={() => setClicked((prevState) => !prevState)}
								style={getStyles(role, personName, theme)}
							>
								{role}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				{roleError && <h6 className='validation_error'>{roleError}</h6>}
			</InputContainer>
		</>
	);
}
