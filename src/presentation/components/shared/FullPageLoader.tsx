export const FullPageLoader = ({ label = 'Memuat…' }: { readonly label?: string }) => (
  <div className="full-loader" role="status" aria-live="polite">
    <span className="spinner spinner--large" aria-hidden="true" />
    <p className="full-loader__label">{label}</p>
  </div>
)
