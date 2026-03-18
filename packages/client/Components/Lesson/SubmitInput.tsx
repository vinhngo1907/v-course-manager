import clsx from "clsx";

type Props = {
    value: string;
    isLoading: boolean;
};

const SubmitInput = ({ value, isLoading }: Props) => {
    const classes = clsx(
        "mt-4 w-full rounded px-4 py-3 font-medium transition-colors duration-200",
        !isLoading &&
            "bg-[#FFB347] text-[#2C2C2C] hover:bg-[#F5A028] cursor-pointer",
        isLoading &&
            "bg-[#FFB347]/60 text-[#2C2C2C] cursor-not-allowed"
    );

    const label = isLoading ? "Loading..." : value;

    return (
        <input
            type="submit"
            value={label}
            disabled={isLoading}
            className={classes}
        />
    );
};

export default SubmitInput;