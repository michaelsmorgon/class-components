import React from 'react';
import styles from './SearchResult.module.css';
import fetchData, { type DataResult } from './ApiRequest';

type Props = {
  searchText: string;
};

type State = {
  data: DataResult[];
};

class SearchResult extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  async componentDidMount(): Promise<void> {
    const result = await fetchData(this.props.searchText);
    this.setState({ data: result });
  }

  async componentDidUpdate(prevProps: Readonly<Props>): Promise<void> {
    if (prevProps.searchText !== this.props.searchText) {
      const result = await fetchData(this.props.searchText);
      this.setState({ data: result });
    }
  }

  render(): React.ReactNode {
    return (
      <>
        <div className={styles.search_result}>
          <div className={styles.row}>
            <div className={styles.cell}>
              <strong>Name</strong>
            </div>
            <div className={styles.cell}>
              <strong>Description</strong>
            </div>
          </div>
          {this.state.data.map((item, index) => {
            return (
              <div className={styles.row} key={index}>
                <div className={styles.cell}>{item.name}</div>
                <div className={styles.cell}>
                  Height: {item.height}; Weight: {item.weight}
                </div>
              </div>
            );
          })}
          {this.state.data.length === 0 && (
            <div className={styles.row} key={0}>
              No data...
            </div>
          )}
        </div>
      </>
    );
  }
}

export default SearchResult;
