import artisanServiceApi from 'src/utils/ArtisanServiceApi';

const KycData = {
	getAllKyc: async () => {
		return artisanServiceApi().get('kyc');
	},
};

export default KycData;
