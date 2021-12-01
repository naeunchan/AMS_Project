import { useEffect, useState } from "react";

const useForm = ({ initValues, onSubmit, validate }) => {
	const [values, setValues] = useState(initValues);
	const [errors, setErrors] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (event) => {
		const { name, value } = event.target;

		if (name.includes("password") || name.includes("Password")) {
			setValues({ ...values, [name]: value });
			return;
		}

		setValues({ ...values, [name]: value.trim() });
	};

	const handleSubmit = async (event) => {
		setIsLoading(true);
		event.preventDefault();

		const newErrors = validate ? validate(values) : {};

		if (Object.keys(newErrors).length === 0) {
			await onSubmit(values);
		}

		setErrors(newErrors);
		setIsLoading(false);
	};

	useEffect(() => setIsLoading(false), []);

	return {
		values,
		errors,
		isLoading,
		handleChange,
		handleSubmit,
	};
};

export default useForm;
