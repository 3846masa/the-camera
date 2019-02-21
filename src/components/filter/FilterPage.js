import React from 'react';
import styles from './FilterPage.css';

import Layout from '~/components/common/Layout';
import Loading from '~/components/common/Loading';
import FilterSelector from '~/components/filter/FilterSelector';
import FilterSaveController from '~/components/filter/FilterSaveController';
import EXIF from '~/helpers/EXIF';
import applyFilter from '~/helpers/applyFilter';

/**
 * @typedef Props
 * @property {Blob} blob
 * @property {() => any} onCancel
 * @property {(blob: Blob) => any} onSave
 */

/**
 * @typedef State
 * @property {string | null} filterType
 * @property {boolean} loading
 */

/** @extends {React.Component<Props, State>} */
class FilterPage extends React.Component {
  /** @type {State} */
  state = {
    filterType: null,
    loading: false,
  };

  /** @type {React.RefObject<HTMLCanvasElement>}*/
  canvasRef = React.createRef();

  componentDidMount() {
    this.initialize();
  }

  /** @param {State} prevState */
  componentDidUpdate(_prevProps, prevState) {
    if (this.state.filterType !== prevState.filterType) {
      this.applyFilter();
    }
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

  async applyFilter() {
    const { blob } = this.props;
    const { filterType } = this.state;

    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    const result = await applyFilter(blob, filterType);
    ctx.drawImage(result, 0, 0);

    this.setState({ loading: false });
  }

  /** @param {string} filterType */
  onSelectFilter = (filterType) => {
    this.setState({ filterType, loading: true });
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
    const { filterType, loading } = this.state;

    return (
      <Layout>
        <canvas ref={this.canvasRef} className={styles.canvas} />
        <FilterSaveController onCancel={this.onCancel} onSave={this.onSave} />
        <FilterSelector
          filterType={filterType}
          onSelect={this.onSelectFilter}
        />
        <Loading loading={loading} />
      </Layout>
    );
  }
}

export default FilterPage;
