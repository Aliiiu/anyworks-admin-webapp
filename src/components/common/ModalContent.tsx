import { IoCloseOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const ModalContent: React.FC<{
	onClick: () => void;
	content1?: string;
	content2?: string;
	link?: string;
	btnAction?: () => void;
	linkContent: string;
	loading?: boolean;
}> = ({
	onClick,
	content1,
	content2,
	link,
	btnAction,
	linkContent,
	loading,
}) => {
	return (
		<div className='flex min-w-[392px] bg-white flex-col items-center rounded-lg p-6'>
			<div className='fixed right-0 cursor-pointer top-0'>
				<IoCloseOutline onClick={onClick} size={30} />
			</div>
			<h2 className='font-semibold text-2xl'>{content1}</h2>
			<p className='text-center text-[#4D4D4D] mt-3 mb-6'>{content2}</p>
			<div className='flex items-center justify-between gap-6 w-full'>
				<button
					onClick={onClick}
					className='py-2 px-4 rounded-[8px] text-base border min-w-[112px] text-[#e25c5c] border-[#E25C5C]'
				>
					Cancel
				</button>
				{link && (
					<Link
						to={link}
						className='bg-[#0075FF] py-2 px-4 rounded-[8px] text-white'
					>
						{linkContent}
					</Link>
				)}
				{btnAction && (
					<button
						onClick={btnAction}
						className='border py-2 px-4 rounded-[8px] text-base bg-primary min-w-[112px] text-white'
					>
						{loading ? (
							<ClipLoader size={20} color={'#FFFFFF'} className='text-white' />
						) : (
							linkContent
						)}
					</button>
				)}
			</div>
		</div>
	);
};

export default ModalContent;
