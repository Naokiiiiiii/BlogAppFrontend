import { FC } from 'react'
import { Link } from 'react-router-dom'

export const Home: FC = () => {
  return <Link to="/articles">記事一覧</Link>
}
