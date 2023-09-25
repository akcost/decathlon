package app;

import dao.ResultDao;
import jakarta.validation.Valid;
import model.Result;
import org.springframework.http.HttpStatus;
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

    @GetMapping("/results/{id}")
    public Result getResultById(@PathVariable Long id) {
        return dao.findResultById(id);
    }

    @PostMapping("/results")
    @ResponseStatus(HttpStatus.CREATED)
    public Result save(@RequestBody @Valid Result result) {
        return dao.save(result);
    }

    @DeleteMapping("/results/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteResultById(@PathVariable Long id) {
        dao.deleteResultById(id);
    }

}