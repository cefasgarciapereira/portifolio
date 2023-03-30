import { Fragment } from "react"

import Experience from "../../components/organisms/Experience"
import Header from "../../components/organisms/Header"
import Contacts from "../../components/organisms/Contacts"

export default function Home() {
    return (
        <Fragment>
            <Header />
            <h1 className="name">
                {"Cefas Garcia Pereira"}
                <br />
                <span className="role">{`— Fullstack Developer `}</span>
            </h1>
            <p className="mt-2 introduction">
                {`Mestre em Engenharia de Software (PUC-MG) e Bacharel em Ciência da Computação (PUC-MG). 
                Trabalho a mais de ${new Date().getFullYear() - 2017} anos em processos e desenvolvimento de aplicações web, apps iOS/Android,
                prototipação, UI/UX e tenho experiência com React, React Native, NodeJs, Python, MongoDB,
                AEM etc. Atualmente sou Analista de Sistemas na CI&T.`}
            </p>
            <div className="flex">
                <a className="link" href="mailto:cefasgarciapereira@gmail.com">Fale comigo!</a>
            </div>
            <Experience />
            <p className="mt-2 conclusion">
                {`Nos últimos anos, tive o prazer de colaborar em projetos de startups, pequenas 
                e grandes empresas de diversos setores. Trabalhando para potencializar e refinar 
                os negócios através da tecnologia.`}
            </p>
            <p className="conclusion">
                Busco projetar soluções simples e eficazes, sem reiventar a roda.
                Para isso utilizo ferramentas como prototipagem, desenvolvimento através de iterações e sempre me inspiro
                em grandes nomes da área como: Uncle Bob, Peter Desmet, Don Norman e outros.
            </p>

            <div className="available">
                <p>
                    Disponível para projetos.
                </p>
                <a href="mailto:cefasgarciapereira@gmail.com" className="link">Entrar em contato</a>
            </div>
            <Contacts />
        </Fragment>
    )
}