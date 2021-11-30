import Input from "@components/Input";

export default {
    title: "Components/Input",
    component: Input,
};

export const Default = () => {
    return (
        <>
            <Input style={{ marginBottom: "10px" }} />
            <Input password />
        </>
    );
};
