
import "./Logo.css"

{ /* used in header */ }
interface LogoSmallProps {
    className:string;
} 
export const LogoSmall = ({className}:LogoSmallProps) => {

    return (
        <div className={`${className}`}>
            <div className="logo-s-div">
                <img src="src\assets\icon-128.png" alt="logo"></img>
                <div className="logo-s-title">
                    <p className="london-s-bold">LONDON</p> 
                    <p className="ls-s-regular">LANGUAGE SCHOOL</p>
                </div>
            </div>
        </div>
    )
}

{ /* used in homepage */ }
interface LogoBigProps {
    className:string;
} 

export const LogoBig = ({className}:LogoBigProps) => {

    return (
        <div className={`${className}`}>
            <div className="logo-b-div">
                <img src="src\assets\icon-256.png" alt="logo"></img>
                <div className="logo-b-title">
                    <p className="london-b-bold">LONDON</p> 
                    <p className="ls-b-regular">LANGUAGE SCHOOL</p>
                </div>
            </div>
        </div>
    )
}