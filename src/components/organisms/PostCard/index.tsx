import useTranslation from "../../../services/useTranslation"
import { PostCardTranslation, content } from "./translation"

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
                <a href={props.link} target="_blank">{props.title}</a>
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

function handlePubDate(date: string): string {
    return date.split(" ")[0]
}

function handleReadTime(content: string): Number {
    return Number((content.length / 1800).toFixed())
}

export default PostCard