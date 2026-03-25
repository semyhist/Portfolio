import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hataVar: false };
  }
  static getDerivedStateFromError(error) {
    return { hataVar: true };
  }
  componentDidCatch(err, errorInfo) {
    console.error(err);
  }
  render() {
    if (this.state.hataVar) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', color: '#fff', textAlign: 'center', padding: '20px' }}>
          <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '20px', background: 'linear-gradient(45deg, #ff006e, #8338ec)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Bir şeyler ters gitti
            </h1>
            <p style={{ marginBottom: '20px', opacity: 0.7 }}>
              Sayfa yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.
            </p>
            <button onClick={() => window.location.reload()} style={{ padding: '12px 24px', background: 'linear-gradient(45deg, #ff006e, #8338ec)', border: 'none', borderRadius: '25px', color: 'white', cursor: 'pointer', fontWeight: '600' }}>
              Sayfayı Yenile
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;