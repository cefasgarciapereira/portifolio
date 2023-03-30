const contacts = [
    {
        label: "Linkedin",
        link: "https://www.linkedin.com/in/cefas-garcia-pereira"
    },
    {
        label: "Email",
        link: "mailto:cefasgarciapereira@gmail.com"
    },
    {
        label: "Github",
        link: "https://github.com/cefasgarciapereira"
    },
    {
        label: "CV",
        link: "google.com.br"
    }
]

export default function Contacts() {
    return (
        <ul>
            {
                contacts.map((contact, index) => (
                    <li>
                        <a
                            className="link--simple"
                            href={contact.link}
                            style={{
                                opacity: +(1 - (index * 0.25))
                            }}
                        >
                            {contact.label}
                        </a>
                    </li>
                ))
            }
        </ul>
    )
}