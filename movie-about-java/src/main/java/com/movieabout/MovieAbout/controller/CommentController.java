package com.movieabout.MovieAbout.controller;

import com.movieabout.MovieAbout.repository.CommentRepository;
import com.movieabout.MovieAbout.model.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    CommentRepository commentRepository;

    @GetMapping("/post/{postId}")
    public List<Comment> getAllPostComments(@PathVariable("postId") int postId){
        return commentRepository.getAllPostComments(postId);
    }

    @GetMapping("/{commentId}")
    public Comment getById(@PathVariable("commentId") int commentId) {
        return commentRepository.getById(commentId);
    }


    @PostMapping("")
    public int add(@RequestBody List<Comment> comments) {
        return commentRepository.save(comments);
    }

    @PutMapping("/{commentId}")
    public int update(@PathVariable("commentId") int commentId, @RequestBody Comment updatedComment) {
        Comment comment = commentRepository.getById(commentId);
        if(comment != null) {
            comment.setContent(updatedComment.getContent());
            commentRepository.update(comment);

            return 1;
        } else {
            //Return error code
            return -1;
        }
    }

    @PatchMapping("/{commentId}")
    public int partiallyUpdate(@PathVariable("commentId") int commentId, @RequestBody Comment updatedComment) {
        Comment comment = commentRepository.getById(commentId);
        if(comment != null) {
            if(updatedComment.getContent() != null) comment.setContent(updatedComment.getContent());

            commentRepository.update(comment);

            return 1;
        } else {
            //Return error code
            return -1;
        }
    }

    @DeleteMapping("/{commentId}")
    public int delete(@PathVariable("commentId") int commentId) {
        return commentRepository.delete(commentId);
    }
}
