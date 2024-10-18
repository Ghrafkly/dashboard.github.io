import "../styles/footer.sass";
import { FaGithub } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer>
            <span>Made by Kyle Sharp</span>
            <a href="https://github.com" target="_blank" rel="noreferrer">
                <span>Edit on Github</span> <FaGithub size={20} />
            </a>
        </footer>
    )
}

export default Footer;