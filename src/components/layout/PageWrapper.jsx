export default function PageWrapper({ children }) {
  return (
    <div style={{ position: 'relative', zIndex: 'var(--z-content, 10)', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {children}
    </div>
  )
}
