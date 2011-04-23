package com.lewdlistings.web.review;

import com.lewdlistings.entity.Review;
import com.lewdlistings.service.ReviewService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@Controller
public class ReviewController {

    private static final Logger logger = LoggerFactory.getLogger(ReviewController.class);

    private final ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @RequestMapping(value = "/reviews", method = GET)
    public String list(Model model) {
        logger.debug("Listing recent reviews");
        List<Review> reviews = reviewService.listRecent(0, 0);
        model.addAttribute("reviews", reviews);
        return "review/list";
    }
}
