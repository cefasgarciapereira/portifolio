import ciandtVideo from "../../../assets/videos/ciandt.webm"
import studiosolVideo from "../../../assets/videos/studiosol.webm"
import pucVideo from "../../../assets/videos/puc.webm"
import triventoVideo from "../../../assets/videos/trivento.webm"
import senacVideo from "../../../assets/videos/senac.webm"
import webgoalVideo from "../../../assets/videos/webgoal.webm"

const airbnbLogo = "https://michieldegraaf.com/assets/images/case-airbnb.png"

export interface Experience {
    company: string,
    role: string,
    link: string,
    image?: string,
    video?: string
}

export const experiences: Experience[] = [
    {
        company: "CI&T",
        role: "System Analist",
        link: "https://ciandt.com/br/pt-br",
        image: airbnbLogo,
        video: ciandtVideo
    },
    {
        company: "Studio Sol",
        role: "React Developer",
        link: "https://studiosol.com.br",
        image: airbnbLogo,
        video: studiosolVideo
    },
    {
        company: "PUC Minas",
        role: "Professor",
        link: "https://pucminas.br",
        image: airbnbLogo,
        video: pucVideo
    },
    {
        company: "Trivento",
        role: "React & React Native Developer",
        link: "https://triventoeducacao.com.br",
        image: airbnbLogo,
        video: triventoVideo
    },
    {
        company: "Senac",
        role: "Professor",
        link: "https://www.mg.senac.br",
        image: airbnbLogo,
        video: senacVideo
    },
    {
        company: "Webgoal",
        role: "Fullstack Developer",
        link: "https://www.webgoal.com.br",
        image: airbnbLogo,
        video: webgoalVideo
    }
]