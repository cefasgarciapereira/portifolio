import { Fragment } from "react"
import { useLocation } from "react-router-dom"
import useTranslation from "../../services/useTranslation"
import { PostTranslation, content } from "./translation"
import { handlePubDate } from "../../utils/blog"

export default function Post() {
  const { state } = useLocation()
  const text = useTranslation({ content }) as PostTranslation

  return (
    <Fragment>
      <div className="post-page">
        <h1>{state.title}</h1>
        <span>{handlePubDate(state.pubDate)}</span>
        <a href={state.link} style={{ margin: "1rem 0" }}>{text.read}</a>
        <div className="post-page_content_wrapper">
          <div
            dangerouslySetInnerHTML={{ __html: state.content }}
          />
        </div>
      </div>
    </Fragment>
  )
}