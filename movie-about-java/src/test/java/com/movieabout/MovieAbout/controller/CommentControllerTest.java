package com.movieabout.MovieAbout.controller;

import com.movieabout.MovieAbout.model.Comment;
import com.movieabout.MovieAbout.repository.CommentRepository;
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
public class CommentControllerTest {

    @InjectMocks
    CommentController commentController;

    @Mock
    CommentRepository commentRepository;

    @BeforeEach
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void getAllPostCommentsTest() {
        Comment comment1 = new Comment();
        Comment comment2 = new Comment();
        int postId = 1;
        when(commentRepository.getAllPostComments(postId)).thenReturn(Arrays.asList(comment1, comment2));

        List<Comment> comments = commentController.getAllPostComments(postId);

        assertEquals(2, comments.size());
        verify(commentRepository, times(1)).getAllPostComments(postId);
    }

    @Test
    public void getByIdTest() {
        Comment comment = new Comment();
        int commentId = 1;
        when(commentRepository.getById(commentId)).thenReturn(comment);

        Comment returnedComment = commentController.getById(commentId);

        assertEquals(comment, returnedComment);
        verify(commentRepository, times(1)).getById(commentId);
    }

    @Test
    public void addTest() {
        Comment comment = new Comment();
        when(commentRepository.save(comment)).thenReturn(1);

        int result = commentController.add(comment);

        assertEquals(1, result);
        verify(commentRepository, times(1)).save(comment);
    }

    @Test
    public void updateTest() {
        Comment comment = new Comment();
        Comment updatedComment = new Comment();
        int commentId = 1;
        when(commentRepository.getById(commentId)).thenReturn(comment);
        when(commentRepository.update(comment)).thenReturn(1);

        int result = commentController.update(commentId, updatedComment);

        assertEquals(1, result);
        verify(commentRepository, times(1)).getById(commentId);
        verify(commentRepository, times(1)).update(comment);
    }

    @Test
    public void partiallyUpdateTest() {
        Comment comment = new Comment();
        Comment updatedComment = new Comment();
        int commentId = 1;
        when(commentRepository.getById(commentId)).thenReturn(comment);
        when(commentRepository.update(comment)).thenReturn(1);

        int result = commentController.partiallyUpdate(commentId, updatedComment);

        assertEquals(1, result);
        verify(commentRepository, times(1)).getById(commentId);
        verify(commentRepository, times(1)).update(comment);
    }

    @Test
    public void deleteTest() {
        int commentId = 1;
        when(commentRepository.delete(commentId)).thenReturn(1);

        int result = commentController.delete(commentId);

        assertEquals(1, result);
        verify(commentRepository, times(1)).delete(commentId);
    }
}
