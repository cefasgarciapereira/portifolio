import React from 'react';

import { Layout, SEO } from 'components';
import { About } from 'containers';

const AboutPage = () => (
  <Layout>
    <SEO title='Sobre' />
    <About />
  </Layout>
);

export default AboutPage;
