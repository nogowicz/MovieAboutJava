package com.movieabout.MovieAbout.controller;

import com.movieabout.MovieAbout.repository.CommentRepository;
import com.movieabout.MovieAbout.model.Post;
import com.movieabout.MovieAbout.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    PostRepository postRepository;

    @Autowired
    CommentRepository commentRepository;

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("")
    public List<Post> getAll() {
        return postRepository.getAll();
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/postsWithComments")
    public List<Post> getAllPostsWithComments() {
        return postRepository.getAllPostsWithComments();
    }


    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/{postId}")
    public Post getById(@PathVariable("postId") int postId) {
        return postRepository.getById(postId);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("")
    public int add(@RequestBody List<Post> posts) {
        return postRepository.save(posts);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PutMapping("/{postId}")
    public int update(@PathVariable("postId") int postId, @RequestBody Post updatedPost) {
        Post post = postRepository.getById(postId);
        if(post != null) {
            post.setTitle(updatedPost.getTitle());
            post.setContent(updatedPost.getContent());
            post.setMediaType(updatedPost.getMediaType());

            postRepository.update(post);

            return 1;
        } else {
            //Return error code
            return -1;
        }
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PatchMapping("/{postId}")
    public int partiallyUpdate(@PathVariable("postId") int postId, @RequestBody Post updatedPost) {
        Post post = postRepository.getById(postId);
        if(post != null) {
            if(updatedPost.getTitle() != null) post.setTitle(updatedPost.getTitle());
            if(updatedPost.getContent() != null) post.setContent(updatedPost.getContent());
            if(updatedPost.getMediaType() != null) post.setMediaType(updatedPost.getMediaType());

            postRepository.update(post);

            return 1;
        } else {
            //Return error code
            return -1;
        }
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @DeleteMapping("/{postId}")
    public int delete(@PathVariable("postId") int postId) {
        Post post = postRepository.getById(postId);

        if (post != null) {
            commentRepository.deleteByPostId(postId);
            postRepository.delete(postId);

            return 1;
        } else {
            return -1;
        }
    }
}
