import React from "react";
import "../styles.css";
import { base10ToBinary, binaryToBase10, isValid } from "../Helper";
import ConvertFromBinary from "./ConvertFromBinary";
import { Link } from "react-router-dom";

export default function BinaryToBCD() {
    function convertToBCD(input) {
        // Convert to base 10
        let base10 = binaryToBase10(input);
        let result = ""

        if (base10 === 0) {
            return "0000";
        }

        // Convert each digit to binary and then add them to the output
        while (base10 !== 0) {
            result = base10ToBinary(base10 % 10) + " " + result;
            base10 = Math.floor(base10 / 10);
        }
        return result;
    }

    return (
        <ConvertFromBinary conversionTo="BCD" convertFunction={convertToBCD}/>
    );
}