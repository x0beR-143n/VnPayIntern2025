import React from "react";
import { useSelector } from 'react-redux';

export default function TokenUsage() {
    const token = useSelector(state => state.auth.token);
    return (
        <div className="pt-30 bg-by-theme text-by-theme">
            <p>{token}</p>
        </div>
    )
}