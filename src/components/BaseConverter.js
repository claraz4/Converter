import React from "react";
import "../styles.css";
import bases from "../baseAvailable";
import { Link } from "react-router-dom";

export default function BaseConverter() {
    const [formData, setFormData] = React.useState({
        "number" : "0",
        "fromBase" : 10,
        "toBase" : 16
    })
    const [selectedFrom, setSelectedFrom] = React.useState(10);
    const [selectedTo, setSelectedTo] = React.useState(16);
    const [result, setResult] = React.useState("0");
    const [errorMessage, setErrorMessage] = React.useState("");
    
    // Create the base options
    const baseOptions = bases.map((base, idx) => {
        return <option key={idx}>{base}</option>
    });

    // Handle the change of the form
    function handleChange(event) {
        if (event.target.name === "fromBase") {
            setSelectedFrom(event.target.value);
        }

        if (event.target.name === "toBase") {
            setSelectedTo(event.target.value);
        }

        setFormData(prevData => {
            return {
                ...prevData,
                [event.target.name]: event.target.value
            }
        })
    }
    

    // Handle the swapping
    function handleSwap() {
        setSelectedFrom(formData.toBase);
        setSelectedTo(formData.fromBase);
        
        setFormData(prevData => {
            return {
                ...prevData,
                "fromBase" : prevData.toBase,
                "toBase" : prevData.fromBase
            }
        })
    }

    // Logic to get the result (converting according to the base)
    function convert() {
        // Convert the number to base 10 according to its base
        const { number, fromBase, toBase } = formData;

        if (!isValid(number, fromBase)) {
            setErrorMessage("Invalid number in the specified base!");
            return;
        }

        setErrorMessage("");
        let base10 = 0;
        if (formData.fromBase !== 10) {
            let position = 0;
            for (let i = number.length - 1; i >= 0; i--) {
                let curr = number.charAt(i);

                if ('A' <= curr && curr <= 'F') {
                    curr = parseInt(curr.charCodeAt(0) - 'A'.charCodeAt(0)) + 10;
                } else {
                    curr = curr - '0';
                }
                base10 += parseInt(curr) * Math.pow(formData.fromBase, position);
                position++;
            }
        } else {
            base10 = number;
        }

        // Find its equivalent in the needed base
        let converted = "";
        while (base10 > 0) {
            let remainder = base10 % toBase;

            if (remainder > 9) {
                switch (remainder) {
                    case 10:
                        remainder = "A";
                        break;
                    case 11:
                        remainder = "B";
                        break;
                    case 12:
                        remainder = "C";
                        break;
                    case 13:
                        remainder = "D";
                        break;
                    case 14:
                        remainder = "E";
                        break;
                    default:
                        remainder = "F";
                }
            }

            converted = remainder + converted; // I need to do it this way in case I have letters
            base10 = Math.floor(base10 / toBase);
        }
        return converted;
    };

    // Check whether a given number is valid in the given base or if the letters given are invalid
    function isValid(number, fromBase) {
        for (let i = 0; i < number.length; i++) {
            const curr = number.charAt(i).charCodeAt(0);

            if ('0'.charCodeAt(0) <= curr && curr <= '9'.charCodeAt(0)) {
                if (curr - '0'.charCodeAt(0) >= fromBase) {
                    return false;
                }
            } else if ('A'.charCodeAt(0) <= curr && curr <= 'Z'.charCodeAt(0)) {
                if (!('A'.charCodeAt(0) <= curr && curr <= 'F'.charCodeAt(0))) {
                    return false;
                } else if ((curr - 'A'.charCodeAt(0)) + 10 >= fromBase) {
                    return false;
                }
                
            } else {
                return false; // lower case letters
            }
        }
        return true;
    }

    // Handle the click of the convert button
    function handleConvert(event) {
        event.preventDefault();
        setResult(convert());
    }

    return (
        <div className="page-container">
            <Link to="/" className="button" id="goback-button">&lt; Go back</Link>

            <div className="converter-container">
                <form id="form">
                    <label htmlFor="number" className="form-label">Enter a number:</label>
                    <input 
                        type="text"
                        name="number"
                        autoFocus
                        autoComplete="off"
                        onChange={handleChange}
                        className="input-number"
                    />

                    <label htmlFor="fromBase" className="form-label">From base:</label>
                    <select
                        placeholder="Base"
                        name="fromBase"
                        onChange={handleChange}
                        value={selectedFrom}
                        className="input-select"
                    >
                        <option disabled>--Select a base--</option>
                        {baseOptions}
                    </select>

                    <label htmlFor="toBase" className="form-label">To base:</label>
                    <select
                        placeholder="Base"
                        name="toBase"
                        onChange={handleChange}
                        value={selectedTo}
                        className="input-select"
                    >
                        <option disabled>--Select a base--</option>
                        {baseOptions}
                    </select>

                    <div className="button-container">
                        <button className="button" onClick={handleConvert}>Convert</button>
                        <button type="button" onClick={handleSwap} className="button">Swap</button>
                    </div>
                </form>
                
                <div className="input-number-result">
                    <h1>{formData.number}</h1>
                    <p>{selectedFrom}</p>
                </div>
                <h1 className="equal-sign">=</h1>
                <div className="input-number-result">
                    <h1>{result}</h1>
                    <p>{selectedTo}</p>
                </div>
                <h3>{errorMessage}</h3>
            </div>
        </div>
    );
}