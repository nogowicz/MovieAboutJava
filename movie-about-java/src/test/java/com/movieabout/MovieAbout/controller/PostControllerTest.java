package com.movieabout.MovieAbout.controller;

import com.movieabout.MovieAbout.model.Post;
import com.movieabout.MovieAbout.repository.CommentRepository;
import com.movieabout.MovieAbout.repository.PostRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
public class PostControllerTest {

    @InjectMocks
    PostController postController;

    @Mock
    PostRepository postRepository;

    @Mock
    CommentRepository commentRepository;

    @BeforeEach
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void getAllTest() {
        Post post1 = new Post();
        Post post2 = new Post();
        when(postRepository.getAll()).thenReturn(Arrays.asList(post1, post2));

        List<Post> posts = postController.getAll();

        assertEquals(2, posts.size());
        verify(postRepository, times(1)).getAll();
    }

    @Test
    public void getByIdTest() {
        Post post = new Post();
        int postId = 1;
        when(postRepository.getById(postId)).thenReturn(post);

        Post returnedPost = postController.getById(postId);

        assertEquals(post, returnedPost);
        verify(postRepository, times(1)).getById(postId);
    }

    @Test
    public void addTest() {
        Post post = new Post();
        when(postRepository.save(post)).thenReturn(1);

        int result = postController.add(post);

        assertEquals(1, result);
        verify(postRepository, times(1)).save(post);
    }

    @Test
    public void updateTest() {
        Post post = new Post();
        Post updatedPost = new Post();
        int postId = 1;
        when(postRepository.getById(postId)).thenReturn(post);
        when(postRepository.update(post)).thenReturn(1);

        int result = postController.update(postId, updatedPost);

        assertEquals(1, result);
        verify(postRepository, times(1)).getById(postId);
        verify(postRepository, times(1)).update(post);
    }

    @Test
    public void partiallyUpdateTest() {
        Post post = new Post();
        Post updatedPost = new Post();
        int postId = 1;
        when(postRepository.getById(postId)).thenReturn(post);
        when(postRepository.update(post)).thenReturn(1);

        int result = postController.partiallyUpdate(postId, updatedPost);

        assertEquals(1, result);
        verify(postRepository, times(1)).getById(postId);
        verify(postRepository, times(1)).update(post);
    }

    @Test
    public void deleteTest() {
        int postId = 1;
        Post post = new Post();
        when(postRepository.getById(postId)).thenReturn(post);
        when(commentRepository.deleteByPostId(postId)).thenReturn(1);
        when(postRepository.delete(postId)).thenReturn(1);

        int result = postController.delete(postId);

        assertEquals(1, result);
        verify(postRepository, times(1)).getById(postId);
        verify(commentRepository, times(1)).deleteByPostId(postId);
        verify(postRepository, times(1)).delete(postId);
    }



}