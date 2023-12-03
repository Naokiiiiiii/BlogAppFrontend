import { Box, Button, Typography } from '@mui/material'
import { useGetArticlesQuery } from '@reducers/blogApi/injections/articleApi'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

export const Articles: FC = () => {
  const { data, isLoading } = useGetArticlesQuery({})
  const navigate = useNavigate()
  const handleClickRow = (id: number) => {
    navigate(`${id}`)
  }
  return (
    <Box>
      {data?.map((datum, index) => (
        <Box key={index} display="flex" gap={4}>
          <Typography>{datum.title}</Typography>
          <Typography>{datum.contents}</Typography>
          <Button onClick={() => handleClickRow(datum.id)}>詳細</Button>
        </Box>
      ))}
    </Box>
  )
}
