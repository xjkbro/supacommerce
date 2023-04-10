import { clsx } from "clsx";

export default function Button({ children, onClick, className, type }) {
    return (
        <button
            onClick={onClick}
            className={
                className +
                " py-2 px-4 bg-yellow-400 hover:bg-yellow-500 border-2 border-yellow-500 transition-all"
            }
        >
            {children}
        </button>
    );
}
