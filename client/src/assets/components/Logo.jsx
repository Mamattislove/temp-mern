import logo from "../images/logo.svg";

const Logo = ({ otherClassName }) => {
    return (
        <div>
            <img src={logo} alt="wee" className={otherClassName} />
        </div>
    );
};
export default Logo;
