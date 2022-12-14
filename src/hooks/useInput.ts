import { useState } from "react";

export default function useInput(initialValue: any) {
	const [value, setValue] = useState(initialValue);

	const onChange = (e: { target: HTMLInputElement }) => {
		setValue(e.target.value)
	}

	return {
		value, onChange
	}
}
