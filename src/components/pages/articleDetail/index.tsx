import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useGetArticleDetailQuery } from '@reducers/blogApi/injections/articleApi'
import { FC } from 'react'
import { useParams } from 'react-router-dom'

export const ArticleDetail: FC = () => {
  const { id } = useParams()
  const { data: article, isLoading } = useGetArticleDetailQuery({ article_id: Number(id) })

  return (
    <Box>
      <Typography>article: {article?.id}</Typography>
      <Typography>title: {article?.title}</Typography>
      <Typography>contents: {article?.contents}</Typography>
      <Typography>created_at: {article?.created_at}</Typography>
      <Typography>updated_at: {article?.updated_at}</Typography>
    </Box>
  )
}
