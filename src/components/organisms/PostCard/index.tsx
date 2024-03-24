import { Link } from "react-router-dom"
import useTranslation from "../../../services/useTranslation"
import { PostCardTranslation, content } from "./translation"
import { handleReadTime, handlePubDate } from "../../../utils/blog"

interface PostCardProps {
    author: string
    categories: Array<string>
    content: string
    description: string
    enclosure: object
    guid: string
    link: string
    pubDate: string
    thumbnail: string
    title: string
}

const PostCard = (props: PostCardProps) => {
    const text = useTranslation({ content }) as PostCardTranslation

    return (
        <div className="post-card">
            <h4>
                <Link
                    to={{
                        pathname: "/post"
                    }}
                    state={props}
                >
                    {props.title}
                </Link>
            </h4>
            <div className="post-card_data">
                <span>{`${handleReadTime(props.content)} min `}{text.read}</span>
                <span>{handlePubDate(props.pubDate)}</span>
            </div>
            <div>
                {props.categories?.map((category, idx) =>
                    <span key={`${category}-${idx}`} className="post-card_tag">
                        {category}
                    </span>
                )}
            </div>
        </div>
    )
}

export default PostCard