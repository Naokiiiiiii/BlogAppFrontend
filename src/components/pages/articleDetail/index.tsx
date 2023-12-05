import { CircularProgress, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useGetArticleDetailQuery } from '@reducers/blogApi/injections/articleApi'
import { FC } from 'react'
import { useParams } from 'react-router-dom'

export const ArticleDetail: FC = () => {
  const { id } = useParams()
  const { data: article, isLoading } = useGetArticleDetailQuery({ article_id: Number(id) })

  return (
    <Box>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box>
          <Typography>article: {article?.id}</Typography>
          <Typography>title: {article?.title}</Typography>
          <Typography>contents: {article?.contents}</Typography>
          <Typography>created_at: {article?.created_at}</Typography>
          <Typography>updated_at: {article?.updated_at}</Typography>
          <Box>
            <Typography>コメント一覧</Typography>
            {article?.comments && article.comments.length > 0 ? (
              article.comments.map((comment) => (
                <Box key={comment.comment_id}>
                  <Typography>
                    {comment.message} {comment.user_name}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography>コメントなし</Typography>
            )}
          </Box>
        </Box>
      )}
    </Box>
  )
}
