import { Fragment } from "react"
import useMedium from "../../services/useMedium"

import PostCard from "../../components/organisms/PostCard"

const Blog = () => {
    const { data } = useMedium()

    return (
        <Fragment>
            {data.items.map(item => (
                <PostCard {...item} key={item.link} />
            ))}
        </Fragment>
    )
}

export default Blog