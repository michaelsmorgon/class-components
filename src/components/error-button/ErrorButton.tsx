import type { ReactNode } from 'react';
import style from './ErrorButton.module.css';
import React from 'react';

type State = {
  hasError: boolean;
};

class ErrorButton extends React.Component<Record<string, never>, State> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = { hasError: false };
  }

  handleClick = () => {
    this.setState({ hasError: true });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      throw new Error('Error for checking ErrorBoundary');
    }
    return (
      <button className={style.error_btn} onClick={this.handleClick}>
        Throw Error
      </button>
    );
  }
}

export default ErrorButton;
