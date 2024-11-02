import { useState } from "react";

// Functional based component for adding a class to the virtual document object model
function AddClass() {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount((prevCount) => prevCount + 1);
    };

    const decrement = () => {
        setCount((prevCount) => prevCount - 1);
    };

    const reset = () => {
        setCount(0);
    };

    return (
        <div className="countContainer flex flex-col items-center justify-center h-screen bg-gray-100">
            <p className="countDisplay text-6xl font-bold text-gray-800 mb-6">{count}</p>
            <div className="flex space-x-4">
                <button
                    className="countButton bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200 ease-in-out"
                    onClick={decrement}
                >
                    -
                </button>
                <button
                    className="countButton bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200 ease-in-out"
                    onClick={reset}
                >
                    Reset
                </button>
                <button
                    className="countButton bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200 ease-in-out"
                    onClick={increment}
                >
                    +
                </button>
            </div>
        </div>
    );
}

export default AddClass;
