import { FaGithub, FaLinkedin,FaFileDownload } from 'react-icons/fa';

const content = {
  title: 'Sobre.',
  subtitle: "Sou graduado em Ciências da Computação e atualmente estou cursando Mestrado em Engenharia de Software. O foco da minha pesquisa gira em torno da análise de tópicos e comportamento de usuários em redes sociais. Também atuei em trabalhos de design emocional aplicado à computação. Além da minha vida acadêmica, dedico meu tempo atuando como desenvolvedor, sobretudo em Javascript (React, ReactNative e Node.Js). Atuei como desenvolvedor em empresas, freelancer e também lecionei cursos na área da computação.",
  links: [
    {
      to: 'https://github.com/cefasgarciapereira',
      text: 'Github',
      Icon: FaGithub,
      newTab: true,
    },
    {
      to: 'https://www.linkedin.com/in/cefas-garcia-pereira-bbaaa080/',
      text: 'LinkedIn',
      Icon: FaLinkedin,
      newTab: true,
    },
    {
      to: 'https://www.overleaf.com/download/project/5dc1cbcbf56e340001f39a33/build/17419d63258-89b2dd136728246e/output/output.pdf?compileGroup=standard&clsiserverid=clsi-pre-emp-n1-c-hxr5&popupDownload=true',
      text: 'CV',
      Icon: FaFileDownload,
    }
  ],
};

export default content;
