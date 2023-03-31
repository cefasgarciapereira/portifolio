import { Fragment } from "react"

import Experience from "../../components/organisms/Experience"
import Header from "../../components/organisms/Header"
import Contacts from "../../components/organisms/Contacts"
import useTranslation from "../../services/useTranslation"

import { content, HomeTranslation } from "./translation"

export default function Home() {
    const text = useTranslation({ content }) as HomeTranslation

    return (
        <Fragment>
            <Header />
            <h1 className="name">
                {"Cefas Garcia Pereira"}
                <br />
                <span className="role">{`— ${text.role}`}</span>
            </h1>
            <p className="mt-2 introduction">
                {text.intro}
            </p>
            <div className="flex">
                <a
                    className="link mt-2" href="mailto:cefasgarciapereira@gmail.com"
                >
                    {text.getInTouch}
                </a>
            </div>
            <Experience />
            <div>
                <p className="mt-2 conclusion">
                    {text.conclusion1}
                </p>
                <p className="conclusion">
                    {text.conclusion2}
                </p>
            </div>

            <div className="available mt-2">
                <p>{text.available}</p>
                <a href="mailto:cefasgarciapereira@gmail.com" className="link">{text.getInTouch}</a>
            </div>
            <Contacts />
        </Fragment>
    )
}