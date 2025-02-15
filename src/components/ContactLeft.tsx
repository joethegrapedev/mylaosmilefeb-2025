import { FaFacebookF, FaYoutube, FaInstagram} from "react-icons/fa";
import { contactImg } from "../assets";

const ContactLeft = () => {
  return (
    <div className="w-full lgl:w-[35%] h-full bg-gradient-to-r from-[#0B1120] to-[#0B1120] p-4 lgl:p-8 rounded-lg shadow-shadowOne flex flex-col gap-8 justify-center">
      <img
        className="w-full h-64 object-cover rounded-lg mb-2"
        src={contactImg}
        alt="contactImg"
      />
      <div className="flex flex-col gap-4 text-gray-400">
        <h3 className="text-3xl font-bold text-white">Get in touch with us:</h3>
        <p className="text-lg font-normal text-gray-400">
        Email: <span className="text-gray-400">laossmileoct2023@gmail.com</span>
        </p>
        <p className="text-base text-gray-400 tracking-wide">
        
               </p>
        {/* <p className="text-gray-400">
          Clinic:
          <span className='text-lightText'> +65 12345678</span>
        </p> */}
        {/* <p className="text-base text-gray-400 flex items-center gap-2">
          Phone: <span className="text-lightText">+65 12345678</span>
        </p> */}



{/* PUT OTHER CONTACT INFORMATION OVER HERE!!!!!!!!!!!!! */}




        {/* <p className="text-base text-gray-400 flex items-center gap-2">
          
           </p> */}
      </div>
      <div className="flex flex-col gap-4 text-gray-400">
        <h2 className="text-base  uppercase font-titleFont mb-4">Find us at</h2>
        <div className="flex gap-4">
          <a href="https://youtu.be/_dih2JOb2C8" target="_blank">
            <span className="bannerIcon">
              <FaYoutube />
            </span>
          </a>
          
          <a href="https://www.instagram.com/mountelizabethhospitals/p/C0d2R7lInFg/?next=%2Frubykantor%2F&hl=ja&img_index=1" target="_blank">
              <span className="bannerIcon">
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
          <a href="https://www.facebook.com/watch/?v=1032449527847176" target="_blank">
              <span className="bannerIcon">
                <FaFacebookF />
              </span>
            </a>
        </div>
      </div>
    </div>
  );
};

export default ContactLeft;
