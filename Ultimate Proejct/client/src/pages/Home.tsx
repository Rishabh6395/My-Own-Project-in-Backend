import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="p-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to SkillStack</h1>
            <p className="text-lg text-gray-600">Showcase your skills. Hire through real projects.</p>
            <div className="space-x-4">
                <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded">Login</Link>
                <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded">Register</Link>
            </div>

        </div>
    )
}