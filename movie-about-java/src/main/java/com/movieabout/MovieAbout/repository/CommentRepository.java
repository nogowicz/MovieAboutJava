package com.movieabout.MovieAbout.repository;

import com.movieabout.MovieAbout.model.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CommentRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    public List<Comment> getAllPostComments(int idPost) {
        return jdbcTemplate.query("SELECT * FROM comments WHERE " +
                "postId = ?", BeanPropertyRowMapper.newInstance(Comment.class), idPost);
    }

    public Comment getById(int idComment) {
        return jdbcTemplate.queryForObject("SELECT * FROM comments WHERE " +
                "id = ?", BeanPropertyRowMapper.newInstance(Comment.class), idComment);
    }

    public int save(List<Comment> comments) {
        comments.forEach(comment -> jdbcTemplate.update("INSERT INTO comments(postId, content, addedBy, created_at) VALUES (?, ?, ?, ?)",
                comment.getPostId(),
                comment.getContent(),
                comment.getAddedBy(),
                comment.getCreatedAt()
                ));
        return 1;
    }

    public int update(Comment comment) {
        return jdbcTemplate.update("UPDATE comments SET content=? WHERE id=?",
                comment.getContent(),
                comment.getId()
        );
    }

    public int delete(int commentId) {
        return jdbcTemplate.update("DELETE FROM comments WHERE id=?", commentId);
    }

    public int deleteByPostId(int postId) {
        return jdbcTemplate.update("DELETE FROM comments WHERE postId=?", postId);
    }
}
