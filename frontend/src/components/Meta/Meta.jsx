import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
    </Helmet>
  );
};

Meta.defaltProps = {
  title: 'Jktrans App',
  description: 'Kelola pembukuan transaksi dengan mudah dan cepat',
};

export default Meta;
