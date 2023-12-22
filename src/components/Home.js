import React from "react"
import "../styles.css";
import categories from "../categories";
import { Link } from "react-router-dom";

export default function Home() {
    const categoriesArr = categories.map((category, idx) => {
            return (
                <Link
                    key={idx} 
                    className="red-box"
                    to={category.link}
                >
                    <h4>{category.title}</h4>
                </Link>
            )
        }
    )

    return (
        <div id="home-container">
            <h1>&gt; What do you need help with?</h1>
            <div className="categories-container">
                {categoriesArr}
            </div>
        </div>
    )
};