import "./stylesDeveloper.css"

export default function Developer({srcImg, name, email}){
    return <div className="container-developer">
        <div className="card-developer">
            <img src={srcImg}/>
            <h2>{name}</h2>
            <a href={`mailto:${email}`}>{email}</a>
        </div>
    </div>
}