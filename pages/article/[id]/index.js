import Link from 'next/link'
import { useRouter } from 'next/router'

const Article = ({ article }) => {
  //   const router = useRouter()
  //   const { id } = router.query

  return (
    <>
      <h1>{article.title}</h1>
      <p>{article.body}</p>
      <br />
      <Link href='/'>Go Back</Link>
    </>
  )
}

export const getStaticProps = async (context) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${context.params.id}`
  )
  const article = await response.json()

  return {
    props: {
      article,
    },
  }
}

export const getStaticPaths = async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=6`
  )
  const articles = await response.json()

  const ids = articles.map(({ id }) => id)
  const paths = ids.map((id) => ({ params: { id: id.toString() } }))

  return {
    paths,
    fallback: false,
  }
}

export default Article
