import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Sinema error boundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
          <div className="font-display text-5xl font-extrabold text-gradient sm:text-7xl">
            Oops!
          </div>
          <p className="max-w-md text-muted-foreground">
            Something went sideways while rendering the page. Your movie
            marathon can still go on — hit refresh to get back in.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-full bg-brand-gradient px-6 py-3 font-semibold text-white transition-transform hover:scale-105"
          >
            Refresh
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
