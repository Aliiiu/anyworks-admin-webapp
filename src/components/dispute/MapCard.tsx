import React from 'react';
import GoogleMapReact from 'google-map-react';
import { IoLocation } from 'react-icons/io5';

type LocationType = {
	lat: number;
	lng: number;
};
const MapCard = ({ location }: { location: LocationType }) => {
	return (
		<GoogleMapReact
			bootstrapURLKeys={{ key: 'AIzaSyAxXp1Vr5G4j4rICCxxBM263SidP_6X6eY' }}
			defaultCenter={location}
			defaultZoom={14}
		>
			<div className='bg-primary bg-opacity-10 p-2 w-fit rounded-full'>
				<IoLocation className='text-primary text-4xl' />
			</div>
		</GoogleMapReact>
	);
};

export default MapCard;
