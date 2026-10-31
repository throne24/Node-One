<script setup>
import { data } from '../../data/posts.data.js'
import { withBase } from 'vitepress'
</script>

<template>
  <div v-if="data.length" class="post-list">
    <article v-for="post in data" :key="post.url" class="post-item">
      <h3 class="post-title">
        <a :href="withBase(post.url)">{{ post.title }}</a>
      </h3>
      <time v-if="post.date" class="post-date">{{ post.date }}</time>
      <p v-if="post.summary" class="post-excerpt">{{ post.summary }}</p>
    </article>
  </div>
  <p v-else class="post-empty">还没有文章，去写一篇吧。</p>
</template>
