import PostCard from "@/components/organisms/PostCard"

export interface MediumData {
  status: string
  feed: MediumFeed
  items: Array<MediumItem>
}

interface MediumFeed {
  author: string
  description: string
  image: string
  link: string
  title: string
  url: string
}

interface MediumItem {
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

const initialState: MediumData = {
  status: "",
  feed: {
    author: "",
    description: "",
    image: "",
    link: "",
    title: "",
    url: ""
  },
  items: []
}


export default async function Page() {
  let response = await fetch("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@cefasgpereira")
  const data = await response.json() as MediumData

  return (
    <ul>
      {data.items.map((item, index) => (
        <li key={`${item.title}_${index}`}>
          <PostCard {...item} key={item.link} />
        </li>
      ))}
    </ul>
  )
}