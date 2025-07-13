import React from 'react';
import styles from './SearchResult.module.css';
import fetchData, { type DataResult } from './ApiRequest';

type Props = {
  searchText: string;
};

type State = {
  data: DataResult[];
  isLoading: boolean;
  error: string | null;
};

class SearchResult extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      data: [],
      isLoading: false,
      error: null,
    };
  }

  async componentDidMount(): Promise<void> {
    await this.runFetch();
  }

  async componentDidUpdate(prevProps: Readonly<Props>): Promise<void> {
    if (prevProps.searchText !== this.props.searchText) {
      await this.runFetch();
    }
  }

  async runFetch(): Promise<void> {
    try {
      this.setState({ isLoading: true });
      const result = await fetchData(this.props.searchText);
      this.setState({ data: result, isLoading: false, error: null });
    } catch (err) {
      if (err instanceof Error) {
        this.setState({ error: err.message, isLoading: false });
        console.log('>>> Error: ', err);
      } else {
        this.setState({ error: 'Unexpected error', isLoading: false });
        console.log('>>> Unknown error: ', err);
      }
    }
  }

  render(): React.ReactNode {
    const { data, isLoading, error } = this.state;
    return (
      <>
        <div className={styles.search_result}>
          {isLoading && <p>Loading...</p>}
          {error && <p>Error Message: {error}</p>}
          {!isLoading && !error && (
            <div className={styles.row}>
              <div className={styles.cell}>
                <strong>Name</strong>
              </div>
              <div className={styles.cell}>
                <strong>Description</strong>
              </div>
            </div>
          )}
          {!isLoading &&
            !error &&
            data.map((item, index) => {
              return (
                <div className={styles.row} key={index}>
                  <div className={styles.cell}>{item.name}</div>
                  <div className={styles.cell}>
                    Height: {item.height}; Weight: {item.weight}
                  </div>
                </div>
              );
            })}
          {!isLoading && !error && data.length === 0 && (
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
