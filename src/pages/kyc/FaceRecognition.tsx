import React from 'react';
import Button from 'src/components/ui/widget/Button';

const FaceRecognition = () => {
	return (
		<div className='w-[60%] pb-[29px] pt-[74px]'>
			<div className='flex flex-col justify-between items-center h-full'>
				<div className='p-[34px] w-full max-w-[530px] mx-auto'>
					<h3 className='font-medium text-2xl'>Address Verification</h3>
					<div className='mt-10 bg-[#7507BD] w-[307px] h-[316px] mx-auto p-[25px] rounded-full'>
						<img
							src='/images/profilePicture.png'
							alt='profile pics'
							className='rounded-full bg-white w-full h-full'
						></img>
					</div>
				</div>
				<div className='flex gap-6 justify-center'>
					<Button classes='bg-[#7607BD] text-2xl py-2 flex justify-center items-center gap-2 text-white'>
						Accept
					</Button>
					<Button classes='border border-[#d92d20] text-2xl py-2 flex justify-center items-center gap-2 text-[#D92D20]'>
						Reject
					</Button>
				</div>
			</div>
		</div>
	);
};

export default FaceRecognition;
