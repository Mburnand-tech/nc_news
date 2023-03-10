import { useEffect , useState } from 'react'
import { useSearchParams , useParams} from 'react-router-dom' 
import { fetchAllArticles } from './utils'

import RenderArticle from './RenderArticle'

const AllArticles = () => {
    
    const [ loading, setLoading ] = useState(false)
    const [ articles, setArticles ] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()    
    const {topic} = useParams()

    useEffect(()=> {
        setLoading(true)

        const newParams = new URLSearchParams(searchParams)
        newParams.set('topic', topic)
        setSearchParams(newParams)


        fetchAllArticles(searchParams)
        .then((data)=> {
            setArticles(data)
            setLoading(false)
        })
    }, [searchParams, setSearchParams, topic])

    if (loading) return <p> Loading...</p>

    return (
        <ul>
        {
            articles.map((article) => {
                return <li key={article.article_id}><RenderArticle article={article}/></li>
            })
        }
        </ul>

    )
}

export default AllArticles