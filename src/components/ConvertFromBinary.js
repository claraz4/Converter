import React from "react";
import "../styles.css";
import { isValid } from "../Helper";
import { Link } from "react-router-dom";

export default function BinaryToBCD(props) {
    const [binaryInput, setBinaryInput] = React.useState(0);
    const [ouput, setOutput] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    // Update the state of the input whenever the user writes something
    function handleChange(event) {
        setBinaryInput(event.target.value);
    }

    // Convert to BCD
    function handleConvert(event) {
        event.preventDefault();

        // Check that the input is valid
        if (!isValid(binaryInput)) {
            setErrorMessage("Invalid Input!");
            setOutput();
        } else {
            setErrorMessage("");

            // Convert to BCD
            setOutput(props.convertFunction(parseInt(binaryInput)));
            console.log(ouput);
        }
    }

    return (
        <div className="page-container">
           <Link to="/" className="button" id="goback-button">&lt; Go back</Link>

            <div className="converter-container">
                <form id="form">
                        <label htmlFor="binary-num" className="form-label">Enter a binary number:</label>
                        <input
                            type="number"
                            name="binary-num"
                            autoFocus
                            autoComplete="off"
                            className="input-number"
                            onChange={handleChange}
                        />
                </form>

                <button className="button centered" onClick={handleConvert}>Convert</button>

                <div className="result-binary-to-bcd">
                        <h2>{binaryInput} in {props.conversionTo} is:</h2>
                        <div>{ouput}</div>
                        <div>{errorMessage}</div>
                </div>
           </div>
        </div>
    );
}