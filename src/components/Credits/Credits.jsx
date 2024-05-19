import Developer from "./Developer/Developer"
import "./stylesCredits.css"

export default function Credits(){
    return <div className="container-credits">
        <h1> Profesores Universidad del Valle </h1>
        <Developer srcImg={"/assets/developers/fabian-valencia.jpg"} name={"Fabian Stiven Valencia Cordoba"} email={"fabian.cordoba@correounivalle.edu.co"}/>
        <Developer srcImg={"/assets/developers/paola-rodriguez.jpg"} name={"Paola Johanna Rodriguez Carrillo"} email={"rodriguez.paola@correounivalle.edu.co"}/>
        <Developer srcImg={"/assets/developers/javier-reyes.jpg"} name={"Javier Mauricio Reyes Vera"} email={"javier.reyes@correounivalle.edu.co"}/>
    </div>
}