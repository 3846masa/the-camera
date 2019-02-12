import React from 'react';

import Layout from '~/components/common/Layout';
import CameraView from '~/components/camera/CameraView';
import CameraController from '~/components/camera/CameraController';

class CameraPage extends React.Component {
  render() {
    return (
      <Layout>
        <CameraView />
        <CameraController />
      </Layout>
    );
  }
}

export default CameraPage;
