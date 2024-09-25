'use client'

import { useEffect, useState } from "react";

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

const useMedium = () => {
  const [data, setData] = useState<MediumData>(initialState)

  useEffect(() => {
    handleMediumData()
  }, [])

  async function handleMediumData() {
    const mediumData = await fetchMediumData()
    setData(mediumData)
  }

  async function fetchMediumData(): Promise<MediumData> {
    try {
      const res = await fetch("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@cefasgpereira")
      const resJson = await res.json() as MediumData
      return resJson
    } catch (err) {
      console.error(err)
      return initialState
    }
  }

  return { data }
}

export default useMedium