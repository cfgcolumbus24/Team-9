function AddClass()
{


const [count, setCount] = useState(0);

    const increment = ()=>
        {
            // The increment arrow function does not increase the count by 3 times when the button is clicked for some reason
            // This is why:

            // Uses the CURRENT state to calculate the NEXT state.
            // Set functions do not trigger an update
            // React batches together state updates for performance purposes.
            // NEXT state becomes the CURRENT state after the update.
            // count is 0
            // setCount(count+1);
            // It adds 1. Count is unchanged, the output is incremented by 1 however. 
            // setCount(count+1);
            // It was adds 1. Count is unchanged, the output is incremented by 1 however. 
            // setCount(count+1);
            // Setting count to 1, three separate times, then UPDATE
            // Think about hitting refresh button on web browser 3 times, but it only refreshes ONCE
            

            // This is how we perform a count for going by 3s, by utilizing the updater function
            // prevCount is updated, and it increments by 3s now
            // 
            // 
            // 

            // TAKES the PENDING state to calculate the NEXT state
            // React puts your updater function in a queue, aka FIFO, First In First Out style
            // During the next render, it will call them in the same order.

            // Good practice to always use updaterFunctions with arrowFunctions such as below instead of
            // setCount(count+1);
            // Good to future proof your code with this
            setCount(prevCount=>prevCount+4);
            setCount(prevCount=>prevCount+1);
            setCount(prevCount=>prevCount+1);
            


        }

    const decrement = ()=>
        {
            // Another method to change by a variable amount, such as by 3s, allows for safe updates based on previous state
            setCount(prevCount=>prevCount-3);


        }
    const reset = ()=>
        {
            // Not dependent on previous state, it does not really matter.
            // updaterFunction is not really necessary here.
            setCount(0);
        }

        return(
            <div className="countContainer">
                <p className="countDisplay">{count}</p>
                <button className="countButton" onClick={decrement}>-</button>
                <button className="countButton" onClick={reset}>Reset</button>
                <button className="countButton" onClick={increment}>+</button>
                



            </div>
        )

}


export default AddClass;