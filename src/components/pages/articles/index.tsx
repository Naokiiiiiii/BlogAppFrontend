import { Box, Button, Typography } from '@mui/material'
import { useGetArticlesQuery } from '@reducers/blogApi/injections/articleApi'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

export const Articles: FC = () => {
  const { data: articles, isLoading } = useGetArticlesQuery({})
  const navigate = useNavigate()
  const handleClickRow = (id: number) => {
    navigate(`${id}`)
  }
  return (
    <Box>
      {articles?.map((article) => (
        <Box key={article.id} display="flex" gap={4}>
          <Typography>{article.title}</Typography>
          <Typography>{article.contents}</Typography>
          <Button onClick={() => handleClickRow(article.id)}>詳細</Button>
        </Box>
      ))}
    </Box>
  )
}
