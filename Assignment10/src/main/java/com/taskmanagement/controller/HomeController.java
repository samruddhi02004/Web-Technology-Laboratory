package com.taskmanagement.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping
public class HomeController {

    @GetMapping({"/", "/index.html", "/index"})
    public String index() {
        return "index";
    }

    @GetMapping({"/employees.html"})
    public String employees() {
        return "employees";
    }

    @GetMapping({"/tasks.html"})
    public String tasks() {
        return "tasks";
    }
}
