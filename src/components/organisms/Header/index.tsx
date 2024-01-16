import Logo from "../../atoms/Logo"

export default function Header() {
    return (
        <>
            <head>
                <title>cefas, software engineer, developer, fullstack, reactjs, master, software, code</title>
                <meta name="description" content="Cefas Garcia Pereira has Master in Software Engineering (PUC-MG) and Bachelor in Computer Science (PUC-MG)." />
                <meta name="keywords" content="Master in Software Engineering (PUC-MG) and Bachelor in Computer Science (PUC-MG). I\'ve been working for more than 6 years in processes and development of web applications, iOS/Android apps, prototyping, UI/UX with experience in React, React Native, NodeJs, Python, MongoDB, AEM etc. I am currently a Software Engineer at CI&T." />
                <meta name="robots" content="" />
                <meta name="revisit-after" content="1 day" />
                <meta name="language" content="Portuguese" />
                <meta name="generator" content="N/A" />
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

                <title>Cefas Garcia Pereira | Software Engineer | M.Sc</title>
                <meta name="title" content="Cefas Garcia Pereira | Software Engineer | M.Sc" />
                <meta name="description" content="Crafting code, I engineer solutions with technical rigor and following the best practices." />

                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://cefas.me/" />
                <meta property="og:title" content="Cefas Garcia Pereira | Software Engineer | M.Sc" />
                <meta property="og:description" content="Crafting code, I engineer solutions with technical rigor and following the best practices." />
                <meta property="og:image" content="/public/cefas.png" />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://cefas.me/" />
                <meta property="twitter:title" content="Cefas Garcia Pereira | Software Engineer | M.Sc" />
                <meta property="twitter:description" content="Crafting code, I engineer solutions with technical rigor and following the best practices." />
                <meta property="twitter:image" content="/public/cefas.png" />
            </head>
            <header>
                <div className="logo">
                    <Logo />
                </div>
            </header>
        </>
    )
}