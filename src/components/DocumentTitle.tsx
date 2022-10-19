import { Helmet } from 'react-helmet-async'

export const DocumentTitle = ({ value }: { value: string }) => {
  return (
    <Helmet>
      <title>{value}</title>
    </Helmet>
  )
}
