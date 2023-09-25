package app;

import dao.ResultDao;
import jakarta.validation.Valid;
import model.EventName;
import model.Result;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static model.EventName.*;


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
        int points = calculatePoints(result.getEventName(), result.getResultValue());
        System.out.println("points: " + points);
        result.setPoints(points);
        return dao.save(result);
    }

    @DeleteMapping("/results/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteContactById(@PathVariable Long id) {
        dao.deleteResultById(id);
    }


    private int calculatePoints(EventName eventName, double result) {
        // https://www.sportcalculators.com/decathlon-calculator
        double A, B, C;
        int points;

        switch (eventName) {
            case EVENT_100_METERS:
                A = 25.4347;
                B = 18.0;
                C = 1.81;
                break;

            case EVENT_LONG_JUMP:
                A = 0.14354;
                B = 220.0;
                C = 1.4;
                break;

            case EVENT_SHOT_PUT:
                A = 51.39;
                B = 1.5;
                C = 1.05;
                break;

            case EVENT_HIGH_JUMP:
                A = 0.8465;
                B = 75.0;
                C = 1.42;
                break;

            case EVENT_400_METERS:
                A = 1.53775;
                B = 82.0;
                C = 1.81;
                break;

            case EVENT_110_METERS_HURDLES:
                A = 5.74352;
                B = 28.5;
                C = 1.92;
                break;

            case EVENT_DISCUS_THROW:
                A = 12.91;
                B = 4.0;
                C = 1.1;
                break;

            case EVENT_POLE_VAULT:
                A = 0.2797;
                B = 100.0;
                C = 1.35;
                break;

            case EVENT_JAVELIN_THROW:
                A = 10.14;
                B = 7.0;
                C = 1.08;
                break;

            case EVENT_1500_METERS:
                A = 0.03768;
                B = 480.0;
                C = 1.85;
                break;

            default:
                A = 0.0;
                B = 0.0;
                C = 0.0;
        }

        if (A != 0) {
            if (eventName == EVENT_100_METERS || eventName == EVENT_LONG_JUMP || eventName == EVENT_POLE_VAULT) {
                points = (int) Math.floor(A * Math.pow(Math.abs(result - B), C));
            } else {
                points = (int) Math.floor(A * Math.pow((B - result), C));
            }
        } else {
            points = 0;
        }

        return points;
    }

}