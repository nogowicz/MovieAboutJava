package com.movieabout.MovieAbout.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Comment {
    private int id;
    private int postId;
    private Date createdAt;
    private String content;
    private String addedBy;
}
