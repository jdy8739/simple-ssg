export default {
    build: {
        contents: 'contents',
        pages: 'pages',
        dist: 'dist',
        contentsSlug: 'post'
    },
    site: {
        title: 'My Blog',
        author: 'jdy8739'
    },
    updatePost(post) {
        return {
            ...post,
            created_at: post.created_at.toLocaleDateString()
        }
    }
};