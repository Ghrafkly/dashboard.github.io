import { FaRegCircle } from "react-icons/fa6";
import "../styles/testing.sass"


const Testing = () => {
    const size = 20;

    return (
        <div className='Testing'>
            <FaRegCircle className="green" size={size} />
            <FaRegCircle className="yellow" size={size} />
            <FaRegCircle className="red" size={size} />
        </div>
    );
}

export default Testing;