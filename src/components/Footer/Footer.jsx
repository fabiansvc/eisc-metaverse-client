import Credits from "../Credits/Credits"
import "./stylesFooter.css"

export default function Footer(){
    return <div className="container-footer">
        <span> Copyright © 2023-2024 </span>
        <ul>
            <Link to={<Credits/>}> Créditos </Link>
        </ul>
    </div>
}