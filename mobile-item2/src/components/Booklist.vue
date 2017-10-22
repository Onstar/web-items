<template>
	<li @click="getBook()">
		<img :src="imgUrl">
		<div class="book-info">
			<p class="book-title">{{book.title}}</p>
			<p class="book-author">{{book.author}} | {{book.cat}}</p>
			<p class="short-intro">{{book.shortIntro}}</p>
			<p class="reader-info">{{latelyFollower}}万人气 | {{book.retentionRatio}}%读者留存</p>
		</div>
	</li>
</template>

<script>
//import util from '@/utils/util'
export default {
  name: 'Bookslist',
  data () {
    return {

    }
  },
  props: ['book'],
  computed: {
    latelyFollower () {
      return (this.book.latelyFollower / 10000).toFixed(1)
    },
    imgUrl () {
      return 'http://statics.zhuishushenqi.com' + this.book.cover
    }
  },
  methods: {
    getBook () {
      // 只记录从不是搜索结果中进入书本详情的路径，不然会出现死循环
      // if(this.$route.path.indexOf('/search') === -1){
      //     this.$store.commit('setPrePath', this.$route.fullPath);
      // } 
      this.$router.push('/book/' + this.book._id)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$sc:50;
img {
	width: 160/$sc+rem;
	height: 200/$sc+rem;
	float: left;
	margin-right: 16/$sc+rem;
}

li {
	margin-left: 40/$sc+rem;
	margin-right: 40/$sc+rem;
	border-bottom: 1px solid #e6dbdb;
	padding-bottom: 8/$sc+rem;
	padding-top: 8/$sc+rem;
}

li:active,
li:focus {
	background: #f2f2f2;
}

.book-info {
	box-sizing: border-box;
	width: 100%;
	height: 200/$sc+rem;
	padding-left: 200/$sc+rem;
	padding-top: 8/$sc+rem;
	padding-bottom: 8/$sc+rem;
}

.book-title {
	font-weight: bold;
}

.short-intro {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	color: #655555;
}

.book-author {
	color: #655555;
}

.book-info p {
	margin-top: 0;
	margin-bottom: 0;
	font-size: 28/$sc+rem;
	line-height: 48/$sc+rem;
}
</style>
