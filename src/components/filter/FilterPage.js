import React from 'react';
import styles from './FilterPage.css';

import Layout from '~/components/common/Layout';
import FilterSelector from '~/components/filter/FilterSelector';
import FilterSaveController from '~/components/filter/FilterSaveController';
import EXIF from '~/helpers/EXIF';

/**
 * @typedef Props
 * @property {Blob} blob
 * @property {() => any} onCancel
 * @property {(blob: Blob) => any} onSave
 */

/**
 * @typedef State
 * @property {string | null} filterType
 */

/** @extends {React.Component<Props, State>} */
class FilterPage extends React.Component {
  /** @type {State} */
  state = {
    filterType: null,
  };

  /** @type {React.RefObject<HTMLCanvasElement>}*/
  canvasRef = React.createRef();

  componentDidMount() {
    this.initialize();
  }

  async initialize() {
    const { blob } = this.props;
    const image = await createImageBitmap(blob);

    const canvas = this.canvasRef.current;
    Object.assign(canvas, {
      width: image.width,
      height: image.height,
    });
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);
  }

  /** @param {string} filterType */
  onSelectFilter = (filterType) => {
    this.setState({ filterType });
  };

  onCancel = () => {
    this.props.onCancel();
  };

  onSave = async () => {
    const { blob: original } = this.props;
    const exif = await EXIF.extractFrom(original);

    const canvas = this.canvasRef.current;
    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, 'image/jpeg'),
    );

    this.props.onSave(await exif.insertTo(blob));
  };

  render() {
    const { filterType } = this.state;

    return (
      <Layout>
        <canvas ref={this.canvasRef} className={styles.canvas} />
        <FilterSaveController onCancel={this.onCancel} onSave={this.onSave} />
        <FilterSelector
          filterType={filterType}
          onSelect={this.onSelectFilter}
        />
      </Layout>
    );
  }
}

export default FilterPage;
