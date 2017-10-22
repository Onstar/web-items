import Vue from 'vue'
import Router from 'vue-router'
import Bookshelf from '@/components/Bookshelf'
import Choiceness from "@/components/Choiceness"
import Stackroom from "@/components/Stackroom"
import Find from "@/components/Find"
import Search from "@/components/Search"
import BooksTypeDetail from "@/components/BooksTypeDetail"
import Book from "@/components/Book"
import ReadBook from "@/components/ReadBook"
import login from "@/components/login"
import sign from "@/components/sign"
//import ranklist from "@/components/ranklist/Ranklist"


Vue.use(Router)

export default new Router({
  routes: [
//	{
//		path: '*',
//    redirect:{"name":"Bookshelf"}
//	},
    {
      path: '/',
      name: 'Bookshelf',
      component: Bookshelf,
    },
    {
      path: '/Bookshelf',
      name: 'Bookshelf',
      component: Bookshelf,
    },
    {
      path: '/ranklist/weekRank',
      name: 'Choiceness',
      component: Choiceness,
    },
    {
      path: '/Stackroom',
      name: 'Stackroom',
      component: Stackroom,
    },
    {
      path: '/Find',
      name: 'Find',
      component: Find
    },
    {
      path: '/Search',
      name: 'Search',
      component: Search
    },
    {
      path: '/bookcat/detail',
      name: 'BooksTypeDetail',
      component: BooksTypeDetail
    },
    {
      path: '/book/:bookId',
      name: 'book',
      component: Book
    },
    {
      path: '/readbook/:bookId',
      name: 'readbook',
      component: ReadBook
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/sign',
      name: 'sign',
      component: sign
    },
//   {
//    path: '/ranklist',
//    name: 'ranklist',
////    redirect: '/ranklist/weekRank',
////    component: Ranklist,
//    children: [{
//      path: '/ranklist/*',
//      name: 'RanklistDetail',
//      component: RanklistDetail
//    }]
//  }
    
  ]
})
