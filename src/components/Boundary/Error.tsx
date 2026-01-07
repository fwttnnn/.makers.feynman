import React from "react"

export type Props = {
  children: React.ReactNode
}

export type State = {
  error: Error | null,
}

/**
 * 17.3 (error boundaries)
 * 9.1 (components)
 */
export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      error: null,
    }
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      error
    }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error(".makers.feynman caught:", error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <p>something went wrong</p>
          <pre>{this.state.error?.message}</pre>
          <button onClick={() => this.setState({ error: null })}>
            try again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
