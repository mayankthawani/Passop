import React, { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const ref = useRef();
    const passwordref = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" });
    const [passwordarray, setpasswordarray] = useState([]);

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setpasswordarray(JSON.parse(passwords));
        }
    }, []);

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text);
    };

    const handleclick = () => {
        passwordref.current.type = passwordref.current.type === "password" ? "text" : "password";
        ref.current.src = ref.current.src.includes("/eyecross.png") ? "/eye.png" : "/eyecross.png";
    };

    const savepassword = () => {
        const updatedPasswords = [...passwordarray, { ...form, id: uuidv4() }];
        setpasswordarray(updatedPasswords);
        localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
        setform({ site: "", username: "", password: "" });
        toast('Password saved!', { theme: "light" });
    };

    const deletepassword = (id) => {
        if (confirm("Do you really want to delete?")) {
            const updatedPasswords = passwordarray.filter((item) => item.id !== id);
            setpasswordarray(updatedPasswords);
            localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
            toast('Password deleted!', { theme: "light" });
        }
    };

    const editpassword = (id) => {
        const passwordToEdit = passwordarray.find((item) => item.id === id);
        setform(passwordToEdit);
        deletepassword(id);
    };

    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <>
            <ToastContainer />
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold text-center mt-6">
                        <span className="text-green-500">&lt;</span>
                        <span>Pass</span><span className="text-green-500">OP/&gt;</span>
                    </h1>
                    <p className="text-green-900 text-lg text-center mb-6">Your own Password Manager</p>

                    {/* Form Section */}
                    <div className="flex flex-col gap-6 p-4 bg-white shadow-md rounded-lg">
                        <input
                            name="site"
                            onChange={handlechange}
                            value={form.site}
                            placeholder="Enter Website URL"
                            className="rounded-full border border-green-500 w-full p-4 focus:outline-none focus:ring focus:ring-green-300"
                            type="text"
                            id="site"
                        />
                        <div className="flex flex-col md:flex-row gap-6">
                            <input
                                name="username"
                                onChange={handlechange}
                                value={form.username}
                                placeholder="Enter Username"
                                className="rounded-full border border-green-500 w-full p-4 focus:outline-none focus:ring focus:ring-green-300"
                                type="text"
                                id="username"
                            />
                            <div className="relative w-full">
                                <input
                                    ref={passwordref}
                                    name="password"
                                    onChange={handlechange}
                                    value={form.password}
                                    placeholder="Enter Password"
                                    className="rounded-full border border-green-500 w-full p-4 focus:outline-none focus:ring focus:ring-green-300"
                                    type="password"
                                    id="password"
                                />
                                <span className="absolute right-4 top-4 cursor-pointer" onClick={handleclick}>
                                    <img ref={ref} className="w-6" src="/eye.png" alt="Toggle visibility" />
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={savepassword}
                            className="bg-green-500 flex items-center justify-center text-white py-2 px-6 rounded-full hover:bg-green-600"
                        >
                             <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover" >
                        </lord-icon>
                            Save
                        </button>
                    </div>

                    {/* Passwords List */}
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold mb-4">Your passwords</h2>
                        {passwordarray.length === 0 && <div className="text-center">No passwords to show!</div>}
                        {passwordarray.length !== 0 && (
                            <div className="overflow-x-auto">
                                <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                                    <thead className="bg-green-800 text-white">
                                        <tr>
                                            <th className="py-2 px-4 text-left">Site</th>
                                            <th className="py-2 px-4 text-left">Username</th>
                                            <th className="py-2 px-4 text-left">Password</th>
                                            <th className="py-2 px-4 text-left">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {passwordarray.map((item) => (
                                            <tr key={item.id} className="bg-green-100">

                                                
                                                <td className="py-2 px-4">
                                                    <a
                                                        href={item.site}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-500 underline"
                                                    >
                                                        {item.site}
                                                    </a>
                                                    
                                                  

                                                </td>
                                                <td className="py-2 px-4">{item.username}</td>
                                                <td className="py-2 px-4">{item.password}</td>
                                                <td className="py-2 px-4 flex gap-2">
                                                    <button
                                                        onClick={() => editpassword(item.id)}
                                                        className="text-blue-500 hover:underline"
                                                    >
                                                       <lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                style={{"width":"25px", "height":"25px"}}>
                                            </lord-icon>
                                                    </button>
                                                    <button
                                                        onClick={() => deletepassword(item.id)}
                                                        className="text-red-500 hover:underline"
                                                    >
                                                       <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{"width":"25px", "height":"25px"}}>
                                            </lord-icon>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Manager;

