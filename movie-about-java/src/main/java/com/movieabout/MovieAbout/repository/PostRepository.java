package com.movieabout.MovieAbout.repository;

import com.movieabout.MovieAbout.model.Comment;
import com.movieabout.MovieAbout.model.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PostRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    public List<Post> getAll() {
        return jdbcTemplate.query("SELECT * FROM posts", BeanPropertyRowMapper.newInstance(Post.class));
    }
    public List<Post> getAllPostsWithComments() {
        List<Post> posts = jdbcTemplate.query("SELECT * FROM posts", BeanPropertyRowMapper.newInstance(Post.class));

        for (Post post : posts) {
            List<Comment> comments = jdbcTemplate.query(
                    "SELECT * FROM comments WHERE postId = ?",
                    new Object[]{post.getId()},
                    BeanPropertyRowMapper.newInstance(Comment.class)
            );

            post.setComments(comments);
        }

        return posts;
    }


    public Post getById(int idPost) {
        return jdbcTemplate.queryForObject("SELECT * FROM posts WHERE " +
                "id = ?", BeanPropertyRowMapper.newInstance(Post.class), idPost);
    }

    public int save(List<Post> posts) {
        posts.forEach(post -> jdbcTemplate.update("INSERT INTO posts(title, date, content, anonymous, mediaType, addedBy) VALUES(?, ?, ?, ?, ?, ?)",
                    post.getTitle(),
                    post.getDate(),
                    post.getContent(),
                    post.isAnonymous(),
                    post.getMediaType(),
                    post.getAddedBy()
                ));
        return 1;
    }

    public int update(Post post) {
        return jdbcTemplate.update("UPDATE posts SET title=?, content=?, mediaType=? WHERE id=?",
                post.getTitle(),
                post.getContent(),
                post.getMediaType(),
                post.getId()
        );
    }

    public int delete(int postId) {
        return jdbcTemplate.update("DELETE FROM posts WHERE id=?", postId);
    }
}
