import { Box, Button, Typography } from '@mui/material'
import { useDeleteArticleMutation, useGetArticlesQuery } from '@reducers/blogApi/injections/articleApi'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from 'store'

export const Articles: FC = () => {
  const { data: articles, isLoading } = useGetArticlesQuery({})
  const [deleteArticle] = useDeleteArticleMutation()
  const { user } = useAppSelector((state) => state.Auth)
  const navigate = useNavigate()
  const handleClickRow = (id: number) => {
    navigate(`${id}`)
  }
  const handleClickDelete = async (id: number) => {
    await deleteArticle({ article_id: id })
  }
  return (
    <Box>
      {articles?.map((article) => (
        <Box key={article.id} display="flex" gap={4}>
          <Typography>{article.title}</Typography>
          <Typography>{article.contents}</Typography>
          <Button onClick={() => handleClickRow(article.id)}>詳細</Button>
          {user?.user_id === article.user_id && <Button onClick={() => handleClickDelete(article.id)}>削除</Button>}
        </Box>
      ))}
    </Box>
  )
}
