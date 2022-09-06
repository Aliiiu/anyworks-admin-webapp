import { memo, useLayoutEffect, useRef } from 'react';
import usePrevious from 'src/hooks/usePrevious';
import { SingleOTPInputProps } from 'src/react-app-env';

export function SingleOTPInputComponent(props: SingleOTPInputProps) {
	const { focus, autoFocus, ...rest } = props;
	const inputRef = useRef<HTMLInputElement>(null);
	const prevFocus = usePrevious(!!focus);
	useLayoutEffect(() => {
		if (inputRef.current) {
			if (focus && autoFocus) {
				inputRef.current.focus();
			}
			if (focus && autoFocus && focus !== prevFocus) {
				inputRef.current.focus();
				inputRef.current.select();
			}
		}
	}, [autoFocus, focus, prevFocus]);

	return <input ref={inputRef} {...rest} />;
}

const SingleOTPInput = memo(SingleOTPInputComponent);
export default SingleOTPInput;
