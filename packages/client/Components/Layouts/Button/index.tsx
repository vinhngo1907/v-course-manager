import clsx from "clsx";
// import styles from "./index.module.css";

type Props = {
    children: React.ReactNode;
    intent?: "primary" | "secondary" | "danger" | "highlight";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;


const Button = ({ children, intent = 'primary', ...rest }: Props) => {
    return (
        <button
            className={clsx(
                // styles.btnBase,
                "px-4 py-3 rounded my-4 inline-block w-fit",
                intent === 'primary' && 'bg-slate-700 hover:bg-slate-800 text-white',
                intent === 'secondary' && 'text-slate-700 border border-slate-700',
                intent === 'danger' && 'bg-red-600 hover:bg-red-700 text-white',
               intent === 'highlight' && 'bg-yellow-600 hover:bg-yellow-500 text-black'
            )}
            {...rest}
        >
            {children}
        </button>

    );
};

export default Button;