package app;

import dao.ResultDao;
import model.Result;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class ResultController {

    private ResultDao dao;

    public ResultController(ResultDao dao) {
        this.dao = dao;
    }


    @GetMapping("/results")
    public List<Result> getResults() {
        return dao.findAll();
    }

}