package com.movieabout.MovieAbout.controller;

import com.movieabout.MovieAbout.repository.CommentRepository;
import com.movieabout.MovieAbout.model.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    CommentRepository commentRepository;

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/post/{postId}")
    public List<Comment> getAllPostComments(@PathVariable("postId") int postId){
        return commentRepository.getAllPostComments(postId);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/{commentId}")
    public Comment getById(@PathVariable("commentId") int commentId) {
        return commentRepository.getById(commentId);
    }


    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("")
    public int add(@RequestBody Comment comments) {
        return commentRepository.save(comments);
    }

    @CrossOrigin(origins = "http://localhost:5173")
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


    @CrossOrigin(origins = "http://localhost:5173")
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

    @CrossOrigin(origins = "http://localhost:5173")
    @DeleteMapping("/{commentId}")
    public int delete(@PathVariable("commentId") int commentId) {
        return commentRepository.delete(commentId);
    }
}
