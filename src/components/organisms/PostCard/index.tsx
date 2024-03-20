interface PostCardProps{
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
    return(
        <div className="post-card">
            <h4>{props.title}</h4>
            <div>
                {props.categories?.map((category, idx) => 
                <span key={`${category}-${idx}`} className="post-card_tag">
                    {category}
                </span>
                )}
            </div>
            <div className="post-card_footer">
                <span>{`${handleReadTime(props.content)} min`}</span>
                <span>{handlePubDate(props.pubDate)}</span>
            </div>
        </div>
    )
}

function handlePubDate(date: string): string{
    return date.split(" ")[0]
}

function handleReadTime(content: string): Number{
    return Number((content.length / 1800).toFixed())
}

export default PostCard