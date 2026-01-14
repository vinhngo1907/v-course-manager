// /Components/Settings/Toggle.tsx
import React from "react";

interface ToggleProps {
    enabled: boolean;
    setEnabled: (val: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({ enabled, setEnabled }) => {
    return (
        <button
            onClick={() => setEnabled(!enabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${enabled ? "bg-yellow-500" : "bg-gray-600"
                }`}
        >
            <span
                className={`inline-block h-4 w-4 transform rounded-full bg-black transition ${enabled ? "translate-x-6" : "translate-x-1"
                    }`}
            />
        </button>
    );
};

export default Toggle;