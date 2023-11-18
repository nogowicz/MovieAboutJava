package com.movieabout.MovieAbout.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

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
}
