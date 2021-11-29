import Input from "@components/Input";

export default {
	title: "Components/Input",
	component: Input,
};

export const Default = () => {
	return (
		<>
			<Input />
			<Input password />
		</>
	);
};
