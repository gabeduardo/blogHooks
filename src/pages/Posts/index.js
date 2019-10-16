import React from 'react'
import { PostListProvider } from '../../context'
import PostList from './PostList'
import './index.scss'


// o sea este index sirve para hacer un wraper y que asi el componente de POstLists
//  pueda tener el state
const Posts = () => (
  <PostListProvider>
    <PostList />
  </PostListProvider>
)

export default Posts
