import { Dispatch, SetStateAction } from "react"

export type OneAreaOfBookshelfProps = {
  label: string,
  labelColor: string
}

export type Book = {
  id: string,
  volumeInfo: {
    title: string,
    authors: string[],
    description: string,
    imageLinks: {
      smallThumbnail: string,
      thumbnail: string
    },
    publishedDate: string
  }
}

export type detailContent = {
  volumeInfo: {
    title: string,
    authors: string[],
    description: string,
    imageLinks: {
      smallThumbnail: string,
      thumbnail: string
    },
    publishedDate: string
  },
  setShowDetail: Dispatch<SetStateAction<boolean>>
}