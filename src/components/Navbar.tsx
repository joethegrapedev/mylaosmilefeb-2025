import { useState } from "react";
import { Link } from "react-scroll";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";
import { logo } from "../assets";
import { navLinksdata } from "../constants";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="w-full h-24 sticky top-0 z-50 backdrop-blur-2xl transition-colors bg-bodyColor/70 mx-auto flex justify-between items-center font-titleFont border-b-[1px] border-b-gray-600 px-4">
      <div>
        <img src={logo} alt="logo" />
      </div>
      <div>
        <ul className="hidden mdl:inline-flex items-center gap-6 lg:gap-10">
          {navLinksdata.map(({ _id, title, link }) => (
            <li
              className="text-base font-normal text-gray-400 tracking-wide cursor-pointer hover:text-designColor duration-300"
              key={_id}
            >
              <Link
                activeClass="active"
                to={link}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
        <span
          onClick={() => setShowMenu(!showMenu)}
          className="text-xl mdl:hidden bg-black w-10 h-10 inline-flex items-center justify-center rounded-full text-designColor cursor-pointer"
        >
          {/* @ts-ignore */}
          <FiMenu />
        </span>
        {showMenu && (
          <div className="w-[80%] h-screen mdl:hidden overflow-scroll absolute top-0 left-0 bg-gray-900 p-4 scrollbar-hide">
            <div className="flex flex-col gap-8 py-2 relative">
              <div>
                <img className="w-32" src={logo} alt="logo" />
                <p className="text-sm text-gray-400 mt-2">
                  Bringing smiles one surgery at a time
                </p>
              </div>
              <ul className="flex flex-col gap-4">
                {navLinksdata.map((item) => (
                  <li
                    key={item._id}
                    className="text-base font-normal text-gray-400 tracking-wide cursor-pointer hover:text-designColor duration-300"
                  >
                    <Link
                      onClick={() => setShowMenu(false)}
                      activeClass="active"
                      to={item.link}
                      spy={true}
                      smooth={true}
                      offset={-70}
                      duration={500}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-4">
                <h2 className="text-base uppercase font-titleFont mb-4">
                  Find us at
                </h2>
                <div className="flex gap-4">
                  <a href="https://youtu.be/_dih2JOb2C8" target="_blank">
                    <span className="bannerIcon">
                      {/* @ts-ignore */}
                      <FaYoutube />
                    </span>
                  </a> 
                  
                  
{/* CHECK THIS AND REMOVE THIS SECTION, ADD INSTA LINK INSTEAD */}
                  
            <a href="https://www.instagram.com/mountelizabethhospitals/p/C0d2R7lInFg/?next=%2Frubykantor%2F&hl=ja&img_index=1" target="_blank">
              <span className="bannerIcon">
                {/* @ts-ignore */}
                <FaInstagram />
              </span>
            </a>
                  
                  {/* <a
                    href="https://www.linkedin.com/in/noor-mohammad-ab2245193/"
                    target="_blank"
                  >
                   
                    <span className="bannerIcon">
                      <FaLinkedinIn />
                    </span>
                  </a> */}
{/* ADD INSTA LINK ABOVE */}


<a href="https://www.facebook.com/watch/?v=1032449527847176" target="_blank">
              <span className="bannerIcon">
                {/* @ts-ignore */}
                <FaFacebookF />
              </span>
            </a>
            
                  {/* <a
                    href="https://www.facebook.com/Noorlalu143/"
                    target="_blank"
                  >
                    <span className="bannerIcon">
                      <FaFacebookF />
                    </span>
                  </a> */}
                </div>
              </div>
              <span
                onClick={() => setShowMenu(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-designColor duration-300 text-2xl cursor-pointer"
              >
                {/* @ts-ignore */}
                <MdClose />
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
