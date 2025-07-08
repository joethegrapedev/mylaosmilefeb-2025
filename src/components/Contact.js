import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import ContactLeft from "./ContactLeft";
import Title from "./Title";
import { FadeIn } from "./FadeIn";
const Contact = () => {
    const [username, setUsername] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    // ========== Email Validation start here ==============
    const emailValidation = (email) => {
        return String(email)
            .toLocaleLowerCase()
            .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
    };
    // ========== Email Validation end here ================
    const handleSend = (e) => {
        e.preventDefault();
        if (username === "") {
            setErrMsg("Username is required!");
        }
        else if (phoneNumber === "") {
            setErrMsg("Phone number is required!");
        }
        else if (email === "") {
            setErrMsg("Please give your Email!");
        }
        else if (!emailValidation(email)) {
            setErrMsg("Give a valid Email!");
        }
        else if (subject === "") {
            setErrMsg("Plese give your Subject!");
        }
        else if (message === "") {
            setErrMsg("Message is required!");
        }
        else {
            setSuccessMsg(`Thank you dear ${username}, Your Messages has been sent Successfully!`);
            setErrMsg("");
            setUsername("");
            setPhoneNumber("");
            setEmail("");
            setSubject("");
            setMessage("");
        }
    };
    return (_jsx("section", { id: "contact", className: "w-full py-20 border-b-[1px] border-b-gray-700", children: _jsxs(FadeIn, { children: [_jsx("div", { className: "flex justify-center items-center text-center", children: _jsx(Title, { title: "CONTACT", des: "Contact Us" }) }), _jsx("div", { className: "w-full", children: _jsxs("div", { className: "w-full h-auto flex flex-col lgl:flex-row justify-between", children: [_jsx(ContactLeft, {}), _jsx("div", { className: "w-full lgl:w-[60%] h-full py-10 bg-gradient-to-r from-[#0B1120] to-[#0B1120] flex flex-col gap-8 p-4 lgl:p-8 rounded-lg shadow-shadowOne", children: _jsxs("form", { className: "w-full flex flex-col gap-4 lgl:gap-6 py-2 lgl:py-5", children: [errMsg && (_jsx("p", { className: "py-3 bg-gradient-to-r from-[#1e2024] to-[#23272b] shadow-shadowOne text-center text-orange-500 text-base tracking-wide animate-bounce", children: errMsg })), successMsg && (_jsx("p", { className: "py-3 bg-gradient-to-r from-[#1e2024] to-[#23272b] shadow-shadowOne text-center text-green-500 text-base tracking-wide animate-bounce", children: successMsg })), _jsxs("div", { className: "w-full flex flex-col lgl:flex-row gap-10", children: [_jsxs("div", { className: "w-full lgl:w-1/2 flex flex-col gap-4", children: [_jsx("p", { className: "text-sm text-gray-400 uppercase tracking-wide", children: "Your name" }), _jsx("input", { onChange: (e) => setUsername(e.target.value), value: username, className: `${errMsg === "Username is required!" &&
                                                                "outline-designColor"} contactInput text-gray-400`, type: "text" })] }), _jsxs("div", { className: "w-full lgl:w-1/2 flex flex-col gap-4", children: [_jsx("p", { className: "text-sm text-gray-400 uppercase tracking-wide", children: "Phone Number" }), _jsx("input", { onChange: (e) => setPhoneNumber(e.target.value), value: phoneNumber, className: `${errMsg === "Phone number is required!" &&
                                                                "outline-designColor"} contactInput text-gray-400`, type: "text" })] })] }), _jsxs("div", { className: "flex flex-col gap-4", children: [_jsx("p", { className: "text-sm text-gray-400 uppercase tracking-wide", children: "Email" }), _jsx("input", { onChange: (e) => setEmail(e.target.value), value: email, className: `${errMsg === "Please give your Email!" &&
                                                        "outline-designColor"} contactInput text-gray-400`, type: "email" })] }), _jsxs("div", { className: "flex flex-col gap-4", children: [_jsx("p", { className: "text-sm text-gray-400 uppercase tracking-wide", children: "Subject" }), _jsx("input", { onChange: (e) => setSubject(e.target.value), value: subject, className: `${errMsg === "Plese give your Subject!" &&
                                                        "outline-designColor"} contactInput text-gray-400`, type: "text" })] }), _jsxs("div", { className: "flex flex-col gap-4", children: [_jsx("p", { className: "text-sm text-gray-400 uppercase tracking-wide", children: "Message" }), _jsx("textarea", { onChange: (e) => setMessage(e.target.value), value: message, className: `${errMsg === "Message is required!" && "outline-designColor"} contactTextArea text-gray-400`, cols: 30, rows: 8 })] }), _jsx("div", { className: "w-full", children: _jsx("button", { onClick: handleSend, className: "w-full h-12 bg-[#141518] rounded-lg text-base text-gray-400 tracking-wider uppercase hover:text-white duration-300 hover:border-[1px] hover:border-designColor border-gray-600 border", children: "Send Message" }) }), errMsg && (_jsx("p", { className: "py-3 bg-gradient-to-r from-[#141518] to-[#141518] shadow-shadowOne text-center text-orange-500 text-base tracking-wide animate-bounce", children: errMsg })), successMsg && (_jsx("p", { className: "py-3 bg-gradient-to-r from-[#141518] to-[#141518] shadow-shadowOne text-center text-green-500 text-base tracking-wide animate-bounce", children: successMsg }))] }) })] }) })] }) }));
};
export default Contact;
