import { Helmet } from 'react-helmet'
import React from 'react'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}
Meta.defaultProps = {
  title: 'Sell & Buy Anything ',
  description:
    'Buy the second hand products at cheap price only on sell anything ',
  keyword: 'notes, buy electronics, second hand products, ioe, lamachaur sell',
}
export default Meta
