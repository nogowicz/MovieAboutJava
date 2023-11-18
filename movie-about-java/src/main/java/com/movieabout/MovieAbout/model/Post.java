package com.movieabout.MovieAbout.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Post {
    private int id;
    private String title;
    private Date date;
    private String content;
    private boolean isAnonymous;
    private String mediaType;
    private String addedBy;
    private List<Comment> comments;
}
